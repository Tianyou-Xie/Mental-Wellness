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


// Function to retrieve emotion records from Firebase Firestore
function retrieveEmotionRecords() {
    const recordsContainer = document.getElementById('emotionRecords');

    // Clear previous data
    recordsContainer.innerHTML = '';

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
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
        }
    });
}

// Function to get the corresponding emotion text
function getEmotionText(value) {
    let emotionText = '';
    switch (value) {
        case 1:
            emotionText = 'Awful';
            break;
        case 2:
            emotionText = 'Sad';
            break;
        case 3:
            emotionText = 'Neutral';
            break;
        case 4:
            emotionText = 'Happy';
            break;
        case 5:
            emotionText = 'Great';
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
            iconClass = 'fa-face-sad-cry red';
            break;
        case 2:
            iconClass = 'fa-face-sad-tear orange';
            break;
        case 3:
            iconClass = 'fa-face-meh yellow';
            break;
        case 4:
            iconClass = 'fa-face-smile light-green';
            break;
        case 5:
            iconClass = 'fa-face-laugh-beam green';
            break;
        default:
            iconClass = '';
    }
    return `<i class="fa-regular ${iconClass} fa-3x"></i>`;
}

// Call function to retrieve and display emotion records
retrieveEmotionRecords();
