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
  $.ajax({type:"POST",url:"http://parse.sfm6.hackreactor.com/chatterbox/classes/messages/",contentType: 'application/json',data:message, success: function() {
    console.log('SUCcCESS SEND!!');
  }, error: function() {
    console.log('FAILED SEND!!!!');
  }}); // JSON.stringify()
}

app.fetch = function(message) {
  $.ajax({type:"GET",url:"http://parse.sfm6.hackreactor.com/chatterbox/classes/messages?order=-createdAt",data:message,success: function(data) {
    console.log('FETCH WORKS!');
    console.log('data', data);
    // loop within fetch
    for ( var i = 0; i < data.results.length ; i++ ) {
      if ( data.results[i].text === encodeURI(data.results[i].text) ) {
        app.renderMessage(data.results[i])
      }
    }
    app.renderRoom(data)
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
  var $username = $(`<p class='username'>${message.username}</p>`);
  $('#chats').append($username);
  var $textMessage = $(`<span class='textMessage'>${message.text}</span>`);
  $('.username').append($textMessage);


  // message is an array of objects given to us from fetch, it has all attribute
  // loop through array to get username and message text, then append it to HTML
/*
  for ( var i = 0; i < message.results.length ; i++ ) {
    // var username = message.results[i]
    var $username = $(`<p class='username'>${message.results[i].username}</p>`);
    $('#chats').append($username);
    // var textMessage = message.results[i].text
    var $textMessage = $(`<span class='textMessage'>${message.results[i].text}</span>`);
    $('.username').append($textMessage);
  }*/

    
  //  }, error: function (data) {
  //   // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
  //   console.error('chatterbox: Failed to send message', data);
  // }};
}

app.renderRoom = function(message) {
  for ( var i = 0; i < message.results.length; i++ ) {
    // var $room = $('<div/>');
    // $room.text(roomName);
    // $(document.body).append('<div id="roomSelect"></div>');
    // $('#roomSelect').append($room);
    if ( message.results[i].roomname ) {
      console.log('Rooom name!!!', message.results[i].roomname);
      // var room = message.results[i].roomname;
      var $room = $(`<div id='roomSelect'>${message.results[i].roomname}</div>`);
      $('#chats').append($room)
    }
  }
}

// create .class in render message acording to object that was passed in as argument
// also add that username text in that div/span
app.handleUsernameClick = function(){};


app.handleSubmit = function() {

  var textMessage = $('#send .text').val();

  var roomName = $('#main .newRoom').val();

  var obj = {username: 'anonHackers',
            text: textMessage,
            roomname: roomName};

  var $node = $('<div/>');

  $node.text(textMessage);
  $('#chats').prepend($node);
  app.send(obj);
}

// listen for clicks

// add a friend upon someone clicking 'username'
  // need to know what DOM element 'username' is in

// need to complete init (assuming this is a server request or refresh page)




$(window.document).ready(app.init)


