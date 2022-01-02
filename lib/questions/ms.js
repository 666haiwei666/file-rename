const msQuestionList = [
    {
        type: 'input',
        name: 'floderPath',
        message: 'What is the folder of the modified file（修改文件的文件夹是什么）',
        default: process.cwd()
    },
    {
        type: 'checkbox',
        message: 'Please select the file to rename（请选择需要重命名的文件）',
        name: 'fileRange',
        choices: []
    },
    {
        type: 'input',
        name: 'commonSuffix',
        message: 'What is the general suffix of the file(文件的通用后缀是什么)',
    }
]

module.exports = { msQuestionList }