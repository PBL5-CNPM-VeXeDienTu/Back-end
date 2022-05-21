function getCurrentDateTime() {
    const date = new Date()
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '')
}

function toLocaleString(datetime) {
    const date = new Date(datetime)
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '')
}

function formatDate(date) {
    const handleDate =
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1 < 10 ? '0' : '') +
        (date.getMonth() + 1) +
        '-' +
        date.getDate() +
        ' ' +
        date.getHours() +
        ':' +
        date.getMinutes() +
        ':' +
        date.getSeconds()
    return new Date(handleDate)
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '')
}

function getExpireOfPackage(typePackageId) {
    var date = new Date()
    // const now = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    // console.log(new Date(now.setMonth(date.getMonth() + 1) - date.getTimezoneOffset() * 60000));
    console.log(getCurrentDateTime())
    if (typePackageId == 1) {
        date.setDate(date.getDate() + 7)
        var finalDate = formatDate(date)
        return finalDate
    }
    if (typePackageId == 2) {
        date.setDate(date.getDate() + 30)
        var finalDate = formatDate(date)
        return finalDate
    }
    if (typePackageId == 3) {
        date.setDate(date.getDate() + 120)
        var finalDate = formatDate(date)
        return finalDate
    }
    if (typePackageId == 4) {
        date.setDate(date.getDate() + 360)
        var finalDate = formatDate(date)
        return finalDate
    }
}

module.exports = {
    getExpireOfPackage: getExpireOfPackage,
    getCurrentDateTime: getCurrentDateTime,
    toLocaleString: toLocaleString,
}
