'use strict';

function Script(options) {
   if (options.fileName != null) {
	readFromFile(this, fileName);
   } else {
      throw new Error(logwell.field('fileName').from('options').notPresent.toErrorText);
   }
}

function readFromFile(script, fileName) {	
    let previousStatement = null;
    let rawLines= io.yum.
	
	

}



module.exports = Script;