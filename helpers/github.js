const request = require('request');
require('dotenv').config();

const formatRepo = (item) => {
  const repoInfo = {
    _id: item.id,
    repo: item.name,
    author: item.owner.login,
    author_avatar: item.owner.avatar_url,
    link: item.html_url,
    stars: item.stargazers_count,
    forks: item.forks_count
  };
  return repoInfo;
};

const formatResponseData = (data) => {
  let repos = [];
  if (data.message === 'Not Found') return null;
  for (let item of data) {
    let repoObj = formatRepo(item);
    repos.push(repoObj);
  }
  return repos;
}

let getReposByUsername = (username, callback) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'request',
      'Authorization': `token ${process.env.TOKEN}`
    }
  };

  request(options, (err, res, body) => {
    if (err) {
      callback(err);
    } else {
      const data = JSON.parse(body)
      const repos = formatResponseData(data);
      if (repos) {
        callback(null, repos);
      } else {
        callback('The server was unable to get the user\'s repos');
      }
    }
});
}

module.exports.getReposByUsername = getReposByUsername;
