console.log("butts");

$("#userSubmit").click(function(event)
{
  event.preventDefault();

  var user = {
    name: $("#userfname").val().trim()
  };

  $.post("api/addUser", user).done(function(data)
  {
    window.location.href+="game.html";
  });
});

//for facebook login
