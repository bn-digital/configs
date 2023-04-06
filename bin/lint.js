#!/usr/bin/env node
const { execSync } = require('child_process')
const args = process.argv
const includes = args[2].replace('--include', '').replace('=', '').trim()?.split(',')
const toFix = /fix/.test(args.join(' '))
const defaultCommand = [
  'prettier',
  toFix ? '--write' : '--check',
  'packages/*/src/**/*.{js,jsx,ts,tsx,css,scss,less,sass}',
]

const commands = includes
  .map(include => {
    switch (include.replace('--include', '').trim()) {
      case 'js':
      case 'jsx':
      case 'ts':
      case 'tsx':
      case 'scripts':
        return ['yarn eslint', '--cache', toFix ? '--fix' : '', '**/src/**/*.{js,jsx,ts,tsx}']
      case 'styles':
      case 'css':
      case 'scss':
      case 'sass':
      case 'less':
        return ['stylelint', '--cache', toFix ? '--fix' : '', '**/src/**/*.{css,scss,less,sass}']
      default:
        return []
    }
  })
  .filter(it => it.length > 0)
commands.unshift(defaultCommand)
commands.forEach(cmd => {
  console.log(`Running: ${cmd.join(' ')}`)
  try {
    execSync(
      cmd
        .map(it => it.trim())
        .filter(Boolean)
        .join(' '),
      { stdio: 'inherit', cwd: process.cwd() }
    )
  } catch (error) {
    console.log(error)
  }
})
