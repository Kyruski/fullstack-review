const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.createConnection('mongodb://localhost/fetcher', {
  useMongoClient: true
});

let repoSchema = mongoose.Schema(
  {
    _id: Number,
    repo: String,
    author: String,
    author_avatar: String,
    link: String,
    stars: Number,
    forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (model, id, callback) => {
  Repo.findOneAndUpdate(
    {_id: id},
    model,
    {upsert: true, new: true, runValidators: true}, 
    (err, response) => {
      if (err) {
        console.log('err saving Repo', err);
        callback(err);
      } else {
        callback(null, response);
      }
    }
  );
}

let find = (model, conditions, fieldsToReturn, options, callback) => {
  model.find(conditions, fieldsToReturn, options, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

module.exports = {db: db,
  save: save, 
  find: find, 
  Repo: Repo }