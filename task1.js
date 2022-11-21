function defaultArguments(func, params) {
  let extrctdArgs = func
    .toString()
    .match(/\(([^)]*)\)/)[1] //get arguments
    .split(",") //get each argument
    .map((r) => r.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "").trim()); //remove comments & whitespaces

  let results;

  if (func.params) {
    func.params = params;
    results = func;
  } else {
    results = function self() {
      let prsntArgs = [].slice.call(arguments);
      if (prsntArgs.length < extrctdArgs.length) {
        for (let i = prsntArgs.length; i < extrctdArgs.length; i++) {
          prsntArgs.push(self.params[extrctdArgs[i]]);
        }
      }
      return func.apply(this, prsntArgs);
    };
    results.params = params;
  }
  return results;
}

//example
function add(a, b) {
  return a + b;
}

const add2 = defaultArguments(add, { b: 9 });
console.assert(add2(10) === 9);
console.assert(add2(10, 7) === 17);
console.assert(isNaN(add2()));

const add3 = defaultArguments(add, { a: 3, b: 9 });
console.assert(add3(10) === 13);
console.assert(add3() === 5);
console.assert(add3(undefined, 10) === 12);

const add4 = defaultArguments(add, { c: 3 });
console.assert(isNaN(add4(10)));
console.assert(add4(10, 10) === 20);
