// SIGNUP & LOGIN

// only when all checks are "true", the script will POST
var checks = [false, false, false];

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

// change between signup and login-mode
sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

$(document).ready(function(){

  $("#register-button").on('click',function(e){
      e.preventDefault();
      registerUser();
  })

  $("#login-button").on('click',function(e){
      e.preventDefault();
      if ($("#log-username").val() != "" && $("#log-password").val() != "") {
        ajaxUserLogin();
      } else {
        console.log("Login Error. Enter valid username & password.");
      }
  });

});

// -- REGISTER --
function registerUser() {
  checkPassword();
  console.log(checks);
  if (checks[0] && checks[1] && checks[2]) {
    ajaxUserData();
    return 0;
  } else {
    if (!checks[0]) {
      window.alert("Please choose a valid username.\n a-Z, 0-9, min 5 characters.")
    }
    if (!checks[1]) {
      window.alert("Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 symbol: @$!%*?&")
    }
    if (!checks[2]) {
      window.alert("Enter valid email")
    }
  }
  console.log("submit error");
}

// check for correct username
function checkUsername() {
  let name = $("#reg-username").val()
  if (name == "") {
    console.log("empty");
    uncheck(0);
    return 0;
  } else {
    regex = /[a-z0-9]{5,}$/i;
    if (name.match(regex) == null) {
      console.log("wrong input. a-z, 0-9, min 5 characters.");
      uncheck(0);
      return 0;
    }
    ajaxCheckUserName();
    checks[0] = true;
  }
}

// check for correct password entropy
function checkPassword() {
  let pw1 = $("#reg-password1").val();

  if (pw1 == "") {
    uncheck(1);
    return 0;
  }
  if (pw1.length < 8) {
    console.log("password too short. at least 8 characters");
    uncheck(1);
    return 0;
  }
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  if (pw1.match(regex) == null) {
    console.log("password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 symbol: @$!%*?&");
    uncheck(1);
    return 0;
  }
  checks[1] = true;
}

// check for legit and non-existing email
function checkEmail() {
  let regex = /[a-z0-9-_]+@[a-z0-9-_.]+[.]{1}[a-z]+/i;
  if ($("#reg-email").val().match(regex) == null) {
    console.log("wrong input. enter valid email");
    uncheck(2);
    return 0;
  }
  ajaxCheckUserMail();
  checks[2] = true;
}

// uncheck check, when something goes wrong
function uncheck(index) {
  checks[index] = false;
  console.log(checks);
}

// check every input with <input onblur="checkEmpty(this)">
function checkEmpty(obj) {
  if ($(obj).val() == "") {
    console.log(obj.placeholder + " missing");
    return 0;
  }
  return 1;
}
// -- END OF REGISTER --
