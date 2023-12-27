#!/usr/bin/node
import prompts from 'prompts';
import { execSync } from 'child_process';

const questions = [
  {
    type: "select",
    name: 'tagType',
    message: '升级版本号类型：',
    initial: 0,
    choices: [
      { title: 'patch', value: 'patch' },
      { title: 'minor', value: 'minor' },
      { title: 'major', value: 'major' }
    ],
  },

];

async function main() {
  const response = await prompts(questions);
  execSync(`commit-and-tag-version --release-as ${response.tagType}`, {
    stdio: [0, 1, 2]
  });
  execSync("git push --follow-tags origin", {
    stdio: [0, 1, 2]
  })
}
main();


