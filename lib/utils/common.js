const path = require('path')
const chalk = require('chalk')
const { getDirFiles, isAbsolute } = require('./fsOperation')

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

module.exports = {
    getAllDirFiles
}