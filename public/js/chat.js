// eslint-disable-next-line no-undef
const socket = io();

// socket.on('countUpdated', (count2) => {
//   console.log('Count is being updated', count2);
// });

const $messageForm = document.querySelector('form');
const $messageFormInput = document.querySelector('input');
const $messageFormButton = document.querySelector('.btn-message');
const $locationButton = document.querySelector('.send-location');
const $messages = document.querySelector('#messages');

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
socket.on('message', (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    message,
  });
  $messages.insertAdjacentHTML('beforeend', html);
});

$messageForm.addEventListener('submit', (e) => {
  const text = e.target.elements.message.value;
  $messageFormButton.setAttribute('disabled', 'disabled');
  // disable
  e.preventDefault();
  socket.emit('sendMessage', text, (error) => {
    $messageFormButton.removeAttribute('disabled');
    $messageFormInput.value = '';
    $messageFormInput.focus();
    // enable
    if (error) {
      return console.log(error);
    }
    console.log('message delivered');
  });
});

$locationButton.addEventListener('click', (e) => {
  e.preventDefault();
  $locationButton.setAttribute('disabled', 'disabled');
  // disable
  if (!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser');
    return;
  }
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    socket.emit('sendLocation', { latitude, longitude }, (error) => {
      if (error) {
        return console.log(error);
      }
      $locationButton.removeAttribute('disabled');
      console.log('Location shared');
    });
  });
});
