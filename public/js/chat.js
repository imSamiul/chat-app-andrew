// eslint-disable-next-line no-undef
const socket = io();

// socket.on('countUpdated', (count2) => {
//   console.log('Count is being updated', count2);
// });

socket.on('message', (message) => {
  console.log(message);
});

const textForm = document.querySelector('form');
textForm.addEventListener('submit', (e) => {
  const text = e.target.elements.message;

  e.preventDefault();
  socket.emit('sendMessage', text);
});

document.querySelector('.send-location').addEventListener('click', (e) => {
  e.preventDefault();
  if (!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser');
    return;
  }
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    socket.emit('sendLocation', { latitude, longitude });
  });
});
