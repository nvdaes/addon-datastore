module.exports = async ({github}, discussionInputs) => {
  const mutation = `mutation {
    createDiscussion(input: discussionInputs)
    
{discussion {
        id
        url
      }
    }`
  const response = await github.graphql(mutation);
  return response;
};
