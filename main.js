const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');
const mongoose = require('./models/connection');

// Routes imports
console.log("main");
console.log("Before indexrouter");
const indexRouter = require('./routes/index');
console.log("after indexrouter ");
const postRouter = require('./routes/postRoute');

const app = express();
const port = 3000;
const hostname = 'localhost';

const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);

console.log("sessions");
// Sessions
app.use(session({
  secret: 'somegibberishsecret',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 }
}));

// Flash
console.log("flash");
app.use(flash());

// Global messages vars
console.log("global messages");
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

console.log("listen ports");
app.listen(port, function() { 
  console.log(`Server running at http://${hostname}:${port}/`); 
});


console.log("engines");
app.engine('hbs', exphbs({
  extname: 'hbs', 
  defaultView: 'main',
  layoutsDir: path.join(__dirname, '/views/layouts'), 
  partialsDir: path.join(__dirname, '/views/partials'),
}));

app.set('view engine', 'hbs');

// Configuration for handling API endpoint data
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
console.log("public");
app.use(express.static('public'));
console.log("routes");
app.use('/', indexRouter); // Routes