const actions = [
    {
    name: 'pointStyle: circle (default)',
    handler: (chart) => {
      chart.data.datasets.forEach(dataset => {
        dataset.pointStyle = 'circle';
      });
      chart.update();
    }
  },
];
const DATA_COUNT = 6;
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };
const labels = ['Moday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const data = {
  labels: labels,
  datasets: [
    {
      label: 'Dataset',
      data: [12, 19, 3, 5, 2, 3, 9],
      // data: Samples.utils.numbers(NUMBER_CFG),
      // borderColor: Samples.utils.transparentize(255, 159, 64, 0.5),
      backgroundColor: [
        Samples.utils.transparentize(255, 99, 132, 0.5),
        Samples.utils.transparentize(255, 159, 64, 0.5),
        Samples.utils.transparentize(255, 205, 86, 0.5),
        Samples.utils.transparentize(75, 192, 192, 0.5),
        Samples.utils.transparentize(54, 162, 235, 0.5),
        Samples.utils.transparentize(135, 62, 35, 0.5),
        Samples.utils.transparentize(25, 18, 255, 0.5),
      ],
      borderColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(255, 159, 64, 0.5)',
        'rgba(255, 205, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(135, 62, 35, 0.5)',
        'rgba(25, 18, 255, 0.5)',
      ],
      pointStyle: 'circle',
      pointRadius: 10,
      pointHoverRadius: 15,
      borderWidth: 2,
    }
  ]
};
const data1 = {  
    datasets: [{  
        label: 'Dataset',  
        data: [
            {
                "x": "2024-03-26T21:31:32.338Z",
                "y": 3,
                "dayOfWeek": "Tuesday"
            },
            {
                "x": "2024-03-26T23:57:28.484Z",
                "y": 4,
                "dayOfWeek": "Tuesday"
            },
            {
                "x": "2024-03-28T21:56:45.840Z",
                "y": 3,
                "dayOfWeek": "Thursday"
            },
            {
                "x": "2024-03-30T15:16:18.391Z",
                "y": 2,
                "dayOfWeek": "Saturday"
            },
            {
                "x": "2024-04-02T00:46:54.973Z",
                "y": 3,
                "dayOfWeek": "Monday"
            }
        ],
        backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(255, 205, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(135, 62, 35, 0.5)',
            'rgba(25, 18, 255, 0.5)',
          ],
        borderColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(255, 205, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(135, 62, 35, 0.5)',
            'rgba(25, 18, 255, 0.5)',
          ],  
        tension: 0.1,  
        fill: false,
        pointStyle: 'circle',
        pointRadius: 5,
        pointHoverRadius: 15,
        borderWidth: 2,
    }]  
};
const config = {
  type: 'line',
  data: data,
  options: {
    scales: {
        x: {
            // reverse: true,   
            title: {
                display: true,
                text: 'Week',
                // color: 'rgba(255, 0, 0, 1)',
                font: {
                    size: 18,
                    // weight: 'bold',
                    lineHeight: 1.2,
                },
            },
            ticks: {
                stepSize: 2,
                // color: 'rgba(255, 0, 0, 1)'
            }
        },
        y: {
            // reverse: true,   
            title: {
                display: true,
                text: 'Emotions',
                // color: 'rgba(255, 0, 0, 1)',
                font: {
                    size: 18,
                    // weight: 'bold',
                    lineHeight: 1.2,
                },
            },
            ticks: {
                stepSize: 2,
                // color: 'rgba(255, 0, 0, 1)'
            }
        },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Emotional Damage Graph',
        font: {
            size: 30,
        }
      }
    }
  },
};
// var myChart = new Chart(document.getElementById('myChart'), config, data, actions);
var ctx = document.getElementById('myChart').getContext('2d');  
var chart = new Chart(ctx, {  
    type: 'line',  
    data: data1,  
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
                min: 1, 
                suggestedMax: 7, 
                maxTicksLimit: 1, 
                ticks: {  
                    stepSize: 1,  
                    beginAtZero: true, 
                    // callback: function(value, index, values) {  
                    //     return value === 6 ? '' : value;  
                    // }  
                },  
                title: {  
                    display: true,  
                    text: 'Emotion Record'
                }  
            }  
        }  
    }  
});  