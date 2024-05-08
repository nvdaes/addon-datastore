module.exports = ({github, core}, path) => {
  const fs = require('fs');
  const crypto = require('crypto');
  const addon = fs.readFileSync('addon.nvda-addon');
  const hash = crypto.createHash('sha256');
  hash.update(addon);
  const hex = hash.digest('hex');
  console.log(hex);
  const reviewedAddons = fs.readFileSync('reviewedAddons.json');
  const reviewedAddonsData = JSON.parse(reviewedAddons);
  if (reviewedAddonsData.reviewedAddons.includes(hex)) {
    core.info('Analysis skipped');
   return
  }
  const contents = fs.readFileSync(path);
  const data = JSON.parse(contents);
  const runs = data.runs[0];
  const results = runs.results;
  if (results.length === 0) {
    core.info("Security analysis succeeded");
  } else {
    reviewedAddonsData.reviewedAddons.push(hex);
    const stringified = JSON.stringify(reviewedAddonsData, null, 2);
    fs.writeFileSync('reviewedAddons.json', stringified);
    core.setFailed("Security analysis failed");
  }
};
