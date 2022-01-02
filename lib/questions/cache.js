const cache1QuestionList = [
    {
        type: 'confirm',
        name: 'confirm',
        message: 'Whether to set the cache file in order to undo the changes(是否设置缓存文件,为了撤销更改)',
        default: false
    }
]

const cache2QuestionList = [
    {
        type: 'input',
        name: 'cahceFileName',
        message: 'Please enter the file record name to undo the change later(请输入文件记录名称方便以后撤销更改)'
    }
]

module.exports = {
    cache1QuestionList,
    cache2QuestionList
}