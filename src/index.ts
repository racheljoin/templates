// import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import prompts from 'prompts';
import { reset, red, gray } from 'kolorist';
import { getTemplates, createDir, copy, repairPkgConfig, formatTargetDir } from './util.js';

const defaultTargetDir = 'myApp';

// let targetDir = defaultTargetDir;

function isValidPackageName(projectName: string) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(projectName);
}

const init = async () => {
  let result: prompts.Answers<'projectName' | 'packageName' | 'framework'>;

  const FRAMEWORKS = await getTemplates();

  try {
    result = await prompts(
      [
        {
          type: 'text',
          name: 'projectName',
          message: reset('Project name:'),
          initial: defaultTargetDir,
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

  const { framework, packageName, projectName } = result;

  const cwd = process.cwd();
  const targetDir = path.join(cwd, formatTargetDir(projectName));
  await createDir(targetDir);

  const templateDir = path.resolve(fileURLToPath(import.meta.url), '../../templates', `${framework}`);

  copy(templateDir, targetDir);

  repairPkgConfig({
    packageName,
  });
};

init();
