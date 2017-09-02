// YOUR CODE HERE:

// function reqListener () {
//   console.log(this.responseText);
// }

// var oReq = new XMLHttpRequest();
// oReq.addEventListener("load", reqListener);
// oReq.open("GET", "http://parse.sfm6.hackreactor.com/");
// oReq.send();


var app = {};

app.init = function () {
  // debugger
  // $.ajax({type:"OPTIONS",url:"http://parse.sfm6.hackreactor.com/"});
  // $(document).ajaxStart();

  //jquery listeners
  //connection to the server
  //
  
  $('#main .username').on('click', app.handleUsernameClick);
  // $('#send .submit').on('submit', app.handleSubmit);
  $('#send').submit(app.handleSubmit);
  $('.newRoom').on('click', app.renderRoom);
  app.fetch();

}

app.send = function(message) {
  // $.ajax('http://parse.sfm6.hackreactor.com/',data);
  $.ajax({type:"POST",url:"http://parse.sfm6.hackreactor.com/",data:message}); // JSON.stringify()
}

app.fetch = function(message) {
  $.ajax({type:"GET",url:"http://parse.sfm6.hackreactor.com/chatterbox/classes/messages",data:JSON.stringify(message),success: function(data) {
    console.log('FETCH WORKS!');
    console.log('message in FE#TCH:', message);
    console.log('data in success', data);
    app.renderMessage(message)
    // should acrtuall render message here
  }, error: function(data) {
    console.log('DOES NOT WORK!');
  }});  //url:"http://parse.sfm6.hackreactor.com/",data:JSON.stringify(message)})
}


/*
$.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'http://parse.CAMPUS.hackreactor.com/chatterbox/classes/messages',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message', data);
  }
});*/



app.clearMessages = function(element) {
  // $(element).remove();
  $.ajax({type:"DELETE",url:"http://parse.sfm6.hackreactor.com/"});
  $('#chats').html('');
}


app.renderMessage = function(message) {
   $.ajax({type:"GET",url:"http://parse.sfm6.hackreactor.com/chatterbox/classes/messages", data : message, success: function(data){
      console.log('chatterbox: success');
      console.log('messagge:!!!!:', message);
      console.log('data in RENDER Message', data);
      var $username = $(`<p class='username'>${message.username}</p>`)
      $('#main').append($username);
      $('#chats').append(`<span class='username'>${message.text}</span>`);
    
   }, error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message', data);
  }});
}

app.renderRoom = function(roomName) {
  // 
  var $room = $('<div/>');
  $room.text(roomName);
  $(document.body).append('<div id="roomSelect"></div>');
  $('#roomSelect').append($room);
}

// create .class in render message acording to object that was passed in as argument
// also add that username text in that div/span
app.handleUsernameClick = function(){};


app.handleSubmit = function() {

  var textMessage = $('#send .text').val();

  var roomName = $('#main .newRoom').val();

  var obj = {username: anonHackers,
            text: textMessage,
            roomname: roomName};

  var $node = $('<div/>');

  $node.text(textMessage);
  $('#chats').append($node);
  app.send(obj);
}

// listen for clicks

// add a friend upon someone clicking 'username'
  // need to know what DOM element 'username' is in

// need to complete init (assuming this is a server request or refresh page)




$(window.document).ready(app.init)


