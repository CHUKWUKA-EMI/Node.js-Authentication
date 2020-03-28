const firstname = document.getElementById('firstName')

const lastname = document.getElementById('lastName')

const username = document.getElementById('username');

const password = document.getElementById('password');

const email = document.getElementById('email');

const divF = document.getElementById('firstError')

const divL = document.getElementById('lastError')

const div1 = document.getElementById('nameError');

const div2 = document.getElementById('passError');

const div3 = document.getElementById('emailError');

const form = document.getElementById('form');


firstname.onblur = function (evt) {
  if (!firstname.value) {
    divF.innerHTML = "firstname cannot be empty!";
    firstname.style.borderColor = 'red'

  }
  else {
    divF.innerHTML = "";
    username.style.borderColor = "#dddddd";
  }
}

lastname.onblur = function (evt) {
  if (!lastname.value) {
    divL.innerHTML = "lastname cannot be empty!";
    lastname.style.borderColor = 'red'

  } else {
    divL.innerHTML = "";
    lastname.style.borderColor = "#dddddd";
  }
}

username.onblur = function (evt) {
  if (!username.value) {
    div1.innerHTML = "Oops...Username cannot be empty!";
    username.style.borderColor = 'red'

  }
  else if (username.value.length < 3) {
    div1.innerHTML = "Username length must be three characters and above!"
  } else {
    div1.innerHTML = "";
    username.style.borderColor = "#dddddd";
  }
}

password.onblur = function () {
  if (!password.value) {
    div2.innerHTML = "password is not filled!";
    password.style.borderColor = 'red'
  }
  else if (password.value.length < 6) {
    div2.innerHTML = "Password must be six digits and above!"
  } else {
    div2.innerHTML = ""
    password.style.borderColor = '#dddddd'
  }
}

email.onblur = function () {
  const validate = /\S+@\S+/.test(String('email@gmail.com').toLowerCase())

  if (!email.value) {
    div3.innerHTML = "Email field is required!"
    email.style.borderColor = 'red'
  }
  else if (validate == false) {
    div3.innerHTML = "invalid email address!"
  } else {
    div3.innerHTML = ""
    email.style.borderColor = '#dddddd'
  }
}

const button = document.getElementById('submit')
button.onclick = function () {
  if (!(firstname.value || lastname.value || username.value || password.value || email.value)) {
    divF.innerHTML = "Firstame cannot be empty!";
    firstname.style.borderColor = 'red'

    divL.innerHTML = "Lastname cannot be empty!";
    lastname.style.borderColor = 'red'

    div1.innerHTML = "Oops...Username cannot be empty!";
    username.style.borderColor = 'red'

    div2.innerHTML = "password field is required!";
    password.style.borderColor = 'red'

    div3.innerHTML = "Email is required!";
    email.style.borderColor = 'red'


  }
}



