const path = require('path')
const mcQuestionList1 = [
    {
        type: 'confirm',
        name: 'confirm',
        message: 'Are you know rules of configuration file(您是否知道配置文件规则)',
        default: true
    }
]

const mcQuestionList2 = [
    {
        type: 'confirm',
        name: 'defaultFloder',
        message: 'is switch to default configuration path(是否切换到默认配置路径)',
        default: true
    },
]

const mcQuestionList3 = [
    {
        type: 'confirm',
        name: 'currentFloder',
        message: 'is switch to current path(是否切换到当前目录)',
        default: true
    },
]

const mcQuestionList4 = [
    {
        type: 'input',
        name: 'filePath',
        message: 'Please input according to the rules， Please enter when finished (请根据规则配置完成后，输入配置文件路径)',
        default: path.join(process.cwd(), 'teample.yaml')
    },
]

module.exports = {
    mcQuestionList1,
    mcQuestionList2,
    mcQuestionList3,
    mcQuestionList4
}