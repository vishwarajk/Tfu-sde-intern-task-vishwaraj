const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const redis = require('redis');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

// ... (add routes here)

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});




// ... (previous code)

app.post('/submit', (req, res) => {
  const { username, language, stdin, source_code } = req.body;

  db.query(
    'INSERT INTO snippets (username, language, stdin, source_code) VALUES (?, ?, ?, ?)',
    [username, language, stdin, source_code],
    (error, results) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(201).send(results);
      }
    }
  );
});

app.get('/snippets', (req, res) => {
  redisClient.get('snippets', (error, result) => {
    if (result) {
      res.send(JSON.parse(result));
    } else {
      db.query('SELECT * FROM snippets', (error, results) => {
        if (error) {
          res.status(500).send(error);
        } else {
          redisClient.set('snippets', JSON.stringify(results));
          res.send(results);
        }
      });
    }
  });
});

// ... (remaining code)
