const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const github = require('../helpers/github.js');
const model = require('./model.js');
require('dotenv').config();

const requestGithub = (user, res, callback) => {
  github.getReposByUsername(user, (err, data) => {
    if (err) {
      res.send(err);
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
  requestGithub(username, res, (err, response) => {
    if (err) {
      callback(err);
    } else {
      res.send('The user\'s repos have been successfully added');
    }
  });
});

app.get('/repos', (req, res) => {
  let body = req.query.payload;
  console.log('body', body);
  model.getTop25(body, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

