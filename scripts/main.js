// Define a variable to hold the current user's information
var currentUser;

// Function to update Firestore with user's emotion value
function updateFirestore(userId, value) {
    var timestamp = firebase.firestore.FieldValue.serverTimestamp();
    db.collection("users").doc(userId).collection("emotion").add({
        value: value,
        timestamp: timestamp
    }).then(function () {
        // console.log("Document successfully updated!");
    }).catch(function (error) {
        console.error("Error updating document: ", error);
    });
}

// Function to handle icon clicks and update Firestore with emotion value
function handleIconClick(value) {
    const user = auth.currentUser;
    if (user) {
        const userId = user.uid;
        updateFirestore(userId, value);
        document.getElementById("emotionIcons").style.display = "none";
        let sentimentText;
        switch (value) {
            case 1:
                sentimentText = "Feeling awful? Sorry to hear that...\nSelect the chat option below to start a chat!\nWe would love to hear from you!";
                break;
            case 2:
                sentimentText = "Feeling sad today?\nLets have chat about it!\nSelect the chat option below to get started!";
                break;
            case 3:
                sentimentText = "Just feeling neutral?\nLets try to make you feel better together!\nStart a chat and we can talk it out!";
                break;
            case 4:
                sentimentText = "Feeling happy today!\nLets talk about what made you happy today!\nStart a chat and let's get going!";
                break;
            case 5:
                sentimentText = "Wooooo! Feeling awesome today!\nLet me know whats making you feel this way!\nStart a chat and make me as happy as you!";
                break;
            default:
                sentimentText = "";
        }
        document.getElementById("sentimentDisplay").style.display = "block";
        document.getElementById("sentimentText").innerText = sentimentText;
    }
}

// Event listeners for each emotion icon click
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

// Function to read a quote from Firestore based on the day
function readQuote(day) {
    db.collection("quotes").doc(day).onSnapshot(doc => {
        document.getElementById("quote-goes-here").innerHTML = doc.data().quote;
    })
}

// Function to update date and time on the webpage
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