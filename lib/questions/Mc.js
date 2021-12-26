const mcQuestionList = [
    {
        type: 'confirm',
        name: 'confirm',
        message: 'Are you know rules of configuration file(您是否知道配置文件规则)',
        default: true
    },
    {
        type: 'input',
        name: 'filePath',
        message: 'Please input according to the rules， Please enter when finished (请根据规则配置完成后，输入配置文件路径)'
    }
]

module.exports = {
    mcQuestionList
}