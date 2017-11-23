let socket = io();

socket.on('connect', function(){
  console.log('connected to server');

})

socket.on('disconnect', function(){
  console.log('disconnected from server');
})

socket.on('newMessage', function(message){
  console.log('New Message', message);
  let li = $('<li></li>')
  li.text(`${message.from}: ${message.text}`)

  $('#messages-list').append(li)
})


$('#messages-form').on('submit', function(e){
  e.preventDefault()

  socket.emit('createMessage', {
    from: 'User',
    text: $('#message').val()
  }, function(){

  })
})
