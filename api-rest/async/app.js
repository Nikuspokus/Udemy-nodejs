require("babel-register");

console.log("Début");
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p1");
  }, 1500);
});
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p2");
  }, 3000);
});

// promise .all ne s'affiche que lorsque les setTimeOut sont finis

// le .all récupère tous les résultats
Promise.all([p1, p2]).then((result) => console.log(result));

// le .race récupère le premier résultat qui arrive
Promise.race([p1, p2]).then((result) => console.log(result));

console.log("Fin");
// getMember()
//     .then(member => getArticles(member))
//     .then(articles => console.log(articles))
//     .catch(err => console.log(err.message))

// function getMember() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('Member 1');
//             resolve('Member 1')
//             // reject(new Error('Error during getMember()'))
//         }, 1500)
//     })
// }

// function getArticles(member) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             // resolve([1,2,3])
//             reject(new Error('Error during getArticles()'))
//         }, 1500)
//     })
// }

// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('All good. !')
//     // reject(new Error("Error during..."));
//   }, 1500);
// })
//   .then((message) => console.log(message))
//   .catch((err) => console.log(err.message));

// Callbacks
// Promise
// Async / Await
