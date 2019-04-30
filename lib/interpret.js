'use strict';

let semantics = require('./semantics');

function Interpretation() {};

Interpretation.prototype.implies = function(test) {
	return test == this.implied;
}

function interpret(text) {
	var result = new Interpretation();
	
	if (text) {
		if (text.startsWith('application/json')) {
			result.implied = semantics.javascript;
		}
	}

	return result;
}

module.exports = interpret;