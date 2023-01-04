const createError = require('http-errors');
const express = require('express');
const path = require('path');
const db  = require('./dbConnection');
const bodyParser = require('body-parser');
const cors = require('cors');
const indexRouter = require('./router.js');
 
const app = express();
 
app.use(express.json());
 
app.use(bodyParser.json());
 
app.use(bodyParser.urlencoded({
    extended: true
}));
 
app.use(cors());
 
app.use('/api', indexRouter);
 

app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});
// display all users 
app.get('/users', function (req, res) {
    db.query('SELECT * FROM users', function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'users list.' });
    });
    });
    // dispkay userwith id
    app.get('/user/:id', function (req, res) {
    let user_id = req.params.id;
    if (!user_id) {
    return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    db.query('SELECT * FROM users where id=?', user_id, function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results[0], message: 'users list.' });
    });
    });


    // Add user
    app.post('/user', function (req, res) {
    let user = req.body.user;
    if (!user) {
    return res.status(400).send({ error:true, message: 'Please provide user' });
    }
    db.query("INSERT INTO users SET ? ", { user: user }, function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
    });
    });


    //  Update
    app.put('/user', function (req, res) {
    let user_id = req.body.user_id;
    let user = req.body.user;
    if (!user_id || !user) {
    return res.status(400).send({ error: user, message: 'Please provide user and user_id' });
    }
    db.query("UPDATE users SET user = ? WHERE id = ?", [user, user_id], function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
    });
    });
    //  Delete
    app.delete('/user', function (req, res) {
    let user_id = req.body.user_id;
    if (!user_id) {
    return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    db.query('DELETE FROM users WHERE id = ?', [user_id], function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'User has been updated successfully.' });
    });
    }); 


app.listen(3000,() => console.log('Server is running on port 3000'));