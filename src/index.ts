// import fs from 'node:fs';
import path from 'node:path';
import fs from 'node:fs';
import { exec } from 'child_process';
import { fileURLToPath } from 'node:url';
import prompts from 'prompts';
import { reset, red, gray, lightGreen, magenta } from 'kolorist';
import {
  getTemplates,
  createDir,
  copy,
  repairPkgConfig,
  formatTargetDir,
  isEmpty,
  emptyDir,
  getPkgManager,
  write,
} from './util.js';

const defaultTargetDir = 'myapp';
const cwd = process.cwd();
function isValidPackageName(projectName: string) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(projectName);
}

const init = async () => {
  let result: prompts.Answers<'projectName' | 'packageName' | 'framework' | 'overwrite' | 'gitInit'>;

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
        {
          type: 'text',
          name: 'gitInit',
          message: '是否初始化git仓库',
          initial: 'Y',
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

  const { framework, packageName, projectName = './', overwrite, gitInit = 'Y' } = result;

  const targetDir = path.join(cwd, formatTargetDir(projectName));
  if (overwrite === 'yes') {
    await emptyDir(targetDir);
  } else if (!fs.existsSync(targetDir)) {
    await createDir(targetDir);
  }

  const templateDir = path.resolve(fileURLToPath(import.meta.url), '../../templates', `${framework}`);

  await copy(templateDir, targetDir);

  await repairPkgConfig(templateDir, targetDir, {
    packageName,
  });

  console.log();

  if (targetDir !== cwd) {
    console.log(lightGreen(`  cd ${projectName}`));
  }

  const pkgManager = getPkgManager();
  console.log('8888888888');

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

  if (['Y', 'y'].includes(gitInit)) {
    exec('git init', {
      cwd: targetDir,
    });
    fs.copyFileSync(`${templateDir}/gitignore.txt`, `${targetDir}/.gitignore`);
    console.log(magenta(`  添加远程仓库连接，执行：`));
    console.log(magenta('  git remote add <连接名> <连接地址>'));
  }
};

init();
