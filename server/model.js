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

  getTop25: (body, callback) => {
    let params = {sort: {}, limit: 25};
    params.sort[body] = -1;
    console.log(params);
    db.find(db.Repo, null, null, params, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  }
}