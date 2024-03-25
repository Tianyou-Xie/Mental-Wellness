var currentUser;               //points to the document of the user who is logged in
function populateUserInfo() {
            firebase.auth().onAuthStateChanged(user => {
                // Check if user is signed in:
                if (user) {

                    //go to the correct user document by referencing to the user uid
                    currentUser = db.collection("users").doc(uid)
                    //get the document for current user.
                    currentUser.get()
                        .then(userDoc => {
                            //get the data fields of the user
                            let name = userDoc.data().name;
                            let age = userDoc.data().age;
                            let gender = userDoc.data().gender;

                            //if the data fields are not empty, then write them in to the form.
                            if (name != null) {
                                document.getElementById("name").value = name;
                            }
                            if (age != null) {
                                document.getElementById("age").value = age;
                            }
                            if (gender != null) {
                                document.getElementById("gender").value = gender;
                            }
                        })
                } else {
                    // No user is signed in.
                    console.log ("No user is signed in");
                }
            });
        }

//call the function to run it 
populateUserInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
 }
 function saveUserInfo() {
    //enter code here

    //a) get user entered values
    name = document.getElementById('name').value;       //get the value of the field with id="nameInput"
    age = document.getElementById('age').value;     //get the value of the field with id="schoolInput"
    gender = document.getElementById('gender').value;       //get the value of the field with id="cityInput"
    //b) update user's document in Firestore
    currentUser.update({
        name:  name,
        age: age,
        gender: gender
    })
    .then(() => {
        console.log("Document successfully updated!");
    })
    //c) disable edit 
    document.getElementById('personalInfoFields').disabled = true;
}
