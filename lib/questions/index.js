['mc', 'mi', 'once', 'revoke', 'inspect'].forEach(m => {
    Object.assign(exports, require(`./${m}`))
})