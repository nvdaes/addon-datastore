module.exports = ({core}, path) => {
  const fs = require('fs');
  const contents = fs.readFileSync(path);
  const data = JSON.parse(contents);
  const stats = data.find((element) => element === "last_analysis_stats");
  const malicious = stats.malicious;
  if (malicious === 0) {
    core.info("Virus Total analysis succeeded");
  } else {
    core.setFailed("Virus Total analysis failed");
  }
};
