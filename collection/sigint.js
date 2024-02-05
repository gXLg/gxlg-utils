function sigint(callback) {
  let ctrlC = false;
  process.on("SIGINT", () => {
    process.stdout.write("\r");
    if (ctrlC) return;
    ctrlC = true;
    callback();
  });
}

module.exports = sigint;
