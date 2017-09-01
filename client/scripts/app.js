// YOUR CODE HERE:

var app = {};

app.init = function () {
  
}

app.send = function(data) {
  // $.ajax('http://parse.sfm6.hackreactor.com/',data);
  $.ajax({type:"POST",url:"http://parse.sfm6.hackreactor.com/",data:data});
}

app.fetch = function() {
  $.ajax({type:"FETCH"})
}

app.clearMessages = function(element) {
  // $(element).remove();
  $.ajax({type:"DELETE",url:"http://parse.sfm6.hackreactor.com/", success: function(result) {
      // $(result).html().remove();
    }})
  $('#chats').remove();
}

//$('#chats').html('<blink>OMG IT\'s 1998!</blink>');

app.renderMessage = function(message) {
  // $('#chats').append('<h1></h1>',{text:message.text});
  // $('#chats').appendChild('<h1></h1>');
  // jQuery('<div/>', message).appendTo('#chats');
  // console.log('hellll');
  // $('#chats').html('<blink>OMG IT\'s 1998!</blink>')
  $('#chats').html().appendChild(message)

} 

//$( ".inner" ).append( "<p>Test</p>" );