//basic routes we need to use to display leaderboard stuff...

$.get("/api/highScore", function(data)
{
  for (var i = 0; i < data.length; i++)
  {
    console.log(data[i].User.name);
    console.log(data[i].score);
  }
  //$("#leaderboard").append("<h3>"+ data[i].name+"<h3>");
});


$.get("/api/long", function(data)
{
  for (var i = 0; i < data.length; i++)
  {
    console.log(data[i].User.name);
    console.log(data[i].word);
  }
});
