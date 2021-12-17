module.exports = (str) => {
    return str.trim().replace(/^[a-z]+/g, function (s) {
        return s[0].toUpperCase() + s.slice(1)
    })
}

