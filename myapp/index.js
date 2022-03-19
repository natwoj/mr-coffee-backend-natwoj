const express = require("express");
const bodyParser = require("body-parser");
const myData = require("./data");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); 
const functionsJs = require("./functions")

// using static folder - css, images
app.use('/static', express.static('static'))

// pass encryption library import 
const sha256 = require('js-sha256');

// 3B - mustache require - 1/2
const mustacheExpress = require('mustache-express');

// 3B - configuring app // mustache 2/2
  app.set('views', `${__dirname}/views`);
  app.set('view engine', 'mustache');
  app.engine('mustache', mustacheExpress());

// index.mustache rendering
app.get('/', (req, res) => {
  res.render('index', { title: "Schedule website for Mr. Coffee employees"})
})

app.get("/users", (req, res) => {
  res.render('users', { title: "All users", users: functionsJs.addId(myData.users) }) 
})

app.get("/schedules", (req, res) => {
  res.render('schedules', { title: "Schedules", schedules: myData.schedules })
});

// 3a krok 3 - parameterized paths
app.get("/users/:id", (req, res) => {
  const idNumber = req.params.id;
  if (idNumber >= myData.users.length){
    res.json("No such a user");
    return;
  }
  res.json(myData.users[idNumber]);
});

app.get("/users/:id/schedules", (req, res) => {
  const idNumber = req.params.id;
  if (idNumber >= myData.users.length){
    res.json("No such a user");
    return;
  }
  const arr=[];
  for ( let i = 0; i < myData.schedules.length; i ++){
    if (idNumber==myData.schedules[i].user_id){
      arr.push(myData.schedules[i]);
    }
  }
  if (arr.length<1) {
    res.json("Sign up for term");
    return;
  }
  res.json(arr);
});

// 3a krok 4 - paths to update data: users & schedules 
app.post('/users', (req, res) => {
    const newUser = req.body;
    const b = {
      "firstname": newUser.firstname,
      "lastname": newUser.lastname,
      "email": newUser.email,
      "password": sha256(newUser.password)
    }
    //newUser.password = sha256(newUser.password);
    myData.users.push(b);
    res.json(b);
  })

  app.post('/schedules', (req, res) => {
    const newSchedule = req.body;
    const b = {
      "user_id": newSchedule.user_id,
      "day": newSchedule.day,
      "start_at": newSchedule.start_at,
      "end_at": newSchedule.end_at
    }
    myData.schedules.push(b);
    res.json(b);
  })


  // listen to port 3000
app.listen(3000, () => {
  console.log(`http://localhost:3000/ is waiting for requests.`);
});