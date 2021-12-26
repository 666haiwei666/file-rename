function firstLetterToUpperCase(str) {
    return str.trim().replace(/^[a-z]+/g, function (s) {
        return s[0].toUpperCase() + s.slice(1)
    })
}

function completionNum(num) {
    return num < 10 ? '0' + num : num.toString()
}

module.exports = {
    firstLetterToUpperCase,
    completionNum
}
