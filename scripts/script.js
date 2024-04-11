// Initialize variables
var isLogin = false;
var userName;
var uid;
var newUserStatus;
var userChat = [];
var userChatDB = [];
var chatHolder;
var getChat;
var sessionID;

// Check authentication state
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is logged in
        $('#authStatus').html('Logout');
        isLogin = true;
        uid = user.uid;
        userName = user.displayName;
        let params = new URL(window.location.href);
        sessionID = params.searchParams.get("sessionID");

        // Perform actions based on current page
        if ($(location).attr('pathname') == '/main.html') {
            getUser();
            newUser();
        }
        if ($(location).attr('pathname') == '/chathistory.html') {
            getsUserChats();
        }
        if ($(location).attr('pathname') == '/viewchat.html') {
            viewChat();
        }
        if ($(location).attr('pathname') == '/ask.html' && sessionID != null) {
            editChat();
            var input = document.getElementById("message");
            input.addEventListener("keypress", (event) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    startChat();
                }
            });
        }
        if ($(location).attr('pathname') == '/ask.html') {
            var input = document.getElementById("message");
            input.addEventListener("keypress", (event) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    startChat();
                }
            });
        }
        if (localStorage.getItem("userChat") != null) {
            saveChat();
        }
        if ($(location).attr('pathname') == '/profile.html') {
            $('#alert').hide();
            editProfile();
        }
    } else {
        // User is not logged in
        $('#authStatus').html('Login');
        $('#staticBackdrop').modal('show');
    }
});

// Function to handle authentication status
function authStatus() {
    if (isLogin) {
        firebase.auth().signOut().then(() => {
            window.location.href = '/login.html';
        }).catch((error) => {
            console.log('nav log()', error)
        });
    } else {
        window.location.href = '/login.html';
    }
}

// Function to get user data
function getUser() {
    db.collection("users")
        .doc(uid)
        .get()
        .then((querySnapshot) => {
            if (!querySnapshot.empty) {
                let name = querySnapshot.data().name
                document.getElementById("name-goes-here").innerHTML = "Welcome, " + name;
            }
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}

// Function to check if user is new
function newUser() {
    db.collection("users")
        .doc(uid)
        .get()
        .then((querySnapshot) => {
            if (!querySnapshot.empty) {
                // docID = querySnapshot.docs[0].id;
                newUserStatus = querySnapshot.data().status
                let btn = document.getElementById("newuser");
                let emotion = document.getElementById("emotionIcons");
                let daystatus = document.getElementsByClassName("newuser")[0];
                if (newUserStatus) {
                    btn.style.display = "block";
                } else {
                    emotion.style.display = "block";
                    daystatus.style.display = "block";
                }
            }
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}

// Function to start a chat
function startChat() {
    var value = document.getElementById("message").value;

    if (chatHolder != undefined) {
        chatHolder += "<p><i class='fa-solid fa-circle-user fa-2xl'></i>&nbsp;" + value + "</p>";
        document.getElementById("chat-goes-here").innerHTML = chatHolder;
    } else {
        document.getElementById("chat-goes-here").innerHTML = "<br><p><i class='fa-solid fa-circle-user fa-2xl'></i>&nbsp;" + value + "</p>";
    }
    chatHolder = undefined;
    document.getElementById("message").value = '';
    var url = "https://api.openai.com/v1/chat/completions";

    let userObj = { "role": "user", "content": value };
    userChat.push(userObj);
    var post = {
        "model": "gpt-3.5-turbo",
        "messages": userChat
    };

    // Fetch chat completion from OpenAI API
    fetch(url, {
        method: 'post',
        body: JSON.stringify(post),
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer PASTE_KEY_HERE"
        }
    }).then((response) => {
        return response.json()
    }).then((res) => {
        let sysRes = res.choices["0"].message.content;
        let obj = { "role": "assistant", "content": sysRes };
        let objDB = { "question": value, "answer": sysRes };
        userChat.push(obj);
        userChatDB.push(objDB);
        for (var i = 0; i < userChat.length; i++) {
            if (chatHolder == undefined) {
                chatHolder = "<br><p><i class='fa-solid fa-circle-user fa-2xl'></i>&nbsp;" + userChat[i].content + "</p>";
            } else {
                chatHolder += "<p><i class='fa-solid fa-circle-user fa-2xl'></i>&nbsp;" + userChat[i].content + "</p>";
            }
        }
        document.getElementById("chat-goes-here").innerHTML = chatHolder;
    }).catch((error) => {
        console.log(error);
        userChat = [];
        userChatDB = [];
        document.getElementById("chat-goes-here").innerHTML = "<p><i class='fa-solid fa-circle-user fa-2xl'></i> Sorry there has been an error fetching result, please try again later.</p>";
    })

}

// Function to redirect to main page after profile edit
function mainRedirect() {
    var gender = document.querySelector('input[name = gender]:checked').value
    var occupation = document.querySelector('input[name = occupation]:checked').value
    var age = document.querySelector('#age').value

    db.collection("users")
        .doc(uid)
        .update({ status: false, gender: gender, occupation: occupation, age: age })
        .then(() => {
            window.location.reload();
        }).catch((error) => {
            console.error("Error updating user: ", error);
            alert('Error,check console')
        });
}

// Function to redirect to login page
function loginRedirect() {
    window.location.href = '/index.html';
}

// Function to save chat data
function saveChat() {
    var timestamp = firebase.firestore.FieldValue.serverTimestamp();
    db.collection("users")
        .doc(uid)
        .collection("questions")
        .add({
            chat: JSON.parse(localStorage.getItem("userChat")),
            timestamp: timestamp,
            chatAPI: JSON.parse(localStorage.getItem("chatAPI"))
        })
        .then(() => {
            localStorage.removeItem("userChat");
            localStorage.removeItem("chatAPI");
        }).catch((error) => {
            console.error("Error updating user: ", error);
        });
}

// Function to get user chats
function getsUserChats() {
    let cardTemplate = document.getElementById("hikeCardTemplate");

    db.collection("users")
        .doc(uid)
        .collection("questions")
        .get()
        .then((allSessions) => {
            sessions = allSessions.docs;
            sessions.forEach((doc) => {
                let getChat = doc.data().chat;
                let sessionID = doc.id;

                let newcard = cardTemplate.content.cloneNode(true);
                newcard.querySelector('.question').innerHTML = getChat[0].question;
                newcard.querySelector('.answer').innerHTML = getChat[0].answer.substring(0, 100);
                newcard.querySelector('a').href = "viewchat.html?sessionID=" + sessionID;
                document.getElementById("hikes-go-here").appendChild(newcard);
            })
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}

// Function to view chat details
function viewChat() {
    let cardTemplate = document.getElementById("hikeCardTemplate");
    db.collection("users")
        .doc(uid)
        .collection("questions")
        .doc(sessionID)
        .get()
        .then((res) => {
            res.data().chat.forEach((data) => {
                let newcard = cardTemplate.content.cloneNode(true);
                newcard.querySelector('.question').innerHTML = data.question;
                newcard.querySelector('.answer').innerHTML = data.answer;
                newcard.querySelector('a').href = "ask.html?sessionID=" + sessionID;
                document.getElementById("hikes-go-here").appendChild(newcard);
            })
        })
}

// Function to edit chat
function editChat() {
    db.collection("users")
        .doc(uid)
        .collection("questions")
        .doc(sessionID)
        .get()
        .then((res) => {
            for (var i = 0; i < res.data().chatAPI.length; i++) {
                userChat.push(res.data().chatAPI[i]);
                if (chatHolder == undefined) {
                    chatHolder = "<br><p><i class='fa-solid fa-circle-user fa-2xl'></i>&nbsp;" + res.data().chatAPI[i].content + "</p>";
                } else {
                    chatHolder += "<p><i class='fa-solid fa-circle-user fa-2xl'></i>&nbsp;" + res.data().chatAPI[i].content + "</p>";
                }
            }
            for (var i = 0; i < res.data().chat.length; i++) {
                userChatDB.push(res.data().chat[i]);
            }
            document.getElementById("chat-goes-here").innerHTML = chatHolder;
        })
}

// Event listener to save chat data before page unload
window.addEventListener("beforeunload", function (event) {
    if ($(location).attr('pathname') == '/ask.html' && userChat.length > 0 && sessionID == null) {
        this.localStorage.setItem("userChat", JSON.stringify(userChatDB))
        this.localStorage.setItem("chatAPI", JSON.stringify(userChat))
    }
});

// Function to go back
function goBack() {
    window.history.back();
}

// Function to edit profile
function editProfile() {
    db.collection("users")
        .doc(uid)
        .get()
        .then((users) => {
            let name = users.data().name;
            let age = users.data().age;
            let occupation = users.data().occupation;
            document.getElementById("Name").value = name;
            document.getElementById("Age").value = age;
            document.getElementById("Occupation").value = occupation;
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}

// Function to submit profile changes
function submitProfile() {
    db.collection("users")
        .doc(uid)
        .update({
            name: document.getElementById("Name").value,
            age: document.getElementById("Age").value,
            occupation: document.getElementById("Occupation").value
        }).then(() => {
            $('#alert').show();
        }).catch((error) => {
            console.error("Error creating user: ", error);
            alert('Error creating user, check console')
        });
}
