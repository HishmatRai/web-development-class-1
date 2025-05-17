let email = document.getElementById("email");
let password = document.getElementById("password");
let message = document.getElementById("message");
let signUpHandler = () => {
  message.style.display = "block";
  firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then((res) => {
      firebase
        .auth()
        .currentUser.sendEmailVerification()
        .then(() => {
          console.log("Res", res);
          console.log("User", res.user);
          firebase
            .database()
            .ref("users/" + res.user.uid)
            .set({
              name: "ABC",
              email: email.value,
              phone: "03232323232",
            })
            .then(() => {
              message.innerHTML = "Success!";
              message.style.color = "green";
              window.location.assign("./email-verification.html");
            });
        });
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
