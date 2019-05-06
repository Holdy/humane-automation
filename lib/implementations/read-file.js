'use strict';

let interpret = require('../interpret');
let semantics = require('../semantics');

function processAsync(statement, context) {
    var fileName = statement.fileName;
    if (fileName.endsWith('.json')) {
        //TODO this may cache the file conent :/
        var content = require(fileName);
        context.addToWorkingMemory(content,'file content');
    } else if (fileName.endsWith('.txt')) {
        return new Promise((resolve, reject) => {
            require('fs').readFile(fileName, (err, buff) => {
                if (err) {
                    return reject(err);
                } else {
                    context.addToWorkingMemory(buff.toString(), 'file content');
                    resolve(buff.toString());
                }
            });        
            
            
        });

    } else {
        var error = new Error('Did not know how to read file type.');
        error.statement = statement;
        throw error;
    }
}

module.exports.name = __filename;
module.exports.processAsync = processAsync;