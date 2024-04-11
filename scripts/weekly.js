// Execute the function to retrieve emotion records when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    retrieveEmotionRecords();
});

// Function to retrieve emotion records from Firestore
function retrieveEmotionRecords() {
    const now = new Date();
    const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);

    // Fetch emotion records from Firestore
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            const userId = user.uid;
            db.collection("users").doc(userId).collection("emotion")
                .where("timestamp", ">=", sevenDaysAgo)
                .orderBy("timestamp", "asc")
                .get()
                .then((querySnapshot) => {
                    // Convert Firestore data to suitable format for chart
                    const emotionData = [];
                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        const timestamp = data.timestamp.toDate();
                        const dayOfWeek = timestamp.toLocaleString('default', { weekday: 'long' });
                        const emotionValue = data.value;
                        emotionData.push({ x: timestamp, y: emotionValue, dayOfWeek: dayOfWeek });
                    });
                    var canvas = document.getElementById('emotionChart');
                    if (canvas) {
                        // Check if there's an existing chart attached to the canvas
                        var existingChart = Chart.getChart(canvas);
                        if (existingChart) {
                            // Destroy the existing chart
                            existingChart.destroy();
                        }
                    }
                    // console.log(emotionData);
                    createChart(emotionData);

                })
                .catch((error) => {
                    console.error("Error retrieving emotion records: ", error);
                });
        }
    });
}

// Function to create a chart using Chart.js library
function createChart(emotionData) {
    var ctx = document.getElementById('emotionChart').getContext('2d');

    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Emotion Record',
                data: emotionData,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                fill: false,
                pointStyle: 'circle',
                pointRadius: 5,
                pointHoverRadius: 15,
                borderWidth: 1,
                backgroundColor: emotionData.map(point => {
                    // Assign color based on emotion value
                    switch (point.y) {
                        case 1:
                            return 'red';
                        case 2:
                            return 'orange';
                        case 3:
                            return 'yellow';
                        case 4:
                            return 'rgb(42, 198, 42)';
                        case 5:
                            return 'green';
                        default:
                            return 'black'; // Default color
                    }
                })
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    },
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    min: 0,
                    max: 6,
                    maxTicksLimit: 6,
                    ticks: {
                        stepSize: 1,
                        beginAtZero: true,
                        callback: function (value, index, values) {
                            // Return the emotion word for each y-axis label except for 0 and 6
                            if (value !== 0 && value !== 6) {
                                return toEmotionWord(value);
                            }
                            return '';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Emotion'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        // Customize tooltip label to show emotion word
                        label: function (context) {
                            var emotionValue = context.parsed.y;
                            return 'Emotion: ' + toEmotionWord(emotionValue);
                        }
                    }
                }
            }
        }
    });
}

// Function to convert numeric emotion value to emotion word
function toEmotionWord(value) {
    switch (value) {
        case 1:
            return "Awful";
        case 2:
            return "Sad";
        case 3:
            return "Neutral";
        case 4:
            return "Happy";
        case 5:
            return "Great";
        default:
            return value;
    }
}