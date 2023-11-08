
function check(value, msg) {
    if(!value) throw new Error(msg)
    if(value === false) throw new Error(msg)
}
function onlyNumber(value, msg) {
    if(!value) throw new Error(msg)
    if(value === false) throw new Error(msg)
    if(value != Number) throw new Error(msg)
}
function checkLength(value, msg) {
    if(value.length > 2) throw new Error(msg)
}
function exists(value, msg) {
    if(value) throw new Error(msg)
}
function notExists(value, msg) {
    if(!value || value <= 0 || value === undefined) throw new Error(msg)
}
function equalValue(value1, value2, msg) {
    if(value1 != value2) throw new Error(msg)
}
function equalFull(value1, value2, msg) {
    if(value1 !== value2) throw new Error(msg)
}



module.exports = { check , onlyNumber, checkLength, exists, notExists, equalFull , equalValue }