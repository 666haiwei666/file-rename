const inquirer = require('inquirer')
const path = require('path')
const chalk = require('chalk')
const yaml = require('js-yaml');
const fse = require('fs-extra')
const { mcQuestionList1, mcQuestionList2, mcQuestionList3, mcQuestionList4 } = require('./questions/mc')
const { getDirFiles, fetchTeample, extNameFn, writeFile, getFileStat, isAbsolute, readConfigPath, reName, isHasExtname } = require("./utils/fsOperation")

function isObject(obj) {
    return obj.constructor === Object
}

async function validateFilePath(filePath) {
    let fullPath = isAbsolute(filePath) ? filePath : path.join(__dirname, filePath)
    let result = await getFileStat(filePath)
    if (result.isFile()) {
        return true
    }
    return false
}

async function createMcAction(project) {
    const {
        confirm
    } = await inquirer.prompt(mcQuestionList1)
    if (!confirm) {
        let body = await fetchTeample()
        await writeFile(path.resolve(process.cwd(), 'teample.yaml'), body)
    }
    const {
        filePath
    } = await inquirer.prompt(mcQuestionList4)

    try {
        const doc = yaml.load(fse.readFileSync(filePath, 'utf8'));
        let floderPath = ''
        let collectionArr = []
        if (!(Array.isArray(doc) || isObject(doc))) {
            console.log(chalk.red('Please enter the correct configuration(请输入正确的配置)'))
            process.exit(1)
        }
        if (doc.config && isObject(doc.config)) {
            const { dirPath } = doc.config
            floderPath = dirPath
            collectionArr = doc.collection
            try {
                let result = await getFileStat(floderPath)
            } catch {
                console.log(chalk.yellow('The path does not exist'))
                const configObj = await readConfigPath()
                if (typeof configObj == 'boolean') {
                    // 没有配置路径
                    console.log(chalk.yellow('It was detected that you did not generate a profile（检测到您没有生成配置文件）'))
                    const { currentFloder } = await inquirer.prompt(mcQuestionList3)
                    floderPath = process.cwd()
                } else {
                    const { defaultFloder } = await inquirer.prompt(mcQuestionList2)
                    floderPath = configObj.defaultfolder
                }
            }
        } else {
            collectionArr = doc
        }


        const arr = await recursion(floderPath, collectionArr, [])

        Promise.all(arr).then(res => {
            console.log(chalk.green('completed'))
        }).catch(error => {
            throw error
            console.log(chalk.red('failed'))
        })
        async function recursion(floderPath, collectionArr, initVal) {
            const allDirFiles = await getDirFiles(floderPath)
            console.log(allDirFiles)

            for (let i = 0; i < collectionArr.length && i < allDirFiles.length; i++) {
                const oldName = path.join(floderPath, allDirFiles[i])
                const extName = extNameFn(oldName)

                if (collectionArr[i] && Array.isArray(collectionArr[i])) {
                    initVal.concat(recursion(oldName, collectionArr[i], []))
                } else if (collectionArr[i] && isObject(collectionArr[i])) {
                    for (let oldFileName in collectionArr[i]) {
                        // 当前根目录
                        const curOldName = path.join(oldName, oldFileName)
                        // 当前新文件名
                        const newFileName = collectionArr[i][oldFileName]
                        if (typeof newFileName == 'string') {
                            const curNewName = path.join(curOldName, newFileName)
                            initVal.push(reName(curOldName, curNewName))
                        } else if (Array.isArray(newFileName)) {
                            initVal.concat(recursion(curOldName, newFileName, []))
                        }
                    }

                } else if (typeof collectionArr[i] == 'string' && collectionArr[i] && collectionArr[i].length > 0) {
                    if (isHasExtname(collectionArr[i])) {
                        const newName = path.join(floderPath, collectionArr[i])
                        initVal.push(reName(oldName, newName))
                    } else {
                        const newName = path.join(floderPath, collectionArr[i] + extName)
                        initVal.push(reName(oldName, newName))
                    }
                }
            }

            return initVal

        }

    } catch (error) {
        throw error
    }
}

module.exports = {
    createMcAction
}