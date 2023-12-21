import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import prompts from 'prompts';
import { reset, red } from 'kolorist';

type Framework = {
  name: string;
  display: string;
};

const FRAMEWORKS: Framework[] = [];
const defaultTargetDir = 'myApp';

function isValidPackageName(projectName: string) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(projectName);
}

const init = async () => {
  let result: prompts.Answers<'projectName' | 'packageName' | 'framework'>;
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
        },
        {
          type: 'select',
          name: 'framework',
          message: '选择模板：',
          initial: 0,
          choices: FRAMEWORKS.map((framework) => {
            return {
              title: framework.display,
              value: framework,
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

  //   const { framework, packageName } = result;
};

init();
