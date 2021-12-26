const miQuestionList = [
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
        name: 'commonPrefix',
        message: 'What is the prefix common to the file(文件公共的前缀是什么)',
    },
    {
        type: 'confirm',
        name: 'numType',
        message: 'Is started with 0 when the figure smaller than ten(比10小的数字是否已0开始) ',
        default: true
    }


]

module.exports = { miQuestionList }