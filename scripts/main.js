var currentUser;

function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            userName = user.displayName;
            document.getElementById("name-goes-here").innerText = userName;
        } else {
            // No user is signed in.
        }
    });
}
getNameFromAuth();

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
                sentimentText = "Feeling sad? Select the chat option below to start a chat! We would love to hear from you!";
                break;
            case 2:
                sentimentText = "Not feeling the greatest? Lets have chat about it! Select the chat option below to get started!";
                break;
            case 3:
                sentimentText = "One of those days? Lets try to make you feel better together! Start a chat and we can talk it out!";
                break;
            case 4:
                sentimentText = "Feeling good today! Lets talk about what made you happy today! Start a chat and let's get going!";
                break;
            case 5:
                sentimentText = "Wooooo! Feeling great today! Let me know whats making you feel this way! Start a chat and make me as happy as you!";
                break;
            default:
                sentimentText = "";
        }
        document.getElementById("sentimentText").innerText = sentimentText;

        db.collection("quotes").doc("tuesday").get().then((doc) => {
            if (doc.exists) {
                document.getElementById("quoteText").innerText = doc.data().quote;
            } else {
                // console.log("No such document!");
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

function readQuote(day) {
    db.collection("quotes").doc(day).onSnapshot(doc => {
        document.getElementById("quote-goes-here").innerHTML = doc.data().quote;
    })
}

const d = new Date();
// document.getElementById("demo").innerHTML = d;
console.log(d)

function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            const weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
            const d = new Date();
            let day = weekday[d.getDay()];
            readQuote(day);
        } else {
            window.location.href = "login.html";
        }
    });
}
// doAll();

