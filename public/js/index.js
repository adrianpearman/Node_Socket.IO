let socket = io();

socket.on('connect', function(){
  console.log('connected to server');

})

socket.on('disconnect', function(){
  console.log('disconnected from server');
})

socket.on('newMessage', function(message){
  // mustache.js used to refactor the socket submissions
  let time = moment(message.createdAt).format('h:mm a')
  let template = $('#message-template').html()
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: time
  })

  $('#messages-list').append(html)
})

socket.on('newLocationMessage', function(message){
  let time = moment(message.createdAt).format('h:mm a')
  let template = $('#location-message-template').html()
  let li = Mustache.render(template, {
    url: message.url,
    createdAt: time,
    from: message.from
  })

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
