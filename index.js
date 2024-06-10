// ************************** Imports ************************* //
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
const PORT = 3000;

// ************************** Database url & connection ************************* //
const DB_URI = "mongodb://localhost:27017/node_crud_app";

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.log('Connection error:', error));
db.once('open', () => console.log('Connected to the database'));

// ************************** Middlewares ************************* //
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: 'my secret key',
    saveUninitialized: true,
    resave: false,
}));

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

// ************************** Set Template Engine ************************* //
app.set("view engine", "ejs");

// ************************** Root url  ************************* //
app.get('/', (req, res) => {
    res.status(200).send("Welcome to root URL of Server");
});

app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Server is Successfully Running, and App is listening on port ${PORT}`);
    } else {
        console.log("Error occurred, server can't start", error);
    }
});
