const fse = require('fs-extra')
const path = require('path')
const os = require('os')
const rimraf = require('rimraf')
const util = require('util');
const { isValidFilename } = require('./validFilename')

// 校验文件是否是一个文件名
function validFilename(fileName) {
    return isValidFilename(fileName)
}

// 检查文件是否存在
function getFileStat(path) {
    const stat = util.promisify(fse.stat);
    return new Promise((reslove, reject) => {
        stat(path).then((stats) => {
            reslove(stats)
        }).catch((error) => {
            reject(error)
        });
    })
}

// 读取某一文件夹下的文件(只遍历一层)
function getDirFiles(path, options) {
    const readdir = util.promisify(fse.readdir);
    return new Promise((reslove, reject) => {
        readdir(path, options).then((res) => {
            reslove(res)
        }).catch((error) => {
            reject(error)
        });
    })

}

// 判断路径是否是绝对路径
function isAbsolute(dirPath) {
    return path.isAbsolute(dirPath)
}

// 文件重命名
function reName(oldPath, newPath) {
    const rename = util.promisify(fse.rename);
    return new Promise((reslove, reject) => {
        rename(oldPath, newPath).then((res) => {
            reslove(res)
        }).catch((error) => {
            reject(error)
        });
    })
}

// 判断文件是否是一个文件夹
async function isDirectory(path) {
    let stats = await getFileStat(path)
    return stats.isDirectory()
}

// 判断文件名中是否有后缀名
function isHasExtname(fileName) {
    let result = path.extname(fileName)
    return result.length > 1 && /\.\S+/.test(result)
}

// 返回扩展名 
function extNameFn(fileName) {
    return path.extname(fileName)
}

// 写入配置文件
async function writeConfigPath(content) {
    const filePath = path.join(os.homedir(), '.frn')
    let error = await fse.writeFileSync(filePath, JSON.stringify(content, null, 2))
    if (error) {
        throw error
    } else {
        return Promise.resolve(1)
    }

}

// 删除缓存文件
async function clearFile() {
    const cachePath = path.join(os.homedir(), '.frnCache')
    rimraf(cachePath, (error) => {
        if (error) {
            throw error
        }
    })
}

module.exports = {
    getFileStat,
    getDirFiles,
    isAbsolute,
    reName,
    isDirectory,
    isHasExtname,
    extNameFn,
    validFilename,
    writeConfigPath,
    clearFile
}