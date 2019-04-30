'use strict';

let Script = require('./lib/Script');

let script = Script.fromText('get https://minikeyval.herokuapp.com/keyval/get/chris\nprint the result');

script.run();