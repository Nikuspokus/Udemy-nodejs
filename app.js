require("babel-register");

function say(word) {
  console.log(word);
}

function execute(someFunction, value) {
  someFunction(value);
}

execute(say, "test");

setTimeout(function execute() {
    console.log('test 2');
}, 1000)

setTimeout(() => console.log('test fonction simplifier'))
