let uid;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      uid = user.uid;
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
const addBtn = document.getElementById("add-btn");
function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
}

const addHandler = () => {
  addBtn.value = "loading ...";
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
  var addData = firebase.database().ref("todos/").push({
    value: input.value,
    createdAt: moment().format(),
    uid: uid,
  });
  firebase
    .database()
    .ref("todos/" + addData.key)
    .update({
      key: addData.key,
    })
    .then(() => {
      input.value = "";
      addBtn.value = "Add";
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

const loading = document.getElementById("loading");
const list = document.getElementById("list");
firebase
  .database()
  .ref("todos/")
  .on("value", (res) => {
    // value child_added
    loading.style.display = "none";
    list.style.display = "block";
    list.innerHTML = "";
    if (res.val()) {
      res.forEach((data) => {
        console.log("data", data.val());
        const todoValue = document.createElement("p");
        list.appendChild(todoValue);
        todoValue.innerHTML = data.val().value;
        // Date
        const showDate = document.createElement("span");
        todoValue.append(showDate);
        showDate.innerHTML = moment(data.val().createdAt).fromNow();
        if (data.val().uid === uid) {
          // edit
          const editBtn = document.createElement("button");
          todoValue.appendChild(editBtn);
          editBtn.innerHTML = "Edit";
          // delete
          const deleteBtn = document.createElement("button");
          todoValue.appendChild(deleteBtn);
          deleteBtn.innerHTML = "Delete";
          // edit function
          editBtn.addEventListener("click", () => {
            var pro = prompt("Edit todo", data.val().value);
            firebase
              .database()
              .ref("todos/" + data.val().key)
              .update({
                value: pro,
              });
          });
          // delete function
          deleteBtn.addEventListener("click", () => {
            firebase
              .database()
              .ref("todos/" + data.val().key)
              .remove();
          });
        }
      });
    } else {
      const dataNotFound = document.createElement("p");
      dataNotFound.innerHTML = "Data not Found!";
      list.appendChild(dataNotFound);
    }
  });

// edit
// const editHandler = () => {
//   firebase
//     .database()
//     .ref("todos/" + "-OPzabteTysiefsJ2F_b")
//     .update({
//       value: "Update 2",
//     });
// };

// // delete
// const deleteHandler = () => {
//   firebase
//     .database()
//     .ref("todos/" + "-OPzabteTysiefsJ2F_b")
//     .remove();
// };
