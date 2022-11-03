const functions = require('.');

console.log(functions);

// use-case :3
const path = require('path');
const fs = require('fs');

// then
fs.readFileAsync(path.join(__filename))
  .then(txt => console.log(txt.toString()))
  .catch(err => console.log(err));

// catch
fs.readFileAsync(path.join(__dirname, __dirname))
  .then(txt => console.log(txt.toString()))
  .catch(err => console.log(err));