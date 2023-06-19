function isHexadecimal(str) {
    const hexRegex = /^[0-9A-Fa-f]+$/g;
    return hexRegex.test(str);
}

// Tester si une chaine est une date
var isDate = function(date) {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

module.exports = {
    isHexadecimal,
    isDate
}
