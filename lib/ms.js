const inquirer = require('inquirer')
const chalk = require('chalk')
const path = require('path')
const { msQuestionList } = require('./questions/ms')
const { getAllDirFiles, cacheFn, checkNameSameFile } = require('./common')
const { readFile, validFilename, reName, isDirectory, isHasExtname, extNameFn } = require('./utils/fsOperation')
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
    const configObj = await readFile()
    if (typeof configObj == 'object') {
        msQuestionList[1].choices = await getAllDirFiles(configObj.defaultfolder)
        msQuestionList.splice(0, 1)
    }
    const {
        floderPath,
        commonSuffix,
        fileRange
    } = await inquirer.prompt(msQuestionList)
    const arr = []
    const cacheObj = {}
    const newFloderPath = floderPath ? floderPath : configObj.defaultfolder
    for (let i = 0; i < fileRange.length; i++) {
        const oldFilName = fileRange[i]
        const oldName = path.join(newFloderPath, fileRange[i])
        if (isHasExtname(fileRange[i])) {
            const extName = extNameFn(oldName)
            const newName = path.join(newFloderPath, oldFilName + commonSuffix + extName)
            arr.push(reName(oldName, newName))
            cacheObj[newName] = oldName
        } else {
            const newName = path.join(newFloderPath, oldFilName + commonSuffix)
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
    createMsAction
}