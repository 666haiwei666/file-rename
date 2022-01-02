const path = require('path')
const fse = require('fs-extra')
const inquirer = require('inquirer')
const chalk = require('chalk')
const { cachePath, writeFile, readFile, getDirFiles, isAbsolute, reName } = require('./utils/fsOperation')
const { cache1QuestionList, cache2QuestionList } = require('./questions/cache')
async function getAllDirFiles(dirPath) {
    let allDirFiles = []
    let fullPath = isAbsolute(dirPath) ? dirPath : path.join(__dirname, dirPath)
    allDirFiles = await getDirFiles(fullPath)
    if (allDirFiles.length == 0) {
        console.log(chalk.red('the folder is empty(该文件夹为空)'))
        process.exit(1)
    }
    return allDirFiles
}

async function checkNameSameFile(cacheObj, floderPath) {
    let allDirFiles = await getAllDirFiles(floderPath)
    let oldArr = Object.keys(cacheObj)
    let flag = true
    allDirFiles.forEach(fileName => {
        if (oldArr.includes(path.join(floderPath, fileName))) {
            console.log(chalk.red(`A file with the same name [${fileName}] exists in this folder, Please replace `))
            process.exit(1)
        }
    })
}

async function cacheFn(cacheObj) {
    const configObj = await readFile()
    if (typeof configObj == 'object' && configObj.cache) {
        const {
            cahceFileName
        } = await inquirer.prompt(cache2QuestionList)
        try {
            fse.accessSync(cachePath)
        } catch {
            fse.mkdir(cachePath)
        }
        let result = await writeFile(JSON.stringify(cacheObj), path.join(cachePath, cahceFileName))
        if (result) {
            console.log(chalk.green('cache completed'))
        }

    } else {
        const {
            confirm
        } = await inquirer.prompt(cache1QuestionList)
        if (confirm) {
            const {
                cahceFileName
            } = await inquirer.prompt(cache2QuestionList)
            let result = await writeFile(JSON.stringify(cacheObj), path.join(cachePath, cahceFileName))
            if (result) {
                console.log(chalk.green('cache completed'))
            }
        }
    }
}

module.exports = {
    getAllDirFiles,
    checkNameSameFile,
    cacheFn
}