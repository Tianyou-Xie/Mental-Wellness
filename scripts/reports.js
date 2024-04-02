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
var myChart = new Chart(document.getElementById('myChart'), config, data, actions);