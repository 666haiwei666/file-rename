const inquirer = require('inquirer')
const chalk = require('chalk')
const { cachePath, getDirFiles, readFile, reName } = require('./utils/fsOperation')
const { revokeQuestionList } = require('./questions/revoke')


async function createRevokeAction(project) {
    const allDirFiles = await getDirFiles(cachePath)
    if (!allDirFiles.length) {
        console.log(chalk.yellow('There is currently no cache'))
        process.exit(1)
    }
    revokeQuestionList[0].choices = allDirFiles
    let {
        cacheFile
    } = await inquirer.prompt(revokeQuestionList)
    let cacheObj = readFile(cacheFile)
    let arr = []
    for (let oldName in cacheObj) {
        arr.push(oldName, cacheObj[oldName])
    }
    Promise.all(arr).then(res => {
        console.log(chalk.green('completed'))
    }).catch(error => {   
        throw error
    })
}
module.exports = {
    createRevokeAction
}