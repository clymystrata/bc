const path = require('path');
const parser = require('body-parser');
const express = require('express');
const app = express();
const mysql = require('mysql');

function getPollResults(req, res) {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'bootcamp',
    password: 'Passw0rd',
    database: 'rsm'
  });
    
  connection.connect();
  connection.query(`select p.question, pr.value from poll_results pr 
                      inner join poll p on pr.poll_id = p.id
                    where pr.poll_id = ${req.params.q} order by pr.submitted desc`,(err, rows, cols) => {
    if(!err) {
      res.send({
        question: rows[0].question,
        results: rows.map((v) => { return v.value; })
      });
    } else {
      console.log(err);
    }
    connection.end();
  });
}

// Add headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://server.rsm:8032');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', false);
    next();
});

app.use(express.static(path.join(__dirname, '/../public')));
app.use(parser.urlencoded({extended: true}));
app.use(parser.json())

app.get('/', (req, res) => {
  res.sendFile('index.html',{root: `${__dirname}/../public/`});
});

app.get('/survey/:q', (req, res) => {
  getPollResults(req,res);

});

module.exports = app;
