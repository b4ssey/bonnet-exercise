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
console.log(add2(10) === 19);
console.log(add2(10, 7) === 17);
console.log(isNaN(add2()));

const add3 = defaultArguments(add, { a: 2, b: 3 });
console.log(add3(10) === 13);
console.log(add3() === 5);
console.log(add3(null, 10) === 12);

const add4 = defaultArguments(add, { c: 3 });
console.log(isNaN(add4(10)));
console.log(add4(10, 10) === 20);
