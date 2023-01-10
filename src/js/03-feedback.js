import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea');

populateTextarea();

form.addEventListener('submit', onFormSubmit);
textarea.addEventListener('input', throttle(onTextareaInput, 500));
email.addEventListener('input', throttle(onEmailInput, 500));

const userData = JSON.parse(localStorage.getItem('feedback-form-state')) || {};

function onFormSubmit(event) {
  event.preventDefault();
  if (email.value && textarea.value) {
    userData.email = email.value;
    userData.message = textarea.value;
    console.log(userData);
    localStorage.removeItem('feedback-form-state');
    event.currentTarget.reset();
    userData.email = '';
    userData.message = '';
  }
}

function setStorage(data) {
  localStorage.setItem('feedback-form-state', JSON.stringify(data));
}

function onTextareaInput(event) {
  userData.message = event.target.value;
  setStorage(userData);
}

function onEmailInput(event) {
  userData.email = event.target.value;
  setStorage(userData);
}

function populateTextarea() {
  const savedMessage = localStorage.getItem('feedback-form-state');
  const data = JSON.parse(savedMessage);

  if (data) {
    if (data.message) textarea.value = data.message;
    if (data.email) email.value = data.email;
  }
}
