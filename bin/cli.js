#! /usr/bin/env node
const path = require('path')
const { Command } = require('commander')
const checkNodeVersion = require('../lib/utils/checkNodeVersion')
const { createOnceAction } = require('../lib/Once.js')
const { createMiAction } = require('../lib/mi.js')
const { createMcAction } = require('../lib/mc.js')
const { createInspectAction } = require('../lib/inspect')
const { createRevokeAction } = require('../lib/revoke')
const { createClearAction } = require('../lib/clear')
const { createMsAction } = require('../lib/ms')
const pkg = require(path.join(__dirname, '../package'))
const program = new Command()

checkNodeVersion(pkg.engines.node, pkg.name)

program
    .version(pkg.version)
    .usage('<command> [options]')

program
    .command('once')
    .description('Rename a single file(重命名一个单文件)')
    .action(createOnceAction)

program
    .command('mi')
    .description('Rename multiple files by order(通过序号重命名多个文件)')
    .action(createMiAction)

program
    .command('ms')
    .description('Rename files by setting a uniform suffix(通过设置统一后缀重命名文件)')
    .action(createMsAction)

program
    .command('mc')
    .description('Rename multiple files by template(通过模板重命名多个文件)')
    .allowUnknownOption()
    .action(createMcAction)

program
    .command('clear')
    .description('Clear cached file（清除文件缓存）')
    .allowUnknownOption()
    .action(createClearAction)

program
    .command('revoke')
    .description('Undo rename operation（撤销重命名操作）')
    .allowUnknownOption()
    .action(createRevokeAction)

program
    .command('inspect')
    .description('View current basic configuration(基础配置文件)')
    .allowUnknownOption()
    .action(createInspectAction)

program.parse(process.argv);
