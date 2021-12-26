const inquirer = require('inquirer')
const path = require('path')
const { mcQuestionList } = require('./questions/mc')
const { getFileStat, isAbsolute } = require("./utils/fsOperation")

async function validateConfirm() {
    return true
}

async function validateFilePath(filePath) {
    let fullPath = isAbsolute(filePath) ? filePath : path.join(__dirname, filePath)
    let result = await getFileStat(filePath)
    if (result.isFile()) {
        return true
    }
    return false
}

async function createMcAction(project) {
    for (let i = 0; i < mcQuestionList.length; i++) {
        if (i == 0) {
            mcQuestionList[i].validate = validateConfirm
        }
        if (i == 1) {
            mcQuestionList[i].validate = validateFilePath
        }
    }
    const {
        confirm,
        filePath
    } = await inquirer.prompt(mcQuestionList)

    
}

module.exports = {
    createMcAction
}