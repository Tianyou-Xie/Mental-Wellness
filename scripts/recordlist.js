// Function to format timestamp
function formatTimestamp(timestamp) {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Function to format date
function formatDate(timestamp) {
    return timestamp.toLocaleDateString();
}

// Function to check if a given timestamp is today
function isToday(timestamp) {
    const today = new Date();
    return timestamp.toDateString() === today.toDateString();
}

// Function to check if a given timestamp is yesterday
function isYesterday(timestamp) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return timestamp.toDateString() === yesterday.toDateString();
}

// Version 01
// Function to retrieve emotion records from Firebase Firestore
// function retrieveEmotionRecords() {
//     const recordsContainer = document.getElementById('emotionRecords');

//     // Clear previous data
//     recordsContainer.innerHTML = '';

//     firebase.auth().onAuthStateChanged(user => {
//         if (user) {
//             console.log(user.uid); //print the uid in the browser console
//             // Fetch emotion records from Firestore
//             db.collection("users").doc(user.uid).collection("emotion")
//                 .orderBy("timestamp", "desc")
//                 .get()
//                 .then((querySnapshot) => {
//                     let currentDay = null;

//                     querySnapshot.forEach((doc) => {
//                         const data = doc.data();
//                         const timestamp = data.timestamp.toDate();
//                         const emotionValue = data.value;

//                         // Format timestamp
//                         const formattedTimestamp = formatTimestamp(timestamp);

//                         // Determine day label
//                         let dayLabel = '';
//                         if (isToday(timestamp)) {
//                             dayLabel = 'Today';
//                         } else if (isYesterday(timestamp)) {
//                             dayLabel = 'Yesterday';
//                         } else {
//                             dayLabel = formatDate(timestamp);
//                         }

//                         // Create HTML elements for record
//                         if (dayLabel !== currentDay) {
//                             currentDay = dayLabel;
//                             const dayHeader = document.createElement('h2');
//                             dayHeader.textContent = dayLabel;
//                             recordsContainer.appendChild(dayHeader);
//                         }

//                         const recordItem = document.createElement('div');
//                         recordItem.innerHTML = `${formattedTimestamp}\t${getEmotionText(emotionValue)}`;
//                         recordsContainer.appendChild(recordItem);
//                     });
//                 })
//                 .catch((error) => {
//                     console.error("Error retrieving emotion records: ", error);
//                 });
//         } else {
//             // No user is signed in.
//             console.log("No user is signed in");
//             window.location.href = "login.html";
//         }
//     });
// }

// // Function to get the corresponding emotion text with icon
// function getEmotionText(value) {
//     let emotionText = '';
//     let iconClass = '';
//     switch (value) {
//         case 1:
//             emotionText = 'Very Sad';
//             iconClass = 'fa-face-sad-cry';
//             break;
//         case 2:
//             emotionText = 'Sad';
//             iconClass = 'fa-face-sad-tear';
//             break;
//         case 3:
//             emotionText = 'Normal';
//             iconClass = 'fa-face-meh';
//             break;
//         case 4:
//             emotionText = 'Happy';
//             iconClass = 'fa-face-smile';
//             break;
//         case 5:
//             emotionText = 'Very Happy';
//             iconClass = 'fa-face-laugh-beam';
//             break;
//         default:
//             emotionText = '';
//             iconClass = '';
//     }
//     return `&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<span>${emotionText}</span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<i class="fa-regular ${iconClass} fa-3x"></i><br><br>`;
// }

// // Call function to retrieve and display emotion records
// retrieveEmotionRecords();

// Function to retrieve emotion records from Firebase Firestore
function retrieveEmotionRecords() {
    const recordsContainer = document.getElementById('emotionRecords');

    // Clear previous data
    recordsContainer.innerHTML = '';

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // console.log(user.uid); //print the uid in the browser console
            // Fetch emotion records from Firestore
            db.collection("users").doc(user.uid).collection("emotion")
                .orderBy("timestamp", "desc")
                .get()
                .then((querySnapshot) => {
                    let currentDay = null;

                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        const timestamp = data.timestamp.toDate();
                        const emotionValue = data.value;

                        // Format timestamp
                        const formattedTimestamp = formatTimestamp(timestamp);

                        // Determine day label
                        let dayLabel = '';
                        if (isToday(timestamp)) {
                            dayLabel = '<strong>Today</strong>';
                        } else if (isYesterday(timestamp)) {
                            dayLabel = '<strong>Yesterday</strong>';
                        } else {
                            dayLabel = '<strong>' + formatDate(timestamp) + '</strong>';
                        }

                        // Create HTML elements for record
                        if (dayLabel !== currentDay) {
                            currentDay = dayLabel;

                            // Add a blank line between days
                            const blankRow = document.createElement('tr');
                            blankRow.innerHTML = `<td colspan="3">&nbsp;</td>`;
                            recordsContainer.appendChild(blankRow);
                            // Create a new table row for the day label
                            const dayRow = document.createElement('tr');
                            dayRow.innerHTML = `<td colspan="3" style="text-align: center; padding-top: 10px; padding-bottom: 10px;">${dayLabel}</td>`;
                            recordsContainer.appendChild(dayRow);
                        }

                        // Create a new table row for the emotion record
                        const recordRow = document.createElement('tr');
                        recordRow.innerHTML = `
                            <td style="text-align: left; vertical-align: middle; padding-top: 10px; padding-bottom: 10px; padding-right: 10px;">${formattedTimestamp}</td>
                            <td style="text-align: center; vertical-align: middle; padding-top: 10px; padding-bottom: 10px; padding-right: 10px; padding-left: 10px;">${getEmotionText(emotionValue)}</td>
                            <td style="text-align: right; vertical-align: middle; padding-top: 10px; padding-bottom: 10px; padding-left: 10px;">${getEmotionIcon(emotionValue)}</td>
                        `;
                        recordsContainer.appendChild(recordRow);
                    });
                })
                .catch((error) => {
                    console.error("Error retrieving emotion records: ", error);
                });
        } else {
            // No user is signed in.
            // console.log("No user is signed in");
            window.location.href = "login.html";
        }
    });
}

// Function to get the corresponding emotion text
function getEmotionText(value) {
    let emotionText = '';
    switch (value) {
        case 1:
            emotionText = 'Very Sad';
            break;
        case 2:
            emotionText = 'Sad';
            break;
        case 3:
            emotionText = 'Normal';
            break;
        case 4:
            emotionText = 'Happy';
            break;
        case 5:
            emotionText = 'Very Happy';
            break;
        default:
            emotionText = '';
    }
    return emotionText;
}

// Function to get the corresponding emotion icon
function getEmotionIcon(value) {
    let iconClass = '';
    switch (value) {
        case 1:
            iconClass = 'fa-face-sad-cry';
            break;
        case 2:
            iconClass = 'fa-face-sad-tear';
            break;
        case 3:
            iconClass = 'fa-face-meh';
            break;
        case 4:
            iconClass = 'fa-face-smile';
            break;
        case 5:
            iconClass = 'fa-face-laugh-beam';
            break;
        default:
            iconClass = '';
    }
    return `<i class="fa-regular ${iconClass} fa-3x"></i>`;
}

// Call function to retrieve and display emotion records
retrieveEmotionRecords();
