module.exports = ({core, exec}) => {
  const fs = require('fs');
  const addonMetadataContents = fs.readFileSync('addonMetadata.json');
  const addonMetadata = JSON.parse(addonMetadataContents);
  const addonId = addonMetadata.addonId;
  core.setOutput('addonId', addonId);
  const sha256 = addonMetadata.sha256;
  let vtOutput = '';
  const options = {};
  options.listeners = {
    stdout: (data: Buffer) => {
      vtOutput += data.toString();
    }
  };
  exec.exec(`vt file ${sha256} -k ${process.env.API_KEY} --format json`, options);
  const falsePositiveAddonsContents = fs.readFileSync('falsePositiveAddons.json');
  const falsePositiveAddonsData = JSON.parse(falsePositiveAddonsContents);
  if (falsePositiveAddonsData[addonId] !== undefined && falsePositiveAddonsData[addonId].includes(sha256)) {
    core.info('VirusTotal false positive');
    return;
  }
  const vtData = JSON.parse(options.listeners.vtOutput);
  const stats = vtData.find((element) => element === "last_analysis_stats");
  const malicious = stats.malicious;
  if (malicious === 0) {
    core.info("Virus Total analysis succeeded");
  } else {
    core.setFailed("Virus Total analysis failed");
  }
};
