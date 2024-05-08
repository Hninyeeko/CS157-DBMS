
const fs = require('fs').promises;
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const mysqlReal = require('mysql2');
const session = require('express-session');
var storedUser = null;




const app = express();

app.use(cors());
app.use(express.json());


const con = mysqlReal.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cartier',
    port: 3307
});

app.use(session({
    secret: 'cartier',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // set to true if your using https
  }));


app.post('/createNewList', (req, res) =>{
    const listName = req.body.listName;
    const shopID = req.body.shopID;
    console.log('new list function started');
    con.query('INSERT INTO List (ListName, ShopID) VALUES (?,?)', [listName,shopID], (err, result) =>{
        if(result){
            res.send(result);
            console.log('result was sent from API to backend')
        }
        else{
            res.send({message: err});
        }
    });
});

app.post('/addItem', (req, res) =>{
    const itemName = req.body.itemName;
    const quantity = req.body.quantity;
    const purchased = req.body.purchased;
    console.log('add item function started');
    con.query('INSERT INTO Item (ItemName, Quantity, Purchased) VALUES (?,?,?)', [itemName,quantity, purchased], (err, result) =>{
        if(result){
            res.send(result);
        }
        else{
            res.send({message: err});
        }
    });
});

app.post('/addReview', (req, res) =>{
    const userID = storedUser.UserID;
    console.log(storedUser);
    console.log('this is UserId:', userID);
    const { comment, rating, selectedShop, date} = req.body; // Destructure data from request body

    console.log('add review function started');
    con.query('INSERT INTO Review (UserID, Comment, Rating, ShopID, Date) VALUES (?,?,?,?,?)', [userID, comment, rating, selectedShop, date], (err, result) =>{
        if(err){
            console.error('Error inserting review:', err);
            res.status(500).json({ message: 'Failed to add review' }); // Send error response
        }
        else{
            console.log('Review added successfully');
            res.status(200).json({ message: 'Review added successfully' }); // Send success response
        }
    });
});


app.post('/register', (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    con.query('INSERT INTO User (Email, Username, Password) VALUES (?, ?, ?)', [email, username, password], (err, result) => {
        if(result) {
            res.send(result);
        }
        else{
            res.send({message: err});
        }
    });
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    con.query('SELECT * FROM User where Username =? and Password =?', [username, password], (err, result) => {
        if (err) {
            res.send({ err: err });
        } else {
            if (result.length > 0) {
                const user = result[0];
                
                console.log(user);

                res.send(user);
                // You can send this data to multiple pages by storing it in a session or a cookie.
                // Here's an example of using sessions to store the user data:

                req.session.user = user; // Store the user data in the session

                // Now you can access the user data on other pages by retrieving it from the session:
                storedUser = req.session.user;

                // You can also check if the user is logged in by checking if the session contains the user data:
                if (req.session.user) {
                    // User is logged in
                    console.log('User is logged in');
                } else {
                    // User is not logged ic
                    console.log('User is not logged in');
                }
            } else {
                res.send({ message: 'Wrong username/password combination!' });
            }

        }
    });
});

app.get('/some-page', (req, res) => {
    if (storedUser) {
      // User is logged in
        const user = storedUser;
      res.send(user);
      console.log('User is logged in');
    } else {
      // User is not logged in
      res.send({ message: 'You are not logged in' });
      console.log('User is not logged in');
    }
  });


app.get('/logout', (req, res) => {
    req.session.destroy();
    storedUser = null;
    res.send({ message: 'User logged out' });
  });

app.listen(3002, () => {
    console.log('Server is running on port 3002');
});

// this is still a work in progress
async function executeSqlFile(filePath) {
    // Create a connection to the database
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        port: 3307,
    });
  
    try {
        // Read the SQL file
        const sql = await fs.readFile(filePath, 'utf-8');
  
        // Split the SQL string into individual commands
        const commands = sql.split(';');
  
        // Execute each command
        for (const command of commands) {
            if (command.trim() === '') continue; // Skip empty commands
            await connection.query(command);
        }
  
        console.log('SQL file executed successfully.');
    } catch (error) {
        console.error(`Error executing SQL file: `, error);
    } finally {
        // Close database connection
        await connection.end();
    }
  }
  
  app.get('/api/execute-sql', async (req, res) => {
    try {
      await executeSqlFile('.\\src\\dbsetup.sql');
      res.json({ message: 'SQL file executed successfully' });
    } catch (error) {
      console.error('Failed to execute SQL file:', error);
      res.status(500).json({ error: 'An error occurred while executing the SQL file' });
    }
  });

  app.get('/getShopList', async (req, res) => {
    con.query('SELECT ShopName, ShopID FROM Shop', (err, result) => {
        if (err) {
            res.send({ err: err });
        } else {
            if (result.length > 0) {
                const shopList = result;
                console.log("Shop data from backend:", shopList);
                res.send(shopList);
            }

        }
    });
});


