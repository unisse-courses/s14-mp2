const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const hostname = 'localhost';

// additional connection options
const options = { useUnifiedTopology: true };

// Creating Collection [Featured]
const userModel = require('./models/user');
const postModel = require('./models/post');


var userArray = [
  {
    email: 'Jacob_salazar@dlsu.edu.ph',
    username: 'Jacob_salazar',
    password: 'dlsu1234'
  },
  {
    email: 'jazzmine_ilagan@yahoo.com',
    username: 'jazzmine07',
    password: 'dlsu1234'
  },
  {
    email: 'Enrico_Cuison@gmail.com',
    username: 'Enrico_cuison',
    password:  'dlsu1234'
  },
  {
    email: 'admin@dlsu.edu.ph',
    username: 'admin',
    password: 'admin'
  }
]


var postArray = [
	{
	  img: 'img/taal_volcano.jpg',
	  header: 'Eruption of Taal 2020',
	  caption: 'On 12th of January 2020 (Sunday), the taal volcano started spewing ash. The Philippine Institute of Volcanology and Seismology (Phivolcs) raised the alert status to level 2. That same day, the alert level was raised to level 4,  where there was frequent volcanic lightning activity. By nightfall, the ashfall already reached certain areas such as Calabarzon and Metro Manila. We are in need of donations for those who are affected, no matter how small, will be deeply appreciated.',
	  tags: '#taaleruption #taalvolcano #naturalcalamity #volcano #philippines'
  }, 
  {
	  img: "img/virus.jpg",
	  header: "COVID-2019", 
	  caption: "As the number of confirmed cases continue to rise, the threat of the coronavirus continues to spread worldwide. China, leading with a total of 79,257 confirmed cases and 2,835 deaths. Several countries banned travel flights to China and now South Korea.  We are asking in kind donations to help the citizens of China and South Korea.",
	  tags:  "#ncov19 #covid19 #coronavirus #wuhanvirus"
  }, 
  {
	  img:  "img/bushfire.jpg",
	  header: "Australia Bushfire 2019-2020",
	  caption: "Starting November 2019, fires started to erupt in New South Wales. The fire rapidly spread across all states and killed three volunteer firefighters. Thousands of people were forced to evacuate as the fire danger zone spreads. At the beginning of the new decade, the fire continued to spread, raising the death toll to 23. As of February 13, the situation was said to be “contained”. We are appealing to your kind heart by raising funds to recover for the affected families.", 
	  tags: "#australiabushfire #bushfire #fire #SaveAustralia"
  }, 
  {
	  img: "img/famine.jpg",
	  header:  "Home for the Aged",
	  caption: "According to the World Food Programme (WFP), because of the years of drought, widespread flooding and economic disarray, 45 million people are facing severe food shortages, with women and children bearing the brunt of the crisis. Half of the population of Zimbabwe or 7.7 million people are facing its worst hunger emergency in a decade. Let us help the people who are starving, let us share our blessings to them. Donate now.",
	  tags: "#famine #Africa #HelpAfrica"
  }, 
  {
	  img: "img/panda.jpg",
	  header: "Save Pandas",
	  caption: "Pandas are bear-like creatures, distinguishable by their black and white color pattern. In 2016, the International Union for Conservation of Nature declassified pandas from “endangered” to “vulnerable”. There are about 1,864 pandas living in the wild, but still at risk because of habitat loss. A large proportion of the panda's habitat has already been lost  to meet the needs of the area's booming pulation. Donate now to help conserve pandas and their habitat",
	  tags: "#panda #SavePandas #SaveAnimals"
  }, 
  {
	  img: "img/famine.jpg",
	  header: "Famine in Africa",
	  caption: "According to the World Food Programme (WFP), because of the years of drought, widespread flooding and economic disarray, 45 million people are facing severe food shortages, with women and children bearing the brunt of the crisis. Half of the population of Zimbabwe or 7.7 million people are facing its worst hunger emergency in a decade. Let us help the people who are starving, let us share our blessings to them. Donate now.",
	  tags: "#famine #Africa #HelpAfrica", 
  }
];

// Insert postArray to DB

  userModel.collection.insertMany(userArray, function(err, res){
    if(err) throw err;
    console.log("Insert Users Successful!");

  for (i =0 ;i<postArray.length;i++){
// assigns different post for different users... posts are distributed to the predefined users
    if(i<3)
    var owner_id = res.insertedIds[0];
    else if (i>=3 && i<5)
    var owner_id = res.insertedIds[1];
    else
    var owner_id = res.insertedIds[2];
    
    const post = new postModel({
      img: postArray[i].img,
      header: postArray[i].header,
      caption: postArray[i].caption,
      tags: postArray[i].tags,
      owner: owner_id
    });
    post.save(function (err, result) {
      if (err) throw err;
      console.log(result);
    });      
  }
});


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

// Home
app.get('/', function(req, res) {
  
    postModel.collection.find({}).toArray(function(err, result) {
      if(err) throw err;
      console.log("Read Successful!");

      res.render('home', {
        item: result,
      });
    });
});

// View All Post
app.get('/feed', function(req, res) { 
 
    postModel.collection.find({}).toArray(function(err, result) {
      if(err) throw err;
      console.log("Read Successful!");

      res.render('feed', {
        item: result,
      });
    });
  });



app.get('/PostList', function(req, res) {
    res.status(200).send(postArray);
});

// Login
app.get('/login', function(req, res) {
  res.render('login');
});



app.post('/addUser', function(req, res) {

  
  var user = new userModel({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err, user) {
    var result;

    if (err) {
      console.log(err.errors);

      result = { success: false, message: "User was not created!" }
      res.send(result);
    } else {
      console.log("Successfully added a new USER!");
      console.log(user); 
     
      result = { success: true, message: "User created!" }

      res.send(result);
    }
 
  });

});













// Profile Page (Logged in)
app.get('/myprofile', function(req, res) {
  res.render('myprofile');
});

// Profile Page (Logged in)
app.get('/donate', function(req, res) {
  res.render('donate');
});

app.use(express.static('public'));

app.listen(port, function() { 
    console.log(`Server running at http://${hostname}:${port}/`); 
});