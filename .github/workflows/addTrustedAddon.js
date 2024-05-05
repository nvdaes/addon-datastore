module.exports = (path, sha256) => {
  const fs = require('fs');
  const contents = fs.readFileSync(path);
  const data = JSON.parse(contents);
  const trustedAddons = data.trustedAddons;
  trustedAddons.push(sha256);
  stringified = JSON.stringify(data, null, 2);
  fs.writeFileSync(path, stringified);
};
