var currentUser;

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
                sentimentText = "Feeling awful? Select the chat option below to start a chat! We would love to hear from you!";
                break;
            case 2:
                sentimentText = "Feeling sad today? Lets have chat about it! Select the chat option below to get started!";
                break;
            case 3:
                sentimentText = "Just feeling neutral? Lets try to make you feel better together! Start a chat and we can talk it out!";
                break;
            case 4:
                sentimentText = "Feeling happy today! Lets talk about what made you happy today! Start a chat and let's get going!";
                break;
            case 5:
                sentimentText = "Wooooo! Feeling awesome today! Let me know whats making you feel this way! Start a chat and make me as happy as you!";
                break;
            default:
                sentimentText = "";
        }
        document.getElementById("sentimentDisplay").style.display = "block";
        document.getElementById("sentimentText").innerText = sentimentText;
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

function updateDateTime() {
    const now = new Date();
    const dayNumber = now.getDay();
    const hours = now.getHours();
    const min = now.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';

    switch (dayNumber) {
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
        case 5:
            day = "Sunday";
            break;
        default:
            day = "Not Valid Day";
    }

    document.querySelector('#daytime').textContent = day + ", " + hours + ":" + min + " " + ampm;
  }

// setInterval(updateDateTime, 1000);