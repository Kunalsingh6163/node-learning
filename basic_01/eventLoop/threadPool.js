const fs = require("fs");
const os = require("os");

console.log(1);

// Blocking req...
          // const result = fs.readFileSync('./test2.txt', 'utf-8');
          // console.log("i am blocking request result", result );
//Non-Blocking req...
fs.readFile("./fileSystem/test2.txt", "utf-8", (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});

console.log(2);
// check the no of thread in the cpu

console.log(os.cpus().length);
