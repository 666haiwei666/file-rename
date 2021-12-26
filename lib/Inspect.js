const inquirer = require('inquirer')
const path = require('path')
const chalk = require('chalk')
const { inspectQuestionList } = require('./questions/inspect')
const { getAllDirFiles } = require('./utils/common')
const { writeConfigPath } = require('./utils/fsOperation')

async function validatePath(path) {
    if (isDirectory(path)) {
        return true
    }
    return false
}

async function createInspectAction(project) {
    for (let i = 0; i < inspectQuestionList.length; i++) {
        if (i == 4) {
            inspectQuestionList[i].validate = validatePath
        }
    }
    const answer = await inquirer.prompt(inspectQuestionList)
    const result = writeConfigPath(answer)
    if (result) {
      console.log(chalk.green('Set successfully'))
    }
}

module.exports = {
    createInspectAction
}