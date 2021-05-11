require("babel-register");
const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    if (req.url == "/") {
      res.writeHead(200, { "Content-type": "text/html" });
      res.write("<h1>Accueil\n</h1>");
      res.end();
    } else if (req.url == "/test") {
      fs.readFile("test.txt", "utf-8", (err, data) => {
        if (err) {
          send404(res)
        } else {
          res.writeHead(200, { "Content-type": "text/html" });
          res.write(data);
          res.end();
        }
      })
    } else {
      send404(res)
    }
  })
  .listen(8080);

function send404(res) {
  res.writeHead(404, { "Content-type": "text/html" })
  res.write("<span style='color:red'>Erreur 404</span>")
  res.end();
}

////////////////////////////////////////
//  Module FS
////////////////////////////////////////
// const fs = require('fs');

// fs.readFile('test.txt', 'utf-8', (err, data) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(data)

//     fs.writeFile('test.txt', 'Hello World !', 'utf-8', (err) => {
//       fs.readFile('test.txt', 'utf-8', (err, data) => {
//         console.log(data);
//       })
//     })
//   }
// })

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
