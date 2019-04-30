'use strict';

function processAsync(statement, context) {
	let latest = context.getLatest();
	
	if (!latest  && latest != 0 && latest != false) {
		console.log('[null]');
	} else {
		console.log(latest);
	}
}

module.exports.name = 'print-latest';
module.exports.processAsync = processAsync;