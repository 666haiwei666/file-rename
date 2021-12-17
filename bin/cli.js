#! /usr/bin/env node
const path = require('path')
const { Command } = require('commander')
const { checkNodeVersion } = require('../lib/utils/index.js')
const createOnceAction = require('../lib/Once.js')
const pkg = require(path.join(__dirname, '../package'))
const program = new Command()

checkNodeVersion(pkg.engines.node, pkg.name)

program
    .version(pkg.version)
    .usage('<command> [options]')

program
    .command('once')
    .description('Rename a single file')
    .allowUnknownOption()
    .action(createOnceAction)

program
    .command('mi')
    .description('Rename multiple files by order(通过序号重命名多个文件)')
    .allowUnknownOption()
    .action(() => {
        require(path.join(__dirname, '../lib/Mi.js'))
    })

program
    .command('mc')
    .description('Rename multiple files by template(通过模板重命名多个文件)')
    .allowUnknownOption()
    .action(() => {
        require(path.join(__dirname, '../lib/Mc.js'))
    })

program
    .command('clear')
    .description('Clear cached file')
    .allowUnknownOption()
    .action(() => {
        require(path.join(__dirname, '../lib/Clear.js'))
    })

program
    .command('revoke')
    .description('Undo rename operation')
    .allowUnknownOption()
    .action(() => {
        require(path.join(__dirname, '../lib/Revoke.js'))
    })

program
    .command('inspect')
    .description('View current basic configuration')
    .allowUnknownOption()
    .action(() => {
        require(path.join(__dirname, '../lib/Inspect.js'))
    })

program.parse(process.argv);
