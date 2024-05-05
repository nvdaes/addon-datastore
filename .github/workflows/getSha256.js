module.exports = (path) => {
  const fs = require('fs');
  const crypto = require('crypto');
  const contents = fs.readFileSync(path);
  const hash = crypto.createHash('sha256');
  hash.update(contents);
  const hex = hash.digest('hex');
  console.log(hex);
  return hex
};
