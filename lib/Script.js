'use strict';

let Statement = require('./Statement');
let Context   = require('./Context');

function Script() {};

function fromText(text) {
    
    let latestTopLevelStatement = null;
    let lines = text.split('\n');
    let lineNumber = 1;
    let statements = [];
    
    lines.forEach(line => {
        let cleanLine = line.trim();
        if (cleanLine != null) {
            let statement = Statement.fromLine(cleanLine, lineNumber); 
            if (isIndented(line)) {
                if (latestTopLevelStatement) {
                    latestTopLevelStatement.addChild(statement);
                } else {
                    let error = new Error(`Line ${lineNumber} is indented but there is no parent statement.`);
                    error.lineNumber = lineNumber;
                    throw error;
                }
            } else {
                latestTopLevelStatement = statement;
                statements.push(statement);
            }
        }
        
        lineNumber++;
    });
    
    let result = new Script();
    result.statements = statements;
    
    return result;
    
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

Script.prototype.run = function() {
    let context = Context.newInstance();
    
    asyncForEach(this.statements, async (statement) => {
        await statement.implementation.processAsync(statement, context);
    });

};

function isIndented(text) {
    return text && (text.startsWith(' ') || text.startsWith('\t'));
}

module.exports.fromText = fromText;