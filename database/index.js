const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.one

let userSchema = mongoose.Schema({
  name: String
})

let User = mongoose.model('User', userSchema);

let repoSchema = mongoose.Schema({ //need new?
  author: String,
  author_avatar: String,
  link: String,
  stars: Number,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema); //need new?

let save = (model) => {
  model.save(params, (err, response) => {
    if (err) return console.log('err saving Model', err);
    console.log('successfully saved model: ', response);
  });
}

let find = (model, params, callback) => {
  model.find(params, callback);
}

module.exports = {save: save, 
  find: find, 
  User: User, 
  Repo: Repo }
