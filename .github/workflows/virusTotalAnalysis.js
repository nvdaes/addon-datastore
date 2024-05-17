module.exports = ({core}) => {
  const fs = require('fs');
  const { exec } = require('child_process');
  const addonMetadataContents = fs.readFileSync('addonMetadata.json');
  const addonMetadata = JSON.parse(addonMetadataContents);
  const addonId = addonMetadata.addonId;
  core.setOutput('addonId', addonId);
  const sha256 = addonMetadata.sha256;
  exec(`vt file ${sha256} -k ${process.env.API_KEY} --format json`, (err, stdout, stderr) => {
    console.log(stdout);
  });
  const vtData = JSON.parse(stdout);
  const stats = vtData.find((element) => element === "last_analysis_stats");
  const malicious = stats.malicious;
  if (malicious === 0) {
    core.info("Virus Total analysis succeeded");
  } else {
    core.setFailed("Virus Total analysis failed");
  }
};
