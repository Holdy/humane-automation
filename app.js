'use strict';

let Script = require('./lib/Script');

//let textScript = Script.fromText('get https://minikeyval.herokuapp.com/keyval/get/chris\nprint the result');
//textScript.run();


async function go() {
//    let parseJson = await Script.fromTextAsync('read /home/ec2-user/environment/humane-automation/test/data/hue.disco.json');
  //  let context = await parseJson.runAsync();    
    
    let wmicOutput = await getResultAsync('load /home/ec2-user/environment/humane-automation/test/data/wmic-usb.txt');
    let stringerprint = require('./lib/stringerprint');
    let print = stringerprint.of(wmicOutput);
    let rawData = stringerprint.toRawData(print)
    let internalData = require('./lib/dataInternaliser').internalise(rawData);
    let x = 1;
}

async function getResultAsync(scriptText) {
    let script = await Script.fromTextAsync(scriptText);
    let context = await script.runAsync();
    return context.getResult();
}

go();

module.exports.getResultAsync = getResultAsync;
