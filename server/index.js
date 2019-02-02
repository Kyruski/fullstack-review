const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const github = require('../helpers/github.js');
const model = require('./model.js');

const requestGithub = (user, callback) => {
  github.getReposByUsername(user, (err, data) => {
    console.log('this is data', data);
    if (err) {
      res.send('error getting repos ' + err);
    } else {
      const insertCallback = (err, response, repoArray) => {
        let newData = repoArray.slice(1);
        if (err) {
          callback(err);
        } else if (newData.length > 0) {
          model.insertRepo(newData, (err, resp) => {insertCallback(err, resp, newData)});
        } else {
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
});

app.get('/repos', (req, res) => {
  model.getTop25((err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

app.get('/repos', function (req, res) {

  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

