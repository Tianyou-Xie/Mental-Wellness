 // Get the current user's profile data
 function getUserProfile() {
    const userId = "USER_ID"; // replace with your user ID or fetch dynamically
    db.collection("users").doc(userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          const age = userData.age;
          const gender = userData.gender;
          displayProfileInfo(age, gender);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  // Display user profile information
  function displayProfileInfo(age, gender) {
    const profileInfoDiv = document.getElementById("profileInfo");
    profileInfoDiv.innerHTML = `
      <p>Age: ${age}</p>
      <p>Gender: ${gender}</p>
    `;
  }

  // Call the function to fetch and display user profile data
  getUserProfile();

  const userId = "USER_ID"; // replace with your user ID or fetch dynamically
  db.collection("users").doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const userData = doc.data();
        document.getElementById("name").value = userData.name;
        document.getElementById("age").value = userData.age;
        document.getElementById("gender").value = userData.gender;
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });


// Update user profile data
function updateProfile(event) {
  event.preventDefault();
  const userId = "USER_ID"; // replace with your user ID or fetch dynamically
  const newName = document.getElementById("name").value;
  const newAge = document.getElementById("age").value;
  const newGender = document.getElementById("gender").value;

  db.collection("users").doc(userId)
    .update({
      name: newName,
      age: parseInt(newAge),
      gender: newGender
    })
    .then(() => {
      console.log("Document successfully updated!");
      alert("Profile updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
      alert("Failed to update profile.");
    });
}

// Call the function to fetch user profile data
getUserProfile();

// Add submit event listener to the form
document.getElementById("editProfileForm").addEventListener("submit", updateProfile);
