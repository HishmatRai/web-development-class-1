let email = document.getElementById("email");
let password = document.getElementById("password");
let message = document.getElementById("message");
let signInHandler = () => {
  message.style.display = "block";
  firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .then((res) => {
      console.log("Res", res);
      console.log("User", res.user);
      message.innerHTML = "Success!";
      message.style.color = "green";
      setTimeout(() => {
        window.location.assign("./home.html");
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
