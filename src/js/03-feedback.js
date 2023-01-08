import throttle from "lodash.throttle";

const form = document.querySelector(".feedback-form");
const email = document.querySelector(".feedback-form input");
const textarea = document.querySelector(".feedback-form textarea")

populateTextarea();

form.addEventListener("submit", onFormSubmit);
textarea.addEventListener("input", throttle(onTextareaInput, 500, { 'trailing': false }));
email.addEventListener("input", throttle(onEmailInput, 500, { 'trailing': false }));

const userData = {
    email: null,
    message: null,
};

function onFormSubmit(event) {
    event.preventDefault();
    userData.email = email.value;
    userData.message = textarea.value;
    console.log(userData);
    localStorage.removeItem("feedback-form-state");
    event.currentTarget.reset();
}

function setStorage(data) {
    localStorage.setItem("feedback-form-state", JSON.stringify(data));
}

function onTextareaInput(event) {
    userData.message = event.currentTarget.value;
    setStorage(userData);
}

function onEmailInput(event) {
    userData.email = event.currentTarget.value;
    setStorage(userData);
}

function populateTextarea() {
    const savedMessage = localStorage.getItem("feedback-form-state");
    const data = JSON.parse(savedMessage);

    if(data) {
        if (data.message) textarea.value = data.message;
        if (data.email) email.value = data.email;
    }
};

