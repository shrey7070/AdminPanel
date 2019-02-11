(function($) {
  'use strict';
  $(function() {
    if ($("#earning-chart").length) {
      Chart.defaults.global.legend.labels.usePointStyle = true;
      var ctx = document.getElementById('earning-chart').getContext("2d");

      var gradientStrokeLine = ctx.createLinearGradient(500, 0, 100, 0);
      gradientStrokeLine.addColorStop(0, 'rgba(0, 133, 255, .7)');
      gradientStrokeLine.addColorStop(1, 'rgba(53,35,192,.5)');

      var gradientStrokeFill = ctx.createLinearGradient(500, 0, 100, 0);
      gradientStrokeFill.addColorStop(0, 'rgba(0, 133, 255, .2)');
      gradientStrokeFill.addColorStop(1, 'rgba(53,35,192,.2)');

      var earningChartData = {
        datasets: [{
          label: "Data",
            borderColor: gradientStrokeLine,
            fill: true,
            backgroundColor: gradientStrokeFill,
            borderWidth: 4,
            data: [20, 50, 30, 50, 40, 85, 60]
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"]
      };
      var earningChartOptions = {
        responsive: true,
        animation: {
          animateScale: true,
          animateRotate: true
        },
        legend: false,
        elements: { 
          point: { 
            radius: 0 
          } 
        },
        scales: {
          xAxes: [{
            gridLines: {
              color: 'rgba(0, 0, 0, .02)'
            },
          }],
          yAxes: [{
            gridLines: {
              color: 'rgba(255, 255, 255, 0)'             
            }
          }]
        }
      };
      var earningChartCanvas = $("#earning-chart").get(0).getContext("2d");
      var earningChart = new Chart(earningChartCanvas, {
        type: 'line',
        data: earningChartData,
        options: earningChartOptions
      });
    }
  });
})(jQuery);