const inquirer = require('inquirer')
const path = require('path')
const chalk = require('chalk')
const { onceQuestionList } = require('./questions/once')
const { readFile, reName, isDirectory, isHasExtname, validFilename } = require('./utils/fsOperation')
const { getAllDirFiles, checkNameSameFile } = require('./common')

async function validatePath(path) {
    if (isDirectory(path)) {
        let allDirFiles = await getAllDirFiles(path)
        onceQuestionList[1].choices = allDirFiles
        return true
    }
    return false
}

async function validateFileName(fileName) {
    return validFilename(fileName)
}

async function createOnceAction(project) {
    for (let i = 0; i < onceQuestionList.length; i++) {
        if (i == 0) {
            onceQuestionList[i].validate = validatePath
        }
        if (i == 2) {
            onceQuestionList[i].validate = validateFileName
        }
    }
    let configObj = await readFile()
    let choices = onceQuestionList[1].choices
    if (typeof configObj == 'object') {
        onceQuestionList[1].choices = await getAllDirFiles(configObj.defaultfolder)
        onceQuestionList.splice(0, 1)
        choices = onceQuestionList[0].choices
    }
    let {
        floderPath,
        oldFileName,
        newFileName
    } = await inquirer.prompt(onceQuestionList)

    let newFloderPath = floderPath ? floderPath : configObj.defaultfolder
    let oldFullPath = path.join(newFloderPath, oldFileName)
    let extName = path.extname(oldFileName)
    let oldName = oldFullPath
    let newName = ''
    if (!isHasExtname(newFileName)) {
        newName = path.join(newFloderPath, newFileName + extName)
    } else {
        newName = path.join(newFloderPath, newFileName)
    }
    let cacheObj = { [newName]: oldName }
    checkNameSameFile(cacheObj, newFloderPath)
    let result = await reName(oldName, newName)
    if (result) {
        console.log(chalk.red('failed'))
    } else {
        console.log(chalk.green('completed'))
    }
}
module.exports = {
    createOnceAction
}