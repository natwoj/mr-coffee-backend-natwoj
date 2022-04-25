const express = require("express");
const bodyParser = require("body-parser");
const myData = require("./data");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); 
const appFunctions = require('./functions');

const typeWriter = require('typewriter-effect/dist/core');

// dotenv for loading environmental variables
const envVariables = require('dotenv').config()

// using static folder - css, images
app.use('/static', express.static('public'))

// pass encryption library import 
const sha256 = require('js-sha256');

// 3B - mustache require - 1/2
const mustacheExpress = require('mustache-express');

// 3B - configuring app // mustache 2/2
  app.set('views', `${__dirname}/views`);
  app.set('view engine', 'mustache');
  app.engine('mustache', mustacheExpress());

  const { Pool } = require("pg");
const { request } = require("express");
  const pool = new Pool({

    user: process.env.USER_ID,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: 5435,
  })

// GET's - new user, new schedule form

app.get("/schedules/new", (req, res) => {
  res.render("new_schedule_form", { title: "Add new schedule"});
});

app.get("/users/new", (req, res) => {
  res.render("new_user_form", { title: "Submit"});
});

app.get("/", (req, res) => {
  const newTypewriter = new Typewriter('typewriter', {
    strings: ['Welcome to', 'Schedules App', 'for', 'Mr. Coffee employees'],
    autoStart: true,
  });
  res.render('index', { title: newTypewriter})
})
app.get("/users", (req, res, next) => {
    const usersNumber = [...myData.users];                  
      for (let i = 0; i < usersNumber.length; i++) {
          usersNumber[i].id = i;
    }
    res.render("users", { title: "All users",  users: usersNumber })
  })
app.get("/schedules", async (req, res, next) => {
  let schedule = await pool.query("SELECT * FROM schedules");

  res.render('schedules', { title: "All schedules", schedules: schedule.rows });
});

app.get("/users/:id", (req, res, next) => {
  const idNumber = req.params.id;
  idNumber >= myData.users.length ? res.render('user_details', {'title':'No such user'}) : res.render('user_details', {'title': `User ${idNumber}`, 'users': myData.users[idNumber]});
})

app.get("/users/:id/schedules", (req, res, next) => {
  const idNumber = req.params.id;
  if (idNumber >= myData.users.length){
    res.render("user_schedules", {"title": "No such user"});
    return;
  }
  const arr = [];
  for (let i = 0; i < myData.schedules.length; i ++){
    if (idNumber == myData.schedules[i].user_id){
      arr.push(myData.schedules[i]);
    }
  }
  if (arr.length < 1) {
    res.render("user_schedules", {"title": "Set the date"});
    return;
  }
  res.render("user_schedules", {"title": ` User ${idNumber} schedules`, "schedule": arr });
});

// POST's
app.post('/users/new', (req, res) => {
  const newUser = req.body;
  const b = {
      "firstname": newUser.firstname,
      "lastname": newUser.lastname,
      "email": newUser.email,
      "password": newUser.password
  };
    //newUser.password = sha256(newUser.password);
    myData.users.push(b)
    res.redirect(`/users/${myData.users.length - 1}`) 
  });

  /* 3B - push data to data.js
    const b = {
      "user_id": newSchedule.user_id,
      "day": newSchedule.day,
      "start_at": newSchedule.start_at,
      "end_at": newSchedule.end_at
    }
    myData.schedules.push(b);
  
  app.post('/schedules/new', async (req, res) => {
    const { user_id, day, start_at, end_at } = req.body;
    await pool.query(`INSERT INTO schedules
    (user_id, day, start_at, end_at)
    VALUES
    ('${user_id}', '${day}', '${start_at}', '${end_at}' 
);`);
    res.redirect(`/schedules`);
  })
*/
  app.post("/schedules/new", async (req, res) => {
    const {user_id, day, start_at, end_at } = req.body;
    await pool.query(`INSERT INTO schedules
        (user_id, day, start_at, end_at)
        VALUES
        ('${user_id}', '${day}', '${start_at}', '${end_at}');`);
    res.redirect("/schedules");
});
  // listen to port 3000
app.listen(3000, () => {
  console.log(`http://localhost:3000/ is waiting for requests.`);
});