var isLogin = false;
var userName;
firebase.auth().onAuthStateChanged(function (user) {

  if (user) {
    $('#authStatus').html('Logout');
    isLogin = true;
    if ($(location).attr('pathname') == '/main.html') {
      userName = user.displayName;
      document.getElementById("name-goes-here").innerHTML = userName;
    }
  } else {
    $('#authStatus').html('Login');
  }
});

function authStatus() {
  if (isLogin) {
    firebase.auth().signOut().then(() => {
      location.reload();
    }).catch((error) => {
      console.log('nav log()', error)
    });
  } else {
    location.href = 'login.html';
  }
}

function startChat() {
  var value = document.getElementById("message").value;
  document.getElementById("chat-goes-here").innerHTML = value;
  document.getElementById("message").value = '';
  var url = "https://api.openai.com/v1/chat/completions";

  var post = `{
        "model": "gpt-3.5-turbo",
        "messages": [
          {
            "role": "user",
            "content": "${value}"
          }
        ]
    }`;

  fetch(url, {
    method: 'post',
    body: post,
    headers: {
      'Content-Type': 'application/json',
      "Authorization": "Bearer PASTE_KEY_HERE"
    }
  }).then((response) => {
    return response.json()
  }).then((res) => {
    document.getElementById("ai-chat-goes-here").innerHTML = res.choices["0"].message.content;
  }).catch((error) => {
    console.log(error)
    document.getElementById("ai-chat-goes-here").innerHTML = "Error fetching result. Please try again"
  })

}








function updateFirestore(userId, value) {

  var timestamp = firebase.firestore.FieldValue.serverTimestamp();

  db.collection("users").doc(userId).collection("emotion").add({
    value: value,
    timestamp: timestamp
  }).then(function () {
    console.log("Document successfully updated!");
  }).catch(function (error) {
    console.error("Error updating document: ", error);
  });
}

function handleIconClick(value) {
  const user = auth.currentUser;
  if (user) {
    const userId = user.uid;
    updateFirestore(userId, value);
    document.getElementById("emotionIcons").style.display = "none";
    let sentimentText;
    switch (value) {
      case 1:
        sentimentText = "You are very sad today. I am so sorry to hear that...";
        break;
      case 2:
        sentimentText = "You are sad today. What happened...";
        break;
      case 3:
        sentimentText = "You are usual mind today. No news is good news!";
        break;
      case 4:
        sentimentText = "You are happy today. Do you want to share with me?";
        break;
      case 5:
        sentimentText = "You are very happy today. I am very happy to hear that!";
        break;
      default:
        sentimentText = "";
    }
    document.getElementById("sentimentText").innerText = sentimentText;

    db.collection("quote").doc("tuesday").get().then((doc) => {
      if (doc.exists) {
        document.getElementById("quoteText").innerText = doc.data().quote;
      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.error("Error getting document:", error);
    });
  } else {
    console.log("No user is signed in.");
  }
}

document.getElementById("sadcryIcon").addEventListener("click", function () {
  handleIconClick(1);
});

document.getElementById("sadtearIcon").addEventListener("click", function () {
  handleIconClick(2);
});

document.getElementById("mehIcon").addEventListener("click", function () {
  handleIconClick(3);
});

document.getElementById("smileIcon").addEventListener("click", function () {
  handleIconClick(4);
});

document.getElementById("laughIcon").addEventListener("click", function () {
  handleIconClick(5);
});
