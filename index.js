const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, '/smsbox.log');
var text = fs.readFileSync(dirPath,'utf8');
var array = text.split("\n");
var dataArray = [];
for(var i=0; i<array.length; i++){
 if(array[i].includes("WARNING") || 
 array[i].includes("ERROR:") || 
 array[i].includes("INFO: smsbox:")  ||
 array[i].includes("INFO: sendsms")){continue}
  let tempArray = []
  tempArray = array[i].split("INFO:");
  dataArray.push(tempArray)
};
var json = [];
var c = 0;

dataArray.forEach( (e1) =>{
  // isdate = true;
  var tempjson = {};
  e1.forEach( (e2) =>{
    var key;
    if(e2.includes(":") )  {
        key = 'date';
        var splittedKey = e2.split(' ');
        var value = splittedKey[0] + ' ' + splittedKey[1];
        tempjson[key] = value;
    }
    else {
        var splittedKey = e2.split('<');
        var value1 = splittedKey[1].split('>')[0];
        var value2 = splittedKey[2].replace(/[> to\s]/g, '');
        tempjson['message']= value1;
        tempjson['MSISDN'] = value2;
    }
  })
  //json[c] = tempjson;
  json.push(tempjson);
 c++
});

var info = JSON.stringify(json)
console.log(json)
//console.log(dataArray);

fs.appendFile('newfile.json', info, function (err) {
  if (err) throw err;
  console.log('File is created successfully.');
}); 

// const process = require('process')
// const argv = require('minimist')(process.argv.slice(2), {
//     alias: {
//        h: 'help',
//        v: 'version'
//     }
// });

// argv.src;
// argv.file;
