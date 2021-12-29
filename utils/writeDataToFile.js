const fs = require("fs");

/**
 * @param {string} schema
 * @param {Object} data
 * @param {Function} callback
 *
 */

function writeDataToFile(schema, data) {
  const dataToWrite = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    fs.writeFile(schema, dataToWrite, (err) => {
      if (err) {
        return reject(new Error("write Data Failed!"));
      }
      resolve(data);
    });
  });
}

module.exports = writeDataToFile;
