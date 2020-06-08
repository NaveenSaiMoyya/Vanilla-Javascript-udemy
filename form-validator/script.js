const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(input.value).toLowerCase().trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

function checkPasswordsMatch(p1, p2) {
  if (p1.value !== p2.value) {
    showError(p2, "password doesn't match");
  } else {
    showSuccess(p2);
  }
}

function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      //   showError(input, input.id + " is requied");
      showError(input, `${getFieldName(input.id)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input.id)} length must be greater than ${min}`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input.id)} length must be less than ${max}`
    );
  } else {
    showSuccess(input);
  }
}

function getFieldName(input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 5, 10);
  checkLength(password, 8, 14);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
