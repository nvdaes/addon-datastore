module.exports = ({context, core}) => {
  const fs = require('fs');
  console.log(context);
  const addonFilename = context.needs.getAddonFilename.outputs.addonFileName;
  const contents = fs.readFileSync(addonFilename);
  const metadata = JSON.parse(contents);
  const addonId = metadata.addonId;
  core.setOutput('addonId', addonId);
  const addonName = metadata.displayName;
  core.setOutput('addonName', addonName);
  const addonVersion = metadata.addonVersionName;
  core.setOutput('addonVersion', addonVersion);
};
