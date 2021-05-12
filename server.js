// import dependencies
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const path = require('path');
const User = require('./models/User');

const db = config.get('mongoURI');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// import handlers
const homeHandler = require('./controllers/home.js');
const roomHandler = require('./controllers/room.js');

// If you choose not to use handlebars as template engine, you can safely delete the following part and use your own way to render content
// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// set up stylesheets route

// TODO: Add server side code
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

const newUser = new User ({
    name: 'UCR Student 2',
});
newUser
  .save()
  .then(item => console.log(item))
  .catch(err => console.log(err));

// Create controller handlers to handle requests at each endpoint
app.get('/', function (req, res) {
    User.find()
    .sort({ date: -1 })
    .then(items => {    res.render('home', {
        post: {
            author: items[0].name,
            image: 'https://picsum.photos/500/500',
            comments: []
        }
    });});

});

app.get('/', function (req, res) {
    res.render('home', {
        post: {
            author: 'Janith Kasun',
            image: 'https://picsum.photos/500/500',
            comments: []
        }
    });
});

app.get('/:roomName', roomHandler.getRoom);

// NOTE: This is the sample server.js code we provided, feel free to change the structures

app.listen(3000, () => console.log(`Server listening on http://localhost:${port}`));