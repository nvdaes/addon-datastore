module.exports = (path, sha256) => {
  const fs = require('fs');
  const contents = fs.readFileSync(path);
  const data = JSON.parse(contents);
  const trustedAddons = data.trustedAddons;
  if (trustedAddons.includes(sha256)) {
	  console.log('included');
    return false;
  }
  return true;
};
