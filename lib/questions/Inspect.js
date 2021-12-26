const inspectQuestionList = [
    {
        type: 'confirm',
        name: 'confirm',
        message: 'Are you know rules of configuration file(您是否知道配置文件规则)',
        default: true
    },
    {
        type: 'confirm',
        name: 'cache',
        message: 'Whether to set the cache file in order to undo the changes(是否设置缓存文件,为了撤销更改)',
        default: true
    },
    {
        type: 'confirm',
        name: 'nameType',
        message: 'Is started with 0 when the figure smaller than ten(比10小的数字是否已0开始)',
        default: true
    },
    {
        type: 'input',
        name: 'defaultfolder',
        message: 'What is the default modified folder path(默认修改的文件夹) ',
        default: process.cwd()
    },
    {
        type: 'confirm',
        name: 'skip',
        message: 'Is skip asking before each operation(每次操作之前是否跳过询问)',
        default: true
    }
]

module.exports = { inspectQuestionList }