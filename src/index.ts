// import fs from 'node:fs';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import prompts from 'prompts';
import { reset, red, gray, lightGreen } from 'kolorist';
import {
  getTemplates,
  createDir,
  copy,
  repairPkgConfig,
  formatTargetDir,
  isEmpty,
  emptyDir,
  getPkgManager,
} from './util.js';

const defaultTargetDir = 'myapp';
const cwd = process.cwd();
function isValidPackageName(projectName: string) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(projectName);
}

const init = async () => {
  let result: prompts.Answers<'projectName' | 'packageName' | 'framework' | 'overwrite'>;

  const FRAMEWORKS = await getTemplates();

  try {
    result = await prompts(
      [
        {
          type: isEmpty(cwd) ? null : 'text',
          name: 'projectName',
          message: reset(`项目名:`),
          initial: isEmpty(cwd) ? './' : defaultTargetDir,
        },
        {
          type: (_, { projectName }) => (!fs.existsSync(projectName) || isEmpty(projectName) ? null : 'select'),
          name: 'overwrite',
          message: (_, { projectName }) => `${projectName}已存在，是否覆盖？`,
          initial: 0,
          choices: [
            {
              title: '取消操作',
              value: 'no',
            },
            {
              title: '覆盖并继续',
              value: 'yes',
            },
          ],
        },
        {
          type: (_, { overwrite }: { overwrite?: string }) => {
            if (overwrite === 'no') {
              throw new Error(red('✖') + ' Operation cancelled');
            }
            return null;
          },
          name: 'overwriteChecker',
        },
        {
          type: 'text',
          name: 'packageName',
          message: reset('Package name:'),
          validate: (dir) => isValidPackageName(dir) || 'Invalid package.json name',
          initial: defaultTargetDir,
        },
        {
          type: 'select',
          name: 'framework',
          message: '选择模板：',
          initial: 0,
          choices: FRAMEWORKS.map((framework) => {
            return {
              title: `${framework.templateName}(${gray(framework.desc)})`,
              value: framework.templateName,
            };
          }),
        },
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled');
        },
      },
    );
  } catch (cancelled: any) {
    console.log(cancelled.message);
    return;
  }

  const { framework, packageName, projectName = './', overwrite } = result;

  const targetDir = path.join(cwd, formatTargetDir(projectName));
  if (overwrite === 'yes') {
    await emptyDir(targetDir);
  } else if (!fs.existsSync(targetDir)) {
    await createDir(targetDir);
  }

  const templateDir = path.resolve(fileURLToPath(import.meta.url), '../../templates', `${framework}`);

  copy(templateDir, targetDir);

  repairPkgConfig(templateDir, targetDir, {
    packageName,
  });
  console.log();

  if (targetDir !== cwd) {
    console.log(lightGreen(`  cd ${projectName}`));
  }

  const pkgManager = getPkgManager();

  switch (pkgManager) {
    case 'yarn':
      console.log(lightGreen('  yarn'));
      console.log(lightGreen('  yarn dev'));
      break;
    default:
      console.log(lightGreen(`  ${pkgManager} install`));
      console.log(lightGreen(`  ${pkgManager} run dev`));
      break;
  }
  console.log();
};

init();
