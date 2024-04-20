module.exports = ({core}, addonFilename) => {
  const fs = require('fs');
  const contents = fs.readFileSync(addonFilename);
  const metadata = JSON.parse(contents);
  const addonName = metadata.displayName;
  core.setOutput('addonName', addonName);
  const addonVersion = metadata.addonVersionName;
  core.setOutput('addonVersion', addonVersion);
  const addonSha256 = metadata.sha256;
  core.setOutput('addonSha256', addonSha256);
};
