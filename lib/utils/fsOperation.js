const request = require('request')
const fsScandir = require('@nodelib/fs.scandir')
const fse = require('fs-extra')
const path = require('path')
const os = require('os')
const ora = require('ora')
const rimraf = require('rimraf')
const util = require('util')
const { isValidFilename } = require('./validFilename')

const configFile = '.frn'
const cacheFile = '.frnCache'
const teamplePath =
  'https://normal-test-use.oss-cn-beijing.aliyuncs.com/file-rename-cli/%E7%AC%AC%E4%B8%80%E4%B8%AA%E6%96%87%E4%BB%B6%E5%90%8D.yaml'
const configPath = path.join(os.homedir(), configFile)
const cachePath = path.join(os.homedir(), cacheFile)

//  请求模板文件
function fetchTeample() {
  const spinner = ora('Downloading').start()
  return new Promise((reslove, reject) => {
    request(teamplePath, function (error, response, body) {
      if (response && response.statusCode == 200) {
        spinner.succeed('Download succeeded')
        reslove(body)
      } else {
        spinner.fail('Download failed, please check your network')
        reject()
      }
    })
  })
}

// 校验文件是否是一个文件名
function validFilename(fileName) {
  return isValidFilename(fileName)
}

// 检查文件是否存在
function getFileStat(path) {
  const stat = util.promisify(fse.stat)
  return new Promise((reslove, reject) => {
    stat(path)
      .then((stats) => {
        reslove(stats)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// 读取某一文件夹下的文件(只遍历一层)
function getDirFiles(dirPath) {
  return new Promise(async (reslove, reject) => {
    let arr = await fse.readdirSync(dirPath)
    let dirs = []
    let files = []
    for (let i = 0; i < arr.length; i++) {
      let filePath = path.join(dirPath, arr[i])
      let stat = await getFileStat(filePath)
      if (stat.isFile()) {
        files.push(arr[i])
      } else {
        dirs.push(arr[i])
      }
    }
    const array = dirs.sort().concat(files.sort())
    reslove(array)
  })
}

// 判断路径是否是绝对路径
function isAbsolute(dirPath) {
  return path.isAbsolute(dirPath)
}

// 文件重命名
function reName(oldPath, newPath) {
  const rename = util.promisify(fse.rename)
  return new Promise((reslove, reject) => {
    rename(oldPath, newPath)
      .then((res) => {
        reslove(res)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// 判断文件是否是一个文件夹
async function isDirectory(path) {
  try {
    let stats = await getFileStat(path)
    return stats.isDirectory()
  } catch (error) {
    throw error
  }
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
async function writeFile(content, path = configPath) {
  try {
    await fse.writeFileSync(path, content)
    return Promise.resolve(1)
  } catch (error) {
    throw error
  }
}

// 读取配置文件
async function readFile(path = configPath) {
  try {
    let stats = await getFileStat(path)
    if (!stats.isFile()) return false
  } catch {
    return false
  }
  let string = await fse.readFileSync(path, { encoding: 'utf-8' })
  if (string) {
    return JSON.parse(string)
  }
  return false
}

// 删除缓存文件
async function clearFile() {
  rimraf(cachePath, (error) => {
    if (error) {
      throw error
    }
    fse.mkdir(cachePath, { recursive: true }, (err) => {
      if (err) throw err
    })
  })
}

module.exports = {
  configPath,
  cachePath,
  fetchTeample,
  getFileStat,
  getDirFiles,
  isAbsolute,
  reName,
  isDirectory,
  isHasExtname,
  extNameFn,
  validFilename,
  writeFile,
  readFile,
  clearFile,
}
