var socket = io();

socket.on('connect', function() {
    console.log('connected to server');
    
//    socket.emit('createEmail', {
//        to: 'jen@example.com',
//        text: 'hey, this is andrew'
//    });
    
});
            
socket.on('disconnect', function() {
    console.log('disconnected from server');
});

//socket.on('newEmail', function(email) {
//    console.log('new email', email);
//});

socket.on('newMessage', function(message) {
    console.log('newMessage', message);
    //create list item with jQuery
    var li = jQuery('<li></li');
    li.text(`${message.from}: ${message.text}`);
    
    jQuery('#messages').append(li);
});

//socket.emit('createMessage', {
//    from: 'karia',
//    text: 'hi'
//}, function(data) {
//    console.log('got it', data);
//});

socket.on('newLocationMessage', function (message) {
    var li  = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    li.text(`${message.from}: `);
    //select jquery
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e){
    //prevent default of the normal event
    //in this case, it's 'send' to submit the message
    e.preventDefault();
    var messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    //if there is no geolocation object
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }
    
    locationButton.attr('disabled', 'disabled').text('Sending location...');
    
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        locationButton.removeAttr('disabled').text('Send location');
        alert("Unable to fetch location");
    });
});