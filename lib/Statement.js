'use strict';

function Statement() {};

function fromLine(text, lineNumber) {
    let cleanText = text.trim();
    let result = new Statement();
    
    result.lineNumber = lineNumber;
    let parts = text.split(' ');
    if (parts.length == 2 && parts[0] == 'get') {
        result.url = parts[`1`];
        result.implementation = require('./implementations/get-url');
    } else if (cleanText == 'print the result') {
        result.implementation = require('./implementations/print-latest');
        
    } else {
        var error = new Error(`Line ${lineNumber} was not recognised.`);
        error.lineNumber = lineNumber;
        throw error;
    }
    
    return result;
}

module.exports.fromLine = fromLine;