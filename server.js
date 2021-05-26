// import dependencies
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const path = require('path');
const Room = require('./models/Rooms');
const Chat = require('./models/Chat');
//const Messages = require('./js/messages');
//const prompt = require('prompt-sync')();


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

// Create controller handlers to handle requests at each endpoint
app.get('/getRoom', function(req, res){
  Room.find().lean().then(items => {
    res.json(items)
  })
})
app.get('/getChat', function(req, res){
  Chat.find().lean().then(items => {
    res.json(items)
  })
})
app.post('/create', function(req, res){
  const newRoom = new Room({
    name: req.body.roomName
  });
  newRoom.save().then(console.log('Room added'))
  .catch(err => console.log(err));
  res.redirect(302, '/');
})
app.post('/comment', function(req, res){
  console.log(req.body.userName);
  if(req.body.userName === undefined || req.body.userName.trim() === ""){
    req.body.userName = 'default';
    console.log('Yo');
  }
  const newComment = new Chat({
    room: req.body.rName,
    username: req.body.userName,
    dateOfEntry: Date.now(),
    message: req.body.message
  })
  newComment.save().then(console.log('Comment added'))
  .catch(err => console.log(err));
  res.redirect(302, '/'+req.body.rName);
})
app.get('/', homeHandler.getHome);
app.get('/:roomName', roomHandler.getChat);
app.get('/:roomName/messages', roomHandler.getChat);


// NOTE: This is the sample server.js code we provided, feel free to change the structures

app.listen(3000, () => console.log(`Server listening on http://localhost:${port}`));