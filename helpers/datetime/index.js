function getCurrentDateTime() {
    const date = new Date()
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '')
}

function toLocaleString(datetime) {
    return new Date(datetime).toLocaleString()
}

module.exports = {
    getCurrentDateTime: getCurrentDateTime,
    toLocaleString: toLocaleString,
}
