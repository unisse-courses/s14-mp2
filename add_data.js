const userModel = require('./models/user');
const postModel = require('./models/post');
const bcrypt = require('bcrypt');  

// Users
var userArray = [
  {
    email: 'Jacob_salazar@dlsu.edu.ph',
    username: 'Jacob_salazar',
    password: 'dlsu1234'
  },
  {
    email: 'jazzmine_ilagan@yahoo.com',
    username: 'jazzmine07',
    password: 'animeislife'
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
];

// Posts
var postArray = [
	{
    // 
	  img: "img/taal_volcano.jpg",
	  header: "Eruption of Taal 2020",
	  caption: "On 12th of January 2020 (Sunday), the taal volcano started spewing ash. The Philippine Institute of Volcanology and Seismology (Phivolcs) raised the alert status to level 2. That same day, the alert level was raised to level 4,  where there was frequent volcanic lightning activity. By nightfall, the ashfall already reached certain areas such as Calabarzon and Metro Manila. We are in need of donations for those who are affected, no matter how small, will be deeply appreciated.",
    tags: "#taaleruption #taalvolcano #naturalcalamity #volcano #philippines",
    //tags: ["#taaleruption", "#taalvolcano", "#naturalcalamity", "#volcano", "#philippines"],
  }, 
  {
	  img: "img/virus.jpg",
	  header: "COVID-2019", 
	  caption: "As the number of confirmed cases continue to rise, the threat of the coronavirus continues to spread worldwide. China, leading with a total of 79,257 confirmed cases and 2,835 deaths. Several countries banned travel flights to China and now South Korea.  We are asking in kind donations to help the citizens of China and South Korea.",
    tags: "#ncov19 #covid19 #coronavirus #wuhanvirus",
    //tags: ["#ncov19", "#covid19", "#coronavirus", "#wuhanvirus"],
  }, 
  {
	  img:  "img/bushfire.jpg",
	  header: "Australia Bushfire 2019-2020",
	  caption: "Starting November 2019, fires started to erupt in New South Wales. The fire rapidly spread across all states and killed three volunteer firefighters. Thousands of people were forced to evacuate as the fire danger zone spreads. At the beginning of the new decade, the fire continued to spread, raising the death toll to 23. As of February 13, the situation was said to be “contained”. We are appealing to your kind heart by raising funds to recover for the affected families.", 
    tags: "#australiabushfire #bushfire #fire #SaveAustralia",
    //tags: ["#australiabushfire", "#bushfire", "#fire", "#SaveAustralia"],
  }, 
  {
	  img: "img/elderly.jpg",
	  header:  "Home for the Aged",
	  caption: "According to the World Food Programme (WFP), because of the years of drought, widespread flooding and economic disarray, 45 million people are facing severe food shortages, with women and children bearing the brunt of the crisis. Half of the population of Zimbabwe or 7.7 million people are facing its worst hunger emergency in a decade. Let us help the people who are starving, let us share our blessings to them. Donate now.",
    tags: "#famine #Africa #HelpAfrica",
    //tags: ["#famine", "#Africa", "#HelpAfrica"],
  }, 
  {
	  img: "img/panda.jpg",
	  header: "Save Pandas",
	  caption: "Pandas are bear-like creatures, distinguishable by their black and white color pattern. In 2016, the International Union for Conservation of Nature declassified pandas from “endangered” to “vulnerable”. There are about 1,864 pandas living in the wild, but still at risk because of habitat loss. A large proportion of the panda's habitat has already been lost  to meet the needs of the area's booming pulation. Donate now to help conserve pandas and their habitat",
    tags: "#panda #SavePandas #SaveAnimals",
    //tags: ["#panda", "#SavePandas", "#SaveAnimals"],
  }, 
  {
	  img: "img/famine.jpg",
	  header: "Famine in Africa",
	  caption: "According to the World Food Programme (WFP), because of the years of drought, widespread flooding and economic disarray, 45 million people are facing severe food shortages, with women and children bearing the brunt of the crisis. Half of the population of Zimbabwe or 7.7 million people are facing its worst hunger emergency in a decade. Let us help the people who are starving, let us share our blessings to them. Donate now.",
    tags: "#famine #Africa #HelpAfrica",
    //tags: ["#famine", "#Africa", "#HelpAfrica"], 
  },
  {
	  img: "img/forest_fire_benguet.jpg",
	  header: "Benguet Forest Fire 2020",
	  caption: "The fire started February 11 in Barangay Adaoa and was controlled on February 15. Another forest fire blazed on February 19, in Sitio Nalseb, Barangay Ambassador, in Tublay, Benguet. A total of 165,620 trees and seedlings were damaged by the fire and left millions in damage. We are in need of donations for the affected families.",
    tags: "#BenguetForestFire #ForestFire #fire #NaturalCalamity",
    //tags: ["#BenguetForestFire", "#ForestFire", "#fire", "#NaturalCalamity"],
  },
  {
	  img: "img/polar_bear.jpg",
	  header: "Save Polar Bears",
	  caption: "Polar bears are mammals that live on the sea ice of the Arctic Ocean. They have a thick layer of body fat and a water-repellent coat that insulates them from the cold air and water. Polar bears are classified as “vulnerable” species because of habitat loss caused by climate change. sea ice for their existence, and so we ask for your kindness, to help us preserve the polar bears. Any amount of donations will do.",
    tags: "#PolarBears #SavePolarBears #SaveAnimals",
    //tags: ["#PolarBears", "#SavePolarBears", "#SaveAnimals"],
  },
  {
	  img: "img/orphans.jpg",
	  header: "Help the Orphans",
	  caption: "The Philippines has made significant economic progress in their globalization efforts. In terms of population growth, around 40% are living below the poverty level and 12% without any employment at all. Of the roughly 34 million children under the age of eighteen, more than 2 million are orphans. The children truly need our help, without parental support, who would help them but us?",
    tags: "#orphans #orphanage #ChildSupport",
    //tags: ["#orphans", "#orphanage", "#ChildSupport"],
  }
];

populate2();
populate3();
populate4();

function populate2(){
  const saltRounds = 10;
  const user = {
    email: userArray[0].email,
    username: userArray[0].username,
    password: userArray[0].password
  };

  bcrypt.hash(userArray[0].password, saltRounds, (err, hashed) => {
    user.password = hashed;
    userModel.create(user, function (err, result) {
      if (err) throw err;
      for(i=0;i<3;i++){
        const post = {
          img: postArray[i].img,
          header: postArray[i].header,
          caption: postArray[i].caption,
          tags: postArray[i].tags,
          owner: result._id
        };
      
        postModel.createPost(post, function(err, postResult) {
          if (err) throw err;
        }) 
      }
    }); // end here 
  });
}

function populate3(){
  const saltRounds = 10;
  const user = {
    email: userArray[1].email,
    username: userArray[1].username,
    password: userArray[1].password
  };

  bcrypt.hash(userArray[1].password, saltRounds, (err, hashed) => {
    user.password = hashed;
    userModel.create(user, function (err, result) {
      if (err) throw err;
      for(i=3;i<6;i++){
        const post = {
          img: postArray[i].img,
          header: postArray[i].header,
          caption: postArray[i].caption,
          tags: postArray[i].tags,
          owner: result._id
        };
    
        postModel.createPost(post, function(err, postResult) {
          if (err) throw err;
        }) 
      }
    }); // end here 
  });
}

function populate4(){
  const saltRounds = 10;
  const user = {
    email: userArray[2].email,
    username: userArray[2].username,
    password: userArray[2].password
  };

  bcrypt.hash(userArray[2].password, saltRounds, (err, hashed) => {
    user.password = hashed;
    userModel.create(user, function (err, result) {
      if (err) throw err;
      for(i=6;i<9;i++) {
        const post = {
          img: postArray[i].img,
          header: postArray[i].header,
          caption: postArray[i].caption,
          tags: postArray[i].tags,
          owner: result._id
        };
    
        postModel.createPost(post, function(err, postResult) {
          if (err) throw err;
        }) 
      }
    }); // end here 
  });
}

/*
for (j = 0 ; j < postArray.length; j++){
        var owner_id = result._id;
    
        const post = {
          img: postArray[j].img,
          header: postArray[j].header,
          caption: postArray[j].caption,
          tags: postArray[j].tags,
          owner: owner_id
        };

        postModel.createPost(post, function(err, postResult) {
          if (err) throw err;
        })
        
      } 
*/