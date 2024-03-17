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