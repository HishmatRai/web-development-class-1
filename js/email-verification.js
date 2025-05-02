const email = document.getElementById("email");
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      window.location.assign("home.html");
    } else {
      email.innerHTML = user.email;
    }
  } else {
    window.location.assign("login.html");
  }
});

// re-send
const message = document.getElementById("message");
const resendHandler = () => {
  firebase
    .auth()
    .currentUser.sendEmailVerification()
    .then(() => {
      message.innerHTML = "Email verification sent!";
      message.style.color = "green";
    })
    .catch((err) => {
      message.innerHTML = err.message;
      message.style.color = "red";
    });
};

const goHomeHandler = () => {
  window.location.reload();
};
