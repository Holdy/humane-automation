'use strict';

function Context() {
	this.workingMemory = {};
	
};

function newInstance() {
	return new Context();
}

Context.prototype.addToWorkingMemory = function(item, itemType) {
	let wrappedItem = {
		value : item,
		type: itemType
	};
	
	this.workingMemory[itemType] == wrappedItem;
	this.latest = wrappedItem;
}

Context.prototype.getLatest = function() {
	return this.latest ? this.latest.value : null;
	
}

module.exports.newInstance = newInstance;