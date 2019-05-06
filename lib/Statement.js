'use strict';

var Script = require('./Script');
function Statement() {};

async function fromLineAsync(text, lineNumber) {
    let cleanText = text.trim();
    let result = new Statement();
    
    result.lineNumber = lineNumber;
    let parts = text.split(' ');
    if (parts.length == 2 && parts[0] == 'get') {
        result.url = parts[`1`];
        result.implementation = require('./implementations/get-url');
        
    } else if (cleanText == 'print the result') {
        result.implementation = require('./implementations/print-latest');
        
    } else if (cleanText.startsWith('read ') || cleanText.startsWith('load ')) {
        result.fileName = cleanText.substring(5);
        result.implementation = require('./implementations/read-file');

    } else if (cleanText.startsWith('get file info for ')) {
        result.fileName = cleanText.substring(18);
        result.implementation = require('./implementations/get-file-info-for');
    
    } else {
        var error = new Error(`Line ${lineNumber} was not recognised.`);
        error.lineNumber = lineNumber;
        throw error;
    }
    
    return result;
}

module.exports.fromLineAsync = fromLineAsync;