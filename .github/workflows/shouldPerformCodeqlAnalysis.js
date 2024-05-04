module.exports = ({core}, sha256) => {
  const fs = require('fs');
  const path = 'trustedAddons.json';
  const contents = fs.readFileSync(path);
  const data = JSON.parse(contents);
  const trustedAddons = data.trustedAddons;
  if (trustedAddons.includes(sha256)) {
	  return false;
  }
  return true;
}