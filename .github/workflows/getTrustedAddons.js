module.exports = (path) => {
  const fs = require('fs');
  const contents = fs.readFileSync(path);
  const data = JSON.parse(contents);
  return data.trustedAddons;
};
