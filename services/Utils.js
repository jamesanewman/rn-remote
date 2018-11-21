const R = require('ramda');
let utils = {};

const B = 1;
const KB = 1024;
const MB = KB * KB;
const GB = MB * KB;

function renameFields(fieldMap, record){
    return R.reduce((mappedRecord, key) => {
        if(fieldMap[key]){
            mappedRecord[fieldMap[key]] = record[key];
        }
        return mappedRecord;
    }, {}, R.keys(record))       
}

function createFieldRenamer(fieldMap = {}){
    return R.partial(renameFields, [fieldMap]);
}

let convert = { mb2Byte: bytes => MB * bytes };

module.exports = { createFieldRenamer, renameFields, convert };