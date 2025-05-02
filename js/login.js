let email = document.getElementById("email");
let password = document.getElementById("password");
let message = document.getElementById("message");
let signInHandler = () => {
  message.style.display = "block";
  firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .then((res) => {
      message.innerHTML = "Success!";
      message.style.color = "green";
      setTimeout(() => {
        if (res.user.emailVerified) {
          window.location.assign("./home.html");
        } else {
          window.location.assign("./email-verification.html");
        }
      }, 2000);
    })
    .catch((error) => {
      console.log("error ----> ", error.message);
      message.innerHTML = error.message;
      message.style.color = "red";
    });
  setTimeout(() => {
    message.style.display = "none";
  }, 2000);
};
