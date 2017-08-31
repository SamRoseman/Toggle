var express = require("express");

var router = express.Router();

var db = require("../models/");

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
router.get("placeholder", function(req, res)
{
  db.User.findAll({
    include: [db.Score],
    order: [sequelize.fn('max', sequelize.col('score'), 'DESC')], //score is placeholder.
    limit: 10
  }).then(function(results)
  {
    res.json(results);
  });
});

//retrieves 10 longest words
router.get("placeholder", function(req, res)
{
  db.User.findAll({
    include: [db.Score],
    order: [sequelize.fn("length", sequelize.col('words'))], //words is placeholder
    limit: 10
  }).then(function(results)
  {
    res.json(results);
  });
});
