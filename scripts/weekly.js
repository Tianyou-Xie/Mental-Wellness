document.addEventListener('DOMContentLoaded', function() {
    retrieveEmotionRecords();
});

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
                    console.log(emotionData);
                    createChart(emotionData);
                    
                })
                .catch((error) => {
                    console.error("Error retrieving emotion records: ", error);
                });
        } else {
            console.log("No user is signed in");
        }
    });
}

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
                fill: false  
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
                    suggestedMax: 6, 
                    maxTicksLimit: 6, 
                    ticks: {  
                        stepSize: 1,  
                        beginAtZero: true, 
                        callback: function(value, index, values) {  
                            return value === 6 ? '' : value;  
                        }  
                    },  
                    title: {  
                        display: true,  
                        text: 'Emotion Record'
                    }  
                }  
            }  
        }  
    });  
}
