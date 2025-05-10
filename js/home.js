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
  //
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.assign("login.html");
    });
};

// add data
const input = document.getElementById("input");
function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
}

const addHandler = () => {
  // Ex : 1
  // firebase
  //   .database()
  //   .ref("todos/" + "todo1")
  //   .set({
  //     value: input.value,
  //   })
  //   .then(() => {
  //     input.value = "";
  //   });

  // Ex : 2
  // firebase
  //   .database()
  //   .ref("todos/" + uuidv4())
  //   .set({
  //     value: input.value,
  //   })
  //   .then(() => {
  //     input.value = "";
  //   });

  // Ex: 3
  firebase
    .database()
    .ref("todos/")
    .push({
      value: input.value,
    })
    .then(() => {
      input.value = "";
    });
  // add update
};

// get data
// firebase
//   .database()
//   .ref("todos/" + "-OPuOSIlmtwFr9wfezKb")
//   .on("value", (res) => {
//     console.log("res", res.val());
//   });

firebase
  .database()
  .ref("users/")
  .on("value", (res) => {
    res.forEach((data) => {
      console.log("data", data.val());
    });
  });
