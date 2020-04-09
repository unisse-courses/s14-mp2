const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');
const mongoose = require('./models/connection');

// Routes imports
const indexRouter = require('./routes/index');
const postRouter = require('./routes/postRoute');

const app = express();
const port = 3000;
const hostname = 'localhost';

const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);

// Sessions
app.use(session({
  secret: 'somegibberishsecret',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 }
}));

// Flash
app.use(flash());

// Global messages vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

app.listen(port, function() { 
  console.log(`Server running at http://${hostname}:${port}/`); 
});

app.engine('hbs', exphbs({
  extname: 'hbs', 
  defaultView: 'main',
  layoutsDir: path.join(__dirname, '/views/layouts'), 
  partialsDir: path.join(__dirname, '/views/partials'),
}));

app.set('view engine', 'hbs');

// Configuration for handling API endpoint data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/', indexRouter); // Routes