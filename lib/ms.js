const inquirer = require('inquirer')
const chalk = require('chalk')
const path = require('path')
const { msQuestionList } = require('./questions/ms')
const { getAllDirFiles } = require('./utils/common')
const { validFilename, reName, isDirectory, isHasExtname, extNameFn } = require('./utils/fsOperation')
async function validatePath(floderPath) {
    if (isDirectory(floderPath)) {
        let allDirFiles = await getAllDirFiles(floderPath)
        msQuestionList[1].choices = allDirFiles
        return true
    }
    return false
}

async function validateFileName(fileRange) {
    if (fileRange.length == 0) {
        return false
    }
    return true
}

async function validateCommonSuffix(CommonSuffix) {
    if (CommonSuffix.length == 0) {
        return false
    }
    return validFilename(CommonSuffix)
}

async function createMsAction() {
    for (let i = 0; i < msQuestionList.length; i++) {
        if (i == 0) {
            msQuestionList[i].validate = validatePath
        }
        if (i == 1) {
            msQuestionList[i].validate = validateFileName
        }
        if (i == 2) {
            msQuestionList[i].validate = validateCommonSuffix
        }
    }
    const {
        floderPath,
        commonSuffix,
        fileRange
    } = await inquirer.prompt(msQuestionList)
    const arr = []
    for (let i = 0; i < fileRange.length; i++) {
        const oldFilName = fileRange[i]
        const oldName = path.join(floderPath, fileRange[i])
        if (isHasExtname(fileRange[i])) {
            const extName = extNameFn(oldName)
            const newName = path.join(floderPath, oldFilName + commonSuffix + extName)
            arr.push(reName(oldName, newName))
        } else {
            const newName = path.join(floderPath, oldFilName + commonSuffix)
            arr.push(reName(oldName, newName))
        }
    }
    Promise.all(arr).then(res => {
        console.log(chalk.green('completed'))
    }).catch(error => {
        throw error
        console.log(chalk.red('failed'))
    })
}

module.exports = {
    createMsAction
}