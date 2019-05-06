'use strict';

let fs = require('fs');
let interpret = require('../interpret');
let semantics = require('../semantics');

function processAsync(statement, context) {
    let target = statement.fileName;

    return new Promise((resolve, reject) => {
        fs.stat(target, (err, data) => {
            if (err) {
                return reject(err);
            }       
            let internalData = {
                'isDirectory': data.isDirectory(),
                'isFile': data.isFile()
            };
            context.addToWorkingMemory(internalData, 'file info');
            resolve(data);
        });


    });
}

module.exports.name = __filename;
module.exports.processAsync = processAsync;