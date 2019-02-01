const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.one



let repoSchema = mongoose.Schema({ //need new?
  author: String,
  author_avatar: String,
  link: String,
  stars: Number,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema); //need new?

let save = (repo) => {
  repo.save( (err, response) => {
    if (err) return console.log('err saving Repo', err);
    console.log('successfully made: ', repo);
  });
}

module.exports.save = save;