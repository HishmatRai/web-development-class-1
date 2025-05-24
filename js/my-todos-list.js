let uid;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("user", user);
    if (user.emailVerified) {
      uid = user.uid;
    } else {
      window.location.assign("email-verification.html");
    }
  } else {
    window.location.assign("login.html");
  }
});

firebase
  .database()
  .ref("todos/")
  .on("value", (todoRes) => {
    todoRes.forEach((todoData) => {
        // REALTIME DATABASE  5000  = 1
        // FIRESTORE DATABASE  1
      if (todoData.val().uid === uid) {
        console.log(todoData.val());
      }
    });
  });
