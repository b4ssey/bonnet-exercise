function defaultArguments(func, params) {
  let extrctdArgs = func
    .toString()
    .match(/\(([^)]*)\)/)[1]
    .split(",")
    .map((r) => r.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "").trim());

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
