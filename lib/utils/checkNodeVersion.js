const semver = require('semver')
const chalk = require('chalk')

module.exports = (version, pkgName) => {
    if (!semver.satisfies(process.version, version, { includePrerelease: true })) {
        let limit = semver.minVersion(version)
        console.log(chalk.red(`
            You are using Node ${process.version}, but ${pkgName} need Node Version above ${limit.version}.
        Please upgrade your Node version.
        `))
        process.exit(1)
    }
}