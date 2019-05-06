'use strict';

var type = {
	nothing: 'nothing',
	unknown: 'unknown',
	keyValue: 'keyValue',
	mixed:'mixed',
	keyValueList: 'keyValueList'
};

var subtype = {
	null : 'null',
	empty: 'empty',
	whitespace: 'whitespace',

};

var nullValue = 'null';


function of(text) {
	if (text==null) {
		return {type: type.nothing, subtype: subtype.null};
	} else if (text == '') {
		return {type: type.nothing, subtype: subtype.emtpy};
	} else if (text.trim() == '') {
		return {type: type.nothing, subtype: subtype.whitespace};
	}
	
	var lines = text.split('\n');
	if (lines.length > 1) {
		var result = {lines:[]};
		var typeMap = {};
		lines.forEach(line => {
			var lineInfo = of(line.trim());
			increment(lineInfo.type, typeMap);
			var listEntry = {
				text:line,
				stringerprint: lineInfo
			};
			result.lines.push(listEntry);
		});
		
		let nothingCount = typeMap[type.nothing];
		if (nothingCount == lines.length) {
			// Shouldn't get here, but in any case its *LOTS* of whitespace.
			result.type = type.nothing;
			result.subtype = subtype.whitespace;
		} else {
			var keyValueCount = typeMap[type.keyValue];
			if ((keyValueCount + nothingCount) == lines.length) {
				result.type = type.keyValueList;
				return result;
			}
		}
	} else { // it's a single line
		var result = {};
		var indexOfEquals = text.indexOf('=');
		if (indexOfEquals > 0) {
			result.type = type.keyValue;
			result.subtype = subtype.keyValueEquals;
			result.key = text.substring(0,indexOfEquals);
			result.value = text.substring(indexOfEquals+1);
			
		} else {
			result.type= type.unknown;
		}
		return result;
	}
	
	return {type: type.unrecognised};
}

function toRawData(input) {
	var items = input.lines;
	if (!items) {
		throw new Error('No lines');
	}
	
	var resultList = [];
	var currentRaw = null;
	items.forEach(item => {
		if (item.stringerprint.type == type.nothing) {
			// treat as a separator.
			currentRaw = null;
		} else {
			if (item.stringerprint.type == type.keyValue) {
				var valueStringerprint = of(item.stringerprint.value);
				if (valueStringerprint.type == type.nothing) {
					// ignore this
				} else {
					// add it to current object.
					if (!currentRaw) {
						currentRaw = {};
						resultList.push(currentRaw);
					}
					currentRaw[item.stringerprint.key] = item.stringerprint.value;
				} 
			} else {
				throw new Error('Unhandled datatype for toRawData() conversion:' + item.stringerprint.type)
			}
		}
	});
	
	return resultList;
}


function increment(key, map) {
	var current = map[key];
	if (!current) {
		map[key] = 1;
	} else {
		map[key] = ++current;
	}
}

module.exports.of = of;
module.exports.toRawData = toRawData;