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

const addHandler = () => {
  // firebase.database().ref("rere/" + id).set({})
  // firebase.database().ref("rere/" ).push({})
//   firebase.firestore().collection("users").doc("user1").set({
//     name: "ABC",
//     phone:"545",
//     email:"info@gmail.com"
//   }).then(() => {
//     console.log("Document successfully written!");
// })
// .catch((error) => {
//     console.error("Error writing document: ", error);
// });
// ;

 firebase.firestore().collection("users").add({
    name: "ABC",
    phone:"545",
    email:"info@gmail.com"
  }).then(() => {
    console.log("Document successfully written!");
})
.catch((error) => {
    console.error("Error writing document: ", error);
});
};
