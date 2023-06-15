function isHexadecimal(str) {
    const hexRegex = /^[0-9A-Fa-f]+$/g;
    return hexRegex.test(str);
}


module.exports = {
    isHexadecimal
}
