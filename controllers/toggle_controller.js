var express = require("express");

var router = express.Router();

var db = require("../models/");

var sequelize = require("sequelize");

var path = require("path");

var Dictionary = require("oxford-dictionary-api");
var app_id = "106d1fc7";
var app_key = "703b3bcb4b34e247d483d8df00a4c064";
var dict = new Dictionary(app_id,app_key);

function makeId()
{
  var id = Math.floor(Math.random()*10).toString()
  + Math.floor(Math.random()*10).toString()
  + Math.floor(Math.random()*10).toString()
  + Math.floor(Math.random()*10).toString()
  + Math.floor(Math.random()*10).toString()
  + Math.floor(Math.random()*10).toString()
  + Math.floor(Math.random()*10).toString()
  + Math.floor(Math.random()*10).toString()
  + Math.floor(Math.random()*10).toString()
  + Math.floor(Math.random()*10).toString();
  console.log(id);
  return parseInt(id);
}
//for now most of the controllers will have placeholder names until the models exist.

//this route is to retrieve all user scores
router.get("/api/userScores", function(req, res)
{
  db.User.findAll({
    include: [db.Score]
  }).then(function(results)
  {
    //might change to res.render(results) if we use handlebars template
    res.json(results);
  });
});

//route to retrieve all scores for one user.
router.get("/api/userScores/:id", function(req, res)
{
  db.User.findAll({
    include: [db.Score],
    where: {
      id: req.params.id
    }
  }).then(function(results)
  {
    res.json(results)
  });
});

//route to retrieve 10 users with highest scores. Used to display something like AAA: 140000
router.get("/api/highScore", function(req, res)
{
  db.Score.findAll({
    include: [db.User],
    order: sequelize.literal("score DESC"),
    limit: 10
  }).then(function(results)
  {
    res.json(results);
  });
});

//retrieves 10 longest words
router.get("/api/long", function(req, res)
{
  db.Score.findAll({
    include: [db.User],
    order: sequelize.literal("length(word) DESC"),
    limit: 10
  }).then(function(results)
  {
    res.json(results);
  });
});

//this route first looks for any users with matching fbId
//if none are found then a new user is created.
//this route is for creating users through fb.
router.post("/api/addUserFb", function(req, res)
{
  console.log(req.body);
  db.User.findAll({
    where: {
      fbId: req.body.fbId
    }
  }).then(function(results)
  {
    console.log(results.length);
   if(results.length === 0)
    {
      db.User.create({
        name: req.body.name,
        fbId: req.body.id
      }).then(function(results)
      {
        res.redirect("/");
      });
    }
    else
    {
      console.log("user already exists");
      res.end();
    }
  });
});

//adds non fb users
router.post("/api/addUser", function(req, res)
{
  var numId = makeId();
  db.User.create({
        name: req.body.name,
        fbId: numId
  }).then(function(results)
  {
    res.send(results);
  });
});

//route for adding new scores
router.post("/api/addScore", function(req, res)
{
  console.log(req.body);
  db.Score.create({
    score: req.body.score,
    word: req.body.word,
    UserId: req.body.UserId
  }).then(function(result)
  {
    res.redirect("/");
  });
});

router.get("/api/checkWord/:word", function(req, res)
{
  dict.find(req.params.word, function(error,data)
  {
    if (error) return res.send(error);
    res.send(data.results[0].lexicalEntries[0].lexicalCategory);
  });
});
//delete route if we decide to let a user delete themselves
router.delete("/:id", function(req, res)
{
  db.User.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(results)
  {
    res.redirect("/");
  });
});

module.exports = router;
