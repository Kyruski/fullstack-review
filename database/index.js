const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.createConnection('mongodb://localhost/fetcher', {
  useMongoClient: true
});

// let userSchema = mongoose.Schema({
//   name: String
// })

// let User = mongoose.model('User', userSchema);

let repoSchema = mongoose.Schema(
  { //need new?
    _id: Number,
    repo: String,
    author: String,
    author_avatar: String,
    link: String,
    stars: Number,
    forks: Number
});

let Repo = mongoose.model('Repo', repoSchema); //need new?

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
        console.log('successfully saved repo');
        callback(null, response);
      }
    }
  );
}

let find = (model, conditions, fieldsToReturn, options, callback) => {
  model.find(conditions, fieldsToReturn, options, callback);
}

module.exports = {db: db,
  save: save, 
  find: find, 
  // User: User, 
  Repo: Repo }


  /*News.find({
    deal_id:deal._id // Search Filters
},
['type','date_added'], // Columns to Return NEEDS TO BE OBJ OR STRING, can do 'field1 field2' or
{
    skip:0, // Starting Row
    limit:10, // Ending Row
    sort:{
        date_added: -1 //Sort by Date Added DESC
    }
},
callback)*/