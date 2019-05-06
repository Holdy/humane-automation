
function internalise(rawDataList) {
	let resultList = [];
	
	rawDataList.forEach(rawItem => {
		if (rawItem.PNPDeviceID) {
			let resultItem = {value:{}};
			resultItem.source = rawItem;
			resultList.push(resultItem);

			let vidpid = parseDeviceId(rawItem.PNPDeviceID);
			if (vidpid) {
				resultItem.vid = vidpid.vid;
				resultItem.pid = vidpid.pid;
			}
		} else {
			throw new Error('Unknown Item');
		}
		
		
	});
	return resultList;
}

function parseDeviceId(id) {
	while (id.indexOf('&amp;') != -1) {
		id = id.replace('&amp;','&');
	}
	var result = {};
	id.split(/[&\\]/).forEach(part => {
		var index = part.indexOf('VID_');
		if (index != -1) {
			result.vid = part.substring(index+4);
		} else {
			index = part.indexOf('PID_');
			if (index != -1) {
				result.pid = part.substring(index+4);
			}
		} 
	});
	
	console.log(result);
	return result.pid && result.vid ? result : null;
}

module.exports.internalise = internalise;