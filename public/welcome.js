console.log("butts");

$("#userSubmit").click(function(event)
{
  event.preventDefault();

  var user = {
    name: $("#userfname").val().trim()
  };

  $.post("api/addUser", user).done(function(data)
  {
    console.log(data);
  });
});

//for facebook login
