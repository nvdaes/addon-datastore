module.exports = ({core}) => {
  const fs = require('fs');
  const { exec } = require('child_process');
  const addonMetadataContents = fs.readFileSync('addonMetadata.json');
  const addonMetadata = JSON.parse(addonMetadataContents);
  const addonId = addonMetadata.addonId;
  core.setOutput('addonId', addonId);
  const sha256 = addonMetadata.sha256;
  // const sha256 = '42335e36a209d39905414f0cbc71aa692338e3bf63efce8bc68d6949d2994ccd';
  falsePositiveAddonsContents = fs.readFileSync('falsePositiveAddons.json');
  falsePositiveAddonsData = JSON.parse(falsePositiveAddonsContents);
  if (falsePositiveAddonsData[addonId] !== undefined && falsePositiveAddonsData[addonId].includes(sha256)) {
    core.info('VirusTotal analysis skipped');
    return;
  }
  exec(`vt file ${sha256} -k ${process.env.API_KEY} --format json`, (err, stdout, stderr) => {
    console.log(stdout);
    const vtData = JSON.parse(stdout);
    fs.writeFileSync('vt.json', stdout);
    const stats = vtData[0]["last_analysis_stats"];
    const malicious = stats.malicious;
    if (malicious === 0) {
      core.info('VirusTotal analysis succeeded');
      return;
    }
    core.setFailed('VirusTotal analysis failed');
  });
};
