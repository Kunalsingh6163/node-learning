const fs = require("fs");

function logResponce(fileName) {
  return (req, res, next) => {
    fs.appendFile(
      fileName,
      `\n ${Date.now()} : ${req.ip} : ${req.method} : ${req.path} \n`,
      (err, data) => {
        console.log(err);
        next();
      }
    );
  };
};

module.exports = {logResponce}
