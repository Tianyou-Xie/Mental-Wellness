var isLogin = false;
var userName;
var uid;
var newUserStatus;
var userChat = [];
var userChatDB = [];
var chatHolder;
var getChat;
var sessionID;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        $('#authStatus').html('Logout');
        isLogin = true;
        uid = user.uid;
        userName = user.displayName;
        let params = new URL( window.location.href );
        sessionID = params.searchParams.get( "sessionID" );
        if ($(location).attr('pathname') == '/main.html') {
            document.getElementById("name-goes-here").innerHTML = userName;
            newUser()
        }
        if ($(location).attr('pathname') == '/profile.html') {
            getsUserChats();
        }
        if ($(location).attr('pathname') == '/viewchat.html') {
            viewChat();
        }
        if ($(location).attr('pathname') == '/ask.html' && sessionID != null) {
            editChat();
        }
        if (localStorage.getItem("userChat") != null) {
            saveChat();
        }
    } else {
        $('#authStatus').html('Login');
        $('#staticBackdrop').modal('show'); 
    }
});

function authStatus() {
    if (isLogin) {
        firebase.auth().signOut().then(() => {
            window.location.href = 'login.html';
        }).catch((error) => {
            console.log('nav log()', error)
        });
    } else {
        window.location.href = 'login.html';
    }
}

function newUser() {
    db.collection("users")
        .doc(uid)
        .get()
        .then((querySnapshot) => {
            if(!querySnapshot.empty) {
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

function startChat() {
    var value = document.getElementById("message").value;

    if(chatHolder != undefined){
        chatHolder += "<p>"+value+"</p>";
        document.getElementById("chat-goes-here").innerHTML = chatHolder;
    } else {
        document.getElementById("chat-goes-here").innerHTML = value;
    }
    chatHolder = undefined;
    document.getElementById("message").value = '';
    var url = "https://api.openai.com/v1/chat/completions";

    console.log(userChat)
    let userObj = {"role": "user", "content": value};
    userChat.push(userObj);
    var post = {
        "model": "gpt-3.5-turbo",
        "messages": userChat
    };

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
        let obj = {"role": "assistant", "content": sysRes};
        let objDB = {"question": value, "answer": sysRes};
        userChat.push(obj);
        userChatDB.push(objDB);
        for(var i=0; i < userChat.length; i++){
            if(chatHolder == undefined){
                chatHolder = "<p>"+userChat[i].content+"</p>";
            } else {
                chatHolder += "<p>"+userChat[i].content+"</p>";
            }
        }
        document.getElementById("chat-goes-here").innerHTML = chatHolder;
    }).catch((error) => {
        console.log(error)
        saveQuestion();
        document.getElementById("ai-chat-goes-here").innerHTML = "Error fetching result. Please try again"
    })

}

function saveQuestion() {
    var questions = db.collection("questions");
    var value = document.getElementById("message").value;
        questions.add({
            questions: value
        }).then(function () {
            console.log("Question Saved")
        }).catch(function (error) {
            console.error("Error creating user: ", error);
            alert('Error signing in, check console')
        });
}

function mainRedirect() {
    var Users = db.collection("users");
    Users.doc(uid)
        .update({ status: false, gender: 'male', occupation: 'student', age: 25 })
        .then(() => {
            window.location.reload();
        }).catch((error) => {
            console.error("Error updating user: ", error);
            alert('Error,check console')
        });
}

function loginRedirect() {
    window.location.href = 'login.html';
}

// function saveChat() {
//     console.log("sessionID1", sessionID)
//     var timestamp = firebase.firestore.FieldValue.serverTimestamp();
//     if(sessionID == null){
//         db.collection("users")
//             .doc(uid)
//             .collection("questions")
//             .add({
//                 chat: JSON.parse(localStorage.getItem("userChat")),
//                 timestamp: timestamp,
//                 chatAPI: JSON.parse(localStorage.getItem("chatAPI"))
//             })
//         .then(() => {
//             localStorage.removeItem("userChat");
//             localStorage.removeItem("chatAPI");
//         }).catch((error) => {
//             console.error("Error updating user: ", error);
//             alert("Error, check console");
//         });
//     } else {
//         db.collection("users")
//             .doc(uid)
//             .collection("questions")
//             .doc(sessionID)
//             .get()
//         .   then((querySnapshot) => {
//             if(!querySnapshot.empty) {
//                 db.collection("users")
//                     .doc(uid)
//                     .collection("questions")
//                     .doc(sessionID)
//                     .update({
//                         chat: JSON.parse(localStorage.getItem("userChat")),
//                         timestamp: timestamp,
//                         chatAPI: JSON.parse(localStorage.getItem("chatAPI"))
//                     })
//                 .then(() => {
//                     localStorage.removeItem("userChat");
//                 }).catch((error) => {
//                     console.error("Error updating user: ", error);
//                     alert("Error, check console");
//                 });
//             } else {
//                 console.log("debug")
//             }
//         })
//     }
// }

function saveChat(){
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
        alert("Error, check console");
    });
}

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

function editChat() {
    db.collection("users")
        .doc(uid)
        .collection("questions")
        .doc(sessionID)
        .get()
        .then((res) => {
            for(var i=0; i < res.data().chatAPI.length; i++){
                userChat.push(res.data().chatAPI[i]);
                if(chatHolder == undefined){
                    chatHolder = "<p>"+res.data().chatAPI[i].content+"</p>";
                } else {
                    chatHolder += "<p>"+res.data().chatAPI[i].content+"</p>";
                }
            }
            for(var i=0; i<res.data().chat.length; i++){
                userChatDB.push(res.data().chat[i]);
            }
            document.getElementById("chat-goes-here").innerHTML = chatHolder;
        })
}

window.addEventListener("beforeunload", function (event) {
    if ($(location).attr('pathname') == '/ask.html' && userChat.length > 0 && sessionID == null) {
        this.localStorage.setItem("userChat", JSON.stringify(userChatDB))
        this.localStorage.setItem("chatAPI", JSON.stringify(userChat))
    }
});


function goBack() {
    window.history.back();
  }