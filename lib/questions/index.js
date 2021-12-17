const { firstLetterToUpperCase } = require('../utils/index');

['clear', 'mc', 'mi', 'once', 'revoke', 'inspect'].forEach(m => {
    Object.assign(exports, require(`./${firstLetterToUpperCase(m)}`))
})