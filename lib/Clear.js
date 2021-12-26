const inquirer = require('inquirer')
const { clearFile } = require('./utils/fsOperation')
const { clearQuestionList } = require('./questions/clear')

async function createClearAction(project) {
    const answer = await inquirer.prompt(clearQuestionList)
    if (answer) {
        clearFile()
    }
}
module.exports = {
    createClearAction
}