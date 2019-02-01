const db = require('../database/index.js');

module.exports = {
  // checkUser: (user, callback) => {
  //   db.db.on('error', (err) => {
  //     console.log('error at db', err);
  //     callback(err);
  //   });
  //   db.db.once('open', () => {
  //     db.find(db.User, {name: user}, null, null, callback);
  //   })
  // }
  insertRepo: (repo, callback) =>{
    const item = db.Repo(repo[0]);
    db.save(item, repo[0]._id, (err, response) => {
      if (err) {
        callback(err);
      } else {
        console.log('we got a response');
        callback(null, response, repo);
      }
    });
  
  }


}