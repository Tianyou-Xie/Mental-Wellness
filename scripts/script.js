var isLogin = false;
var userName;
var uid;
var newUser;
var userChat = [];
var chatHolder;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        $('#authStatus').html('Logout');
        isLogin = true;
        if ($(location).attr('pathname') == '/main.html') {
            userName = user.displayName;
            uid = user.uid;
            document.getElementById("name-goes-here").innerHTML = userName;
        }
        newUser()
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
        .then((doc) => {
            if(!doc.empty && $(location).attr('pathname') == '/main.html') {
                newUser = doc.data().status
                let btn = document.getElementById("newuser");
                let emotion = document.getElementById("emotionIcons");
                let daystatus = document.getElementsByClassName("newuser")[0];
                if(newUser){
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
        userChat.push(obj);
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
        document.getElementById("chat-goes-here").innerHTML = "Error fetching result. Please try again or contact us"
    })

}

function mainRedirect() {
    db.collection("users")
        .doc(uid)
        .update({status: false, gender: 'male', occupation: 'student', age: 25})
    .then(() => {
        window.location.reload();
    }).catch((error) => {
        console.error("Error updating user: ", error);
        alert("Error, check console");
    });
}

function loginRedirect() {
    window.location.href = 'login.html';
}