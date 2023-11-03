module.exports = async ({github, glob}, addonId) => {
  const fs = require('fs');
  const createDiscussion = require('createDiscussion.js');
  const createComment = rqequire('createComment.js');
  const data = JSON.parse(fs.readFileSync('./discussions.json'));
  const globber = await glob.create('addons/**/*.json')
for await (const file of globber.globGenerator()) {
  console.log(file)
  const addonIdRegex = RegExp("addons/(.*)/.*\.json");
            const addonId = addonIdRegex.exec(file)[1];
            if (addonId in data) {
              continue;
            }
            const discussion = createDiscussion(discussionInputs);
            data.addonId = {};
            data.addonId.discussionId = discussion.id;
            data.discussionUrl = discussion.url;
      }
      fs.writeFileSync('./discussions.json', JSON.stringify(data));
};

