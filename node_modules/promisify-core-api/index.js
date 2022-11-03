const util = require('util');

// http://stackoverflow.com/a/35825896
const nodecorelib = [...require('repl')._builtinLibs];

// regex to match Sync Method (it's a bit weak but it work)
const syncRegexProperty = /Sync$/;

const allApi = nodecorelib
  .reduce((prev, libname) => {
    // get module from module-name
    const lib = require(libname);
    
    // get all property of module
    const methods = Object.getOwnPropertyNames(lib) 
      // filter on property function and function name include syncRegexProperty
      .filter(name => typeof lib[name] === 'function' && syncRegexProperty.test(name))
      .reduce((prev, sync) => {
        // add a function on module, replace Sync by Async for function name
        // so with fs.readFile we generate a function fs.readFileAsync
        const promise = sync.replace(syncRegexProperty, 'Async');
        const callback = sync.replace(syncRegexProperty, '');

        prev.push({sync, promise, callback});

        lib[promise] = util.promisify(lib[callback]);

        return prev;
      }, []);
    
    // If there is some async function in this lib, append them to the object
    if (methods.length > 0) {
      prev[`require('${libname}')`] = methods;
    }
    
    return prev;
  }, {});

module.exports = allApi;