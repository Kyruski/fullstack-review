const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const github = require('../helpers/github.js');
const model = require('./model.js');

// const checkUserInDB = (user, callback) => {
//   model.checkUser(user, (err, data) => {
//     if (err) {
//       console.log('err checking user in db in server', err);
//       callback(err);
//     } else {

//     }
//   })
// };

const requestGithub = (user, callback) => {
  github.getReposByUsername(user, (err, data) => {
    if (err) {
      res.send('error getting repos ' + err);
    } else {
      console.log('success getting data');
      const insertCallback = (err, response, repoArray) => {
        let newData = repoArray.slice(1);
        if (err) {
          callback(err);
        } else if (newData.length > 0) {
          model.insertRepo(newData, (err, resp) => {insertCallback(err, resp, newData)});
        } else {
          console.log('insertion successful');
          callback(null, response);
        }
      };
      model.insertRepo(data, (err, response) => {
        insertCallback(err, response, data);
      });
    }
    
  });
};

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  const username = req.body.username;
  requestGithub(username, (err, response) => {
    if (err) {
      callback(err);
    } else {
      res.send('Success');
    }
  });



  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {

  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

