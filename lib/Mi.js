const inquirer = require('inquirer')
const chalk = require('chalk')
const path = require('path')
const { miQuestionList } = require('./questions/mi')
const { reName, isDirectory, isHasExtname, extNameFn, validFilename } = require('./utils/fsOperation')
const { getAllDirFiles } = require('./utils/common')
const { completionNum } = require('./utils/tbox')

async function validatePath(floderPath) {
    if (isDirectory(floderPath)) {
        let allDirFiles = await getAllDirFiles(floderPath)
        miQuestionList[1].choices = allDirFiles
        return true
    }
    return false
}

async function validateStartFileName(fileRange) {
    if (fileRange.length == 0) {
        return false
    }
    return true
}

async function validateCommonPrefix(commonPrefix) {
    if (commonPrefix.length == 0) {
        return false
    }
    return validFilename(commonPrefix)
}

async function validateNumType(numType) {
    return true
}
async function createMiAction(project) {
    for (let i = 0; i < miQuestionList.length; i++) {
        if (i == 0) {
            miQuestionList[i].validate = validatePath
        }
        if (i == 1) {
            miQuestionList[i].validate = validateStartFileName
        }
        if (i == 2) {
            miQuestionList[i].validate = validateCommonPrefix
        }
        if (i == 3) {
            miQuestionList[i].validate = validateNumType
        }
    }
    const {
        floderPath,
        commonPrefix,
        numType,
        fileRange
    } = await inquirer.prompt(miQuestionList)
    let arr = []

    for (let i = 0; i < fileRange.length; i++) {
        let oldName = path.join(floderPath, fileRange[i])
        if (isHasExtname(fileRange[i])) {
            let extName = extNameFn(oldName)
            let newName = path.join(floderPath, commonPrefix + (numType ? completionNum(i + 1) : i + 1) + extName)
            arr.push(reName(oldName, newName))
        } else {
            let newName = path.join(floderPath, commonPrefix + (numType ? completionNum(i + 1) : i + 1))
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
    createMiAction
}