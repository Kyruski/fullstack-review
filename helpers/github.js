const request = require('request');
const config = require('../config.js');

const formatRepo = (item) => {
  const repoInfo = {
    _id: item.id,
    repo: item.name,
    author: item.owner.login,
    author_avatar: item.owner.avatar_url,
    url: item.html_url,
    stars: item.stargazers_count,
    forks: item.forks_count
  };
  return repoInfo;
};

const formatResponseData = (data) => {
  let repos = [];
  for (let item of data) {
    let repoObj = formatRepo(item);
    repos.push(repoObj);
  }
  return repos;
}

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (err, res, body) => {
    if (err) {
      callback(err);
    } else {
      const data = JSON.parse(body)
      const repos = formatResponseData(data);
      callback(null, repos);
    }
});
}

module.exports.getReposByUsername = getReposByUsername;
