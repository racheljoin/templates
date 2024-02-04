#!/usr/bin/env node

const prompts = require('prompts')
const { execSync } = require('child_process')

const questions = [
  {
    type: 'select',
    name: 'tagType',
    message: '升级版本号类型：',
    initial: 0,
    choices: [
      { title: 'patch', value: 'patch' },
      { title: 'minor', value: 'minor' },
      { title: 'major', value: 'major' }
    ]
  }
]

async function main() {
  const response = await prompts(questions)
  const chalk = await (async () => {
    return (await import('chalk')).default
  })()
  console.log(chalk.blue('Long long ago, I fell in love with a ...'))
  execSync(`commit-and-tag-version --release-as ${response.tagType}`, {
    stdio: [0, 1, 2]
  })
  execSync('git push --follow-tags origin', {
    stdio: [0, 1, 2]
  })
  chalk.gray('Tags pipeline has triggered')
}
main()
