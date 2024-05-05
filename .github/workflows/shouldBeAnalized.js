module.exports = ({core}, path, sha256) => {
  const fs = require('fs');
  const contents = fs.readFileSync(path);
  const data = JSON.parse(contents);
  if (data.trustedAddons.includes(sha256)) {
    core.setFailed('SHA-256 included in trusted add-ons');
  }
};
