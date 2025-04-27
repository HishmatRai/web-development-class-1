firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      console.log("user", user);
    } else {
      window.location.assign("email-verification.html");
    }
  } else {
    window.location.assign("login.html");
  }
});

const LogOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.assign("login.html");
    });
};
