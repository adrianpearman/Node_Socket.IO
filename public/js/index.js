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

socket.on('newLocationMessage', function(message){
  let li = $('<li></li>')
  let a = $('<a target="_blank">My Current Location</a>')

  li.text(`${message.from}: `)
  a.attr('href', message.url)
  li.append(a)
  $('#messages-list').append(li)
})


$('#messages-form').on('submit', function(e){
  e.preventDefault()

  socket.emit('createMessage', {
    from: 'User',
    text: $('#message').val()
  }, function(){
    // clearing the chat location
    $('#message').val('')
  })
})

let localButton = $('#location-button')
localButton.on('click', function(e){
  e.preventDefault();
  if (!navigator.geolocation) {
    return alert('Geo location not supported by your browser')
  }

  localButton.attr('disabled', 'disabled').text('Sending location...')

  navigator.geolocation.getCurrentPosition(function(location){
    console.log(location);
    localButton.removeAttr('disabled').text('Send Location')
    socket.emit('createLocationMessage',{
      latitude: location.coords.latitude,
        longitude: location.coords.longitude
    })
  }, function(){
    alert('Unable to fetch location')
    localButton.removeAttr('disabled').text('Send Location')
  })
})
