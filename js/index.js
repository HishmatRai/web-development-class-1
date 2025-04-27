firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // user === true
    console.log("Login true", user);
    window.location.assign("./pages/home.html");
  } else {
    window.location.assign("./pages/login.html");
  }
});
