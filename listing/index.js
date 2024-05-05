const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const session = require('express-session');

const app = express();

app.use(cors());
app.use(express.json());


app.use(session({
  secret: 'cartier',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Note: secure should be set to true when in a production environment and the site is served over HTTPS
}));

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cartier',
    port: 3307
});

app.post('/register', (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    con.query('INSERT INTO users (email, username, password) VALUES (?, ?, ?)', [email, username, password], (err, result) => {
        if(result) {
            res.send(result);
        }
        else{
            res.send({message: err});
        }

})});


app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    con.query('SELECT * FROM users where username =? and password =?', [username, password], (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        if (result.length > 0) {
          const user = result[0];
          // Store the user's data in the session
          req.session.user = user;
          req.session.save();
          // Redirect to /some-route
          res.send(user);
        } else {
          res.send({ message: 'Wrong username/password combination!' });
        }
      }
    });
  });

  app.get('/some-route', (req, res) => {
    const user = req.session.user;
    if (user) {
      // Do something with the user's data..
      console.log(user);
      res.send(user);
    } else {
      console.log('No user in session!');
      res.send({ message: 'No user in session!' });
    }
    // Do something with the user's data...
  });



app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
