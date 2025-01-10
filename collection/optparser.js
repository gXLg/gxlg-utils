module.exports = (args = []) => {
  if (args == null || args.constructor != [].constructor) {
    throw new Error("Parser: Argument 'args' has a wrong type! Expected one of: Array");
  }
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg == null || arg.constructor != {}.constructor) {
      throw new Error("Parser: Argument field 'args[" + i + "]' has a wrong type! Expected one of: Object");
    }
    for (const [param, r, t] of [["name", true, ""], ["required", false, false], ["types", true, []]]) {
      if (arg[param] == null && !r) { arg[param] = t; }
      if (!(param in arg)) {
        throw new Error("Parser: Argument field 'args[" + i + "]." + param + "' is required");
      }
      if (arg[param] == null || arg[param].constructor != t.constructor) {
        throw new Error("Parser: Argument field 'args[" + i + "]." + param + "' has a wrong type! Expected one of: " + t.constructor.name);
      }
    }
  }

  return (opt = {}) => {
    if (opt == null || opt.constructor != {}.constructor) {
      throw new Error("Argument 'options' has a wrong type! Expected one of: Object");
    }
    const options = {};
    for (const { name, required, types } of args) {
      const value = opt[name];
      let valid = value == null;
      if (!valid) {
        for (const d of types) {
          if (value.constructor == d.constructor) {
            valid = true;
            break;
          }
        }
      }
      if (!valid) {
        throw new Error(
          "Argument '" + name + "' has a wrong type! Expected one of: " +
          [...new Set(types.map(d => d.constructor.name))].join(", ")
        );
      }
      if (required && value == null) {
        throw new Error("Non-null argument '" + name + "' is required");
      }
      options[name] = value ?? types[0];
    }
    return options;
  };
};



/*

  const args = [
    ["cookie", false, "token"],
    ["path", true, ""],
    ["secret", true, ""],
    ["username", false, 24],
    ["secure", false, true],
    ["verify", false, false]
  ];

  const options = { };



*/
