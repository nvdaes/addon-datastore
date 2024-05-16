module.exports = ({core, exec}) => {
  const fs = require('fs');
  const addonMetadataContents = fs.readFileSync('addonMetadata.json');
  const addonMetadata = JSON.parse(addonMetadataContents);
  const addonId = addonMetadata.addonId;
  core.setOutput('addonId', addonId);
  const sha256 = addonMetadata.sha256;
  exec.exec(`vt file ${sha256} -k ${process.env.API_KEY} --format json > vt.json`);
  const falsePositiveAddonsContents = fs.readFileSync('falsePositiveAddons.json');
  const falsePositiveAddonsData = JSON.parse(falsePositiveAddonsContents);
  if (falsePositiveAddonsData[addonId] !== undefined && falsePositiveAddonsData[addonId].includes(sha256)) {
    core.info('VirusTotal false positive');
    return;
  }
  const contents = fs.readFileSync('vt.json');
  const data = JSON.parse(contents);
  const stats = data.find((element) => element === "last_analysis_stats");
  const malicious = stats.malicious;
  if (malicious === 0) {
    core.info("Virus Total analysis succeeded");
  } else {
    core.setFailed("Virus Total analysis failed");
  }
};
