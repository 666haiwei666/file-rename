const inquirer = require('inquirer')
const path = require('path')
const chalk = require('chalk')
const { onceQuestionList } = require('./questions/index')
const { reName, isDirectory, isHasExtname, validFilename } = require('./utils/fsOperation')
const { getAllDirFiles } = require('./utils/common')

async function validatePath(path) {
    if (isDirectory(path)) {
        let allDirFiles = await getAllDirFiles(path)
        onceQuestionList[1].choices = allDirFiles
        return true
    }
    return false
}
async function validateOldPath(fileName) {
    return validFilename(fileName)
}

async function validateNewPath(fileName) {
    return validFilename(fileName)
}

async function createOnceAction(project) {
    for (let i = 0; i < onceQuestionList.length; i++) {
        if (i == 0) {
            onceQuestionList[i].validate = validatePath
        }
        if (i == 1) {
            onceQuestionList[i].validate = validateOldPath
        }
        if (i == 2) {
            onceQuestionList[i].validate = validateNewPath
        }
    }
    const {
        floderPath,
        oldFileName,
        newFileName
    } = await inquirer.prompt(onceQuestionList)

    if (onceQuestionList[1].choices.includes(newFileName)) {
        console.log(chalk.red('The same file name already exists in the folder(文件夹中已有相同的文件名)'))
        process.exit(1)
    }

    let oldFullPath = path.join(floderPath, oldFileName)
    let extName = path.extname(oldFileName)
    let oldName = oldFileName
    let newName = ''
    if (!isHasExtname(newFileName)) {
        newName = newFileName + extName
    } else {
        newName = newFileName
    }
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