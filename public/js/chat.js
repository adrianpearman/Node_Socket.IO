let socket = io();

function scrollToBottom() {
  // Selectors
  let messages = $('#messages-list')
  let newMessage = messages.children('li:last-child')
  // Heights
  let clientHeight = messages.prop('clientHeight')
  let scrollTop = messages.prop('scrollTop')
  let scrollHeight = messages.prop('scrollHeight')
  let newMessageHeight = newMessage.innerHeight();
  let lastMessageHeight = newMessage.prev().innerHeight()

  if ((clientHeight + scrollTop + newMessageHeight + lastMessageHeight) >= scrollHeight) {
    messages.scrollTop(scrollHeight)
  }
}

socket.on('connect', function(){
  let params = $.deparam(window.location.search)
  socket.emit('join', params, function(error){
    if (error) {
      alert(error) // modals can also be used as well
      window.location.href = '/'
    } else {
      console.log('no errors!');
    }
  })
})

socket.on('disconnect', function(){
  console.log('disconnected from server');
})

socket.on('updateUserList', function (users) {
  let ol = $('<ol></ol>')

  users.forEach(function (user) {
    ol.append($('<li>/</li>').text(user))
  })

  $('#users').html(ol)
  // console.log('Users List', users);
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
  scrollToBottom()
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
  scrollToBottom()
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
