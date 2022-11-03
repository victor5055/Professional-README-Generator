# Promisify Core Api

this is a node module who will inject new Async methods im core module of NodeJS based on Sync function with usage of callback method promisify by `util.promisify(callback)`

For example, in NodeJS we have in fs :

- `fs.readFileSync(path) : string` (bad idea)
- `fs.readFile(path, callback: (err, content :str) => void) : void` (good but risk of callback hell)

With require this module you'll have a new function :

- `fs.readFileAsync(path) : Promise<content: string, err>` (Yeah a Promise, we can chain, await, etc..., help to keep a flat code ^^)

# Requirements

no-one except Node 8+

The big magic is in the new util.promisify function added in Node 8.

# Install

```
npm install promisify-core-api --save
```

# Usage

In the earlier entry point of your program :

```js
require('promisify-core-api');
```

And thats it, now, everywhere on your program, you can replace a `Sync` Node Core function by `Async` and use use the Promise returned.

# Example

#### With Promise style

```js
require('promisify-core-api'); // at the very earlier entry point of your program, One time

// somewhere in your code
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
```

#### With async - await style

```js
require('promisify-core-api'); // at the very earlier entry point of your program, One time

// somewhere in your code
const path = require('path');
const fs = require('fs');

// async IIFE, yeah it's preaty ugly but we can't await in global scope, global scope is not async
(async () => {
    // then
    try {
        const txt = await fs.readFileAsync(path.join(__filename));
        console.log(txt.toString());
    } catch (err) {
        console.log(err);
    }

    // catch
    try {
        const txt = await fs.readFileAsync(path.join(__dirname, __dirname));
        console.log(txt.toString());
    } catch (err) {
        console.log(err);
    }
})();
```

## Bonus

```js
const functions = require('promisify-core-api');

console.log(functions);
```

You will see all supported functions, and get original sync, callback api and the promisify api (function name, not directly the function).

See below part of this big object

```js
{
    'require(\'fs\')': [
        {
            sync: 'accessSync',
            promise: 'accessAsync',
            callback: 'access'
        },
        {
            sync: 'existsSync',
            promise: 'existsAsync',
            callback: 'exists'
        },
        {
            sync: 'readFileSync',
            promise: 'readFileAsync',
            callback: 'readFile'
        },
        {
            sync: 'closeSync',
            promise: 'closeAsync',
            callback: 'close'
        },
        {
            sync: 'openSync',
            promise: 'openAsync',
            callback: 'open'
        },
        {
            sync: 'readSync',
            promise: 'readAsync',
            callback: 'read'
        },
        {
            sync: 'writeSync',
            promise: 'writeAsync', 
            callback: 'write'
        },
        {
            sync: 'renameSync',
            promise: 'renameAsync',
            callback: 'rename'
        }, ...
    ], ...
}
```