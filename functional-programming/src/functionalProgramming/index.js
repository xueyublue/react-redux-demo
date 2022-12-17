import { compose, pipe } from "lodash/fp";
import { Map } from "immutable";
import { produce } from "immer";

// -----------------------------------------
// !functions as first-class citizens
// -----------------------------------------
// we can return a function
function sayHello() {
  return function () {
    return "Hello World";
  };
}

// we can assign function to a variable
const fn = sayHello;
console.log(fn()());

// we can take a function as parameter
function greeting(fnSayHello) {
  // invoke a returned function
  console.log(fnSayHello()());
}

// we can pass a function reference as a parameter
greeting(sayHello);

// -----------------------------------------
// !compose function with lodash library
// -----------------------------------------
let input = "  JavaScript  ";
const trim = (str) => str.trim();
const toLowerCase = (str) => str.toLowerCase();
const wrapInDiv = (str) => `<div>${str}</div>`;

console.log("normal: " + wrapInDiv(toLowerCase(trim(input))));

const transform1 = compose(wrapInDiv, toLowerCase, trim);
const transform2 = pipe(trim, toLowerCase, wrapInDiv);
console.log("transform1: " + transform1(input));
console.log("transform2: " + transform2(input));

// -----------------------------------------
// !problem
// -----------------------------------------
const wrap = (type, str) => `<${type}>${str}</${type}>`;
const transform3 = pipe(trim, toLowerCase, wrap);
// output >>> transform3: <javascript>undefined</javascript>
console.log("transform3: " + transform3(input));

// -----------------------------------------
// !what is currying
// -----------------------------------------
function normalAdd(a, b) {
  return a + b;
}

function curryingAdd(a) {
  return function (b) {
    return a + b;
  };
}

const curryingAdd2 = (a) => (b) => a + b;

console.log("curryingAdd: " + curryingAdd(1)(2));
console.log("curryingAdd2: " + curryingAdd2(1)(2));

// -----------------------------------------
// !apply currying
// -----------------------------------------
const wrap2 = (type) => (str) => `<${type}>${str}</${type}>`;
const transform4 = pipe(trim, toLowerCase, wrap2("span"));
console.log("transform4: " + transform4(input));

// -----------------------------------------
// !pure functions
// ----------------------------------------
// * rules
// same input always get same result
// no random values
// no current date/time
// no global state (DOM, files, db, etc)
// no mutation of parameters

// * benifits
// self-documenting
// easily testable
// concurrency
// cacheable

// -----------------------------------------
// !immutability
// ----------------------------------------
// * pros
// predictability
// faster change detection
// concurrency

// * cons
// performance
// memory overhead

// -----------------------------------------
// !immutable.js
// ----------------------------------------
let book = Map({ title: "Harry Potter" });

function publish(book) {
  return book.set("isPublished", true);
}

book = publish(book);

console.log(book.toJS());
console.log(book.get("title"));

// -----------------------------------------
// !immer.js
// ----------------------------------------
let product = { name: "iPhone 100 Max Pro" };

function publishProduct(product) {
  return produce(product, (draftProduct) => {
    draftProduct.isPuhlished = true;
  });
}

const updatedProduct = publishProduct(product);

console.log(updatedProduct);
