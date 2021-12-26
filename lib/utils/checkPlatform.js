const chalk = require('chalk')
module.exports = () => {
  if(process.platform !== 'win32') {
    console.log(chalk.red(`This scaffold is not suitable for operation under this platform`))
    return false
  }
  return true
}