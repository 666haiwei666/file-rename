const onceQuestionList = [
    {
        type: 'input',
        message: 'What is the folder path of the modified file（修改文件的文件夹路径是什么）',
        name: 'floderPath',
        default: process.cwd()
    },
    {
        type: 'list',
        message: 'What was the old file name（旧的文件名是什么）',
        name: 'oldFileName',
        choices: [],
    },
    {
        type: 'input',
        message: 'What was the new file name（新的文件名是什么）',
        name: 'newFileName'
    }
]

module.exports = { onceQuestionList }