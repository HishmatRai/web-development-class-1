const fullName = document.getElementById("full-name");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const profileImage = document.getElementById("profile-image");
let uid;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      uid = user.uid;
      firebase
        .database()
        .ref("users/" + user.uid)
        .on("value", (userData) => {
          console.log(userData.val());
          fullName.value = userData.val().name;
          phone.value = userData.val().phone;
          email.value = userData.val().email;
          profileImage.src = userData.val().profileURL
            ? userData.val().profileURL
            : "https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg";
        });
    } else {
      window.location.assign("email-verification.html");
    }
  } else {
    window.location.assign("login.html");
  }
});
// update
const updateHandler = () => {
  firebase
    .database()
    .ref("users/" + uid)
    .update({
      name: fullName.value,
      phone: phone.value,
    });
};

// profile upload
const uploadProfileImage = (event) => {
  var storageRef = firebase.storage().ref();
  var uploadTask = storageRef
    .child(`profile-images/${uid}`)
    .put(event.target.files[0]);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log("File available at", downloadURL);
        firebase
          .database()
          .ref("users/" + uid)
          .update({
            profileURL: downloadURL,
          });
      });
    }
  );
};
