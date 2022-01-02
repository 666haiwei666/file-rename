const inquirer = require('inquirer')
const chalk = require('chalk')
const { clearFile } = require('./utils/fsOperation')
const { clearQuestionList } = require('./questions/clear')

async function createClearAction(project) {
    const { confirm } = await inquirer.prompt(clearQuestionList)
    if (confirm) {
        clearFile()
        console.log(chalk.green('clear completed'))
    }
}
module.exports = {
    createClearAction
}