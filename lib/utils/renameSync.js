const { rename } = require('fs')
const chalk = require('chalk')

module.exports = (oldFile, newFile) => {
    let res = rename(oldFile, newFile, (error) => {
        if (error) throw error
        console.log(chalk.green(`Modification completed`))
    })
    return res
}