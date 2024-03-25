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

    // Fetch emotion records from Firestore
    db.collection("users").doc("33LzdNzXc3gvvupfJDVXEgVaWUg2").collection("emotion")
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
                    dayLabel = 'Today';
                } else if (isYesterday(timestamp)) {
                    dayLabel = 'Yesterday';
                } else {
                    dayLabel = formatDate(timestamp);
                }

                // Create HTML elements for record
                if (dayLabel !== currentDay) {
                    currentDay = dayLabel;
                    const dayHeader = document.createElement('h2');
                    dayHeader.textContent = dayLabel;
                    recordsContainer.appendChild(dayHeader);
                }

                const recordItem = document.createElement('div');
                recordItem.innerHTML = `${formattedTimestamp}\t${getEmotionText(emotionValue)}`;
                recordsContainer.appendChild(recordItem);
            });
        })
        .catch((error) => {
            console.error("Error retrieving emotion records: ", error);
        });
}

// Function to get the corresponding emotion text with icon
function getEmotionText(value) {
    let emotionText = '';
    let iconClass = '';
    switch (value) {
        case 1:
            emotionText = 'Very Sad';
            iconClass = 'fa-face-sad-cry';
            break;
        case 2:
            emotionText = 'Sad';
            iconClass = 'fa-face-sad-tear';
            break;
        case 3:
            emotionText = 'Normal';
            iconClass = 'fa-face-meh';
            break;
        case 4:
            emotionText = 'Happy';
            iconClass = 'fa-face-smile';
            break;
        case 5:
            emotionText = 'Very Happy';
            iconClass = 'fa-face-laugh-beam';
            break;
        default:
            emotionText = '';
            iconClass = '';
    }
    return `&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<span>${emotionText}</span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<i class="fa-regular ${iconClass} fa-3x"></i><br><br>`;
}

// Call function to retrieve and display emotion records
retrieveEmotionRecords();
