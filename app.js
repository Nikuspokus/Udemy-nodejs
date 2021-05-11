require('babel-register');
const fs = require('fs');

fs.readFile('test.txt', 'utf-8', (err, data) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data)

    fs.writeFile('test.txt', 'Hello World !', 'utf-8', (err) => {
      fs.readFile('test.txt', 'utf-8', (err, data) => {
        console.log(data);
      })
    })
  }
})





////////////////////////////////////////
//  Module OS
////////////////////////////////////////

// const os = require('os');

// console.log(os.arch());
// console.log(os.homedir());


////////////////////////////////////////
//  Utilisation ECMAScript6 (ES6)
////////////////////////////////////////

// require("babel-register");

// function say(word) {
//   console.log(word);
// }

// function execute(someFunction, value) {
//   someFunction(value);
// }

// execute(say, "test");

// setTimeout(function execute() {
//     console.log('test 2');
// }, 1000)

// setTimeout(() => console.log('test fonction simplifier'))
