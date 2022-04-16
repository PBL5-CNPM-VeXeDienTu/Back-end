function getCurrentDateTime() {
    const date = new Date()
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '')
}

module.exports = getCurrentDateTime
