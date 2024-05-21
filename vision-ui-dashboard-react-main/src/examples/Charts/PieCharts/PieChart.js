import React from "react";
import ReactApexChart from "react-apexcharts";

class PieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    
      series: [44, 55, 41, 17, 15],
      options: {
        chart: {
          type: 'donut',
        },
        plotOptions: {
          pie: {
            donut: {
              size: '35%'
            },
            customScale: 1.0
          }
        },
        responsive: [{
          breakpoint: 500,
          options: {
            chart: {
              width: 500
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
    
    
    };
  }



  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart 
            options={this.state.options} 
            series={this.state.series} type="donut" 
            width="100%"
            height="150%"/>
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default PieChart;