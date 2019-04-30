'use strict';

let interpret = require('../interpret');
let semantics = require('../semantics');

function processAsync(statement, context) {
    let url = statement.url;
    let httpLib;
    
    if (url.toLowerCase().startsWith('https://')) {
        httpLib = require('https');
    } else {
        httpLib = require('http');
    }
    
    return new Promise((resolve, reject) => {
        
        httpLib.get(url, function(res) {
            var body = '';
            var contentType = interpret(res.headers['content-type']); 
            
            res.on('data', function(chunk) {
                body += chunk;
            });
            
            res.on('end', function() {
                let result;
                    
                try {
                    if (contentType.implies(semantics.javascript)) {
                        result = JSON.parse(body);
                    } else {
                        result = body;
                    }
                    
                    context.addToWorkingMemory(body, 'response');
                    resolve(body);
                } catch (bodyError) {
                    reject(bodyError);
                }
            });
        }).on('error', reject); 
        
    });
}

module.exports.name = 'get-url';
module.exports.processAsync = processAsync;