const inquirer = require('inquirer')
const chalk = require('chalk')
const path = require('path')
const { miQuestionList } = require('./questions/mi')
const { readFile, reName, isDirectory, isHasExtname, extNameFn, validFilename } = require('./utils/fsOperation')
const { getAllDirFiles, cacheFn, checkNameSameFile } = require('./common')
const { completionNum } = require('./utils/tbox')

async function validatePath(floderPath) {
    if (isDirectory(floderPath)) {
        let allDirFiles = await getAllDirFiles(floderPath)
        miQuestionList[1].choices = allDirFiles
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
            miQuestionList[i].validate = validateFileName
        }
        if (i == 2) {
            miQuestionList[i].validate = validateCommonPrefix
        }
        if (i == 3) {
            miQuestionList[i].validate = validateNumType
        }
    }
    const configObj = await readFile()
    if (typeof configObj == 'object') {
        miQuestionList[1].choices = await getAllDirFiles(configObj.defaultfolder)
        miQuestionList.splice(0, 1)
        miQuestionList.splice(2, 1)
    }

    const {
        floderPath,
        commonPrefix,
        numType,
        fileRange
    } = await inquirer.prompt(miQuestionList)
    const newFloderPath = floderPath ? floderPath : configObj.defaultfolder
    const newNumType = numType ? numType : configObj.numType
    const arr = []
    const cacheObj = {}

    for (let i = 0; i < fileRange.length; i++) {
        const oldName = path.join(newFloderPath, fileRange[i])
        if (isHasExtname(fileRange[i])) {
            const extName = extNameFn(oldName)
            const newName = path.join(newFloderPath, commonPrefix + (newNumType ? completionNum(i + 1) : i + 1) + extName)
            arr.push(reName(oldName, newName))
            cacheObj[newName] = oldName
        } else {
            const newName = path.join(newFloderPath, commonPrefix + (newNumType ? completionNum(i + 1) : i + 1))
            arr.push(reName(oldName, newName))
            cacheObj[newName] = oldName
        }
    }
    checkNameSameFile(cacheObj, newFloderPath)
    Promise.all(arr).then(res => {
        console.log(chalk.green('completed'))
        cacheFn(cacheObj)

    }).catch(error => {
        throw error
    })



}

module.exports = {
    createMiAction
}