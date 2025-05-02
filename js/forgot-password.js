const email = document.getElementById("email");
const message = document.getElementById("message");
const forgotPasswordHandler = () => {
  firebase
    .auth()
    .sendPasswordResetEmail(email.value)
    .then(() => {
      message.innerHTML = "Password reset email sent!";
      message.style.color = "green";
    })
    .catch((error) => {
      var errorMessage = error.message;
      message.innerHTML = errorMessage;
      message.style.color = "red";
    });
};
