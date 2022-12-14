function sayHello() {
  return function () {
    return "Hello World";
  };
}

function greeting(fnSayHello) {
  console.log(fnSayHello()());
}

greeting(sayHello);
