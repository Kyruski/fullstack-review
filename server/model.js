const db = require('../database/index.js');

module.exports = {
  insertRepo: (repo, callback) => {
    const item = db.Repo(repo[0]);
    db.save(item, repo[0]._id, (err, response) => {
      if (err) {
        callback(err);
      } else {
        callback(null, response, repo);
      }
    });
  },

  getTop25: (callback) => {
    db.find(db.Repo, null, null, {sort: {
      forks: -1
    }, limit: 25}, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  }
}