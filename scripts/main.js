function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayName);  //print the user name in the browser console
            userName = user.displayName;

            //method #1:  insert with JS
            document.getElementById("name-goes-here").innerText = userName;

            //method #2:  insert using jquery
            //$("#name-goes-here").text(userName); //using jquery

            //method #3:  insert using querySelector
            //document.querySelector("#name-goes-here").innerText = userName

        } else {
            // No user is signed in.
            console.log("No user is logged in");
        }
    });
}
getNameFromAuth(); //run the function

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
                sentimentText = "Oh you are feeling sad today, Would you like to talk it?";
                break;
            case 2:
                sentimentText = "You are feeling sad today, What happened? I'd love to hear from you!";
                break;
            case 3:
                sentimentText = "It seems to be one of those days, lets talk about you!";
                break;
            case 4:
                sentimentText = "You are happy today. Do you want to share with me?";
                break;
            case 5:
                sentimentText = "You are very happy today! I am so happy to hear that!";
                break;
            default:
                sentimentText = "";
        }
        document.getElementById("sentimentText").innerText = sentimentText;

        db.collection("quotes").doc("tuesday").get().then((doc) => {
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


// displays the quote based in input param string "tuesday", "monday", etc. 
function readQuote(day) {
    db.collection("quotes").doc(day).onSnapshot(doc => {
        console.log("inside");
        console.log(doc.data());
        document.getElementById("quote-goes-here").innerHTML = doc.data().quote;
    })
}
// Comment out the next line (we will call this function from doAll())
// readQuote("tuesday");       

//Global variable pointing to the current user's Firestore document
var currentUser;

//Function that calls everything needed for the main page  
function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid); //global
            console.log(currentUser);

            // figure out what day of the week it is today
            const weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
            const d = new Date();
            let day = weekday[d.getDay()];

            // the following functions are always called when someone is logged in
            readQuote(day);
        } else {
            // No user is signed in.
            console.log("No user is signed in");
            window.location.href = "login.html";
        }
    });
}
doAll();

