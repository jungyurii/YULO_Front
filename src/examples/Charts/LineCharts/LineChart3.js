import React from "react";
import ReactApexChart from "react-apexcharts";
import ApexCharts, { lastDate, data, XAXISRANGE, getNewSeries } from "apexcharts";

class ApexChart3 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    
      series: [{
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148,10, 41, 35, 51, 49, 62, 69, 91, 148,10, 41, 35, 51, 49, 62, 69, 91, 148,10, 41, 35, 51, 49, 62, 69, 91, 148,10, 41, 35, 51, 49, 62, 69, 91, 148].slice(1,5)
      }],
      options: {
        chart: {
          id: 'realtime',
          height: 350,
          type: 'line',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000
            }
          },
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: 'Dynamic Updating Chart',
          align: 'left'
        },
        markers: {
          size: 0
        },
        xaxis: {
          type: 'datetime',
        },
        yaxis: {
          max: 100
        },
        legend: {
          show: false
        },
      },
    
    
    };
  }


  componentDidMount() {
    // window.setInterval(() => {
    //   getNewSeries(lastDate, {
    //     min: 10,
    //     max: 90
    //   })
      
    //   ApexCharts.exec('realtime', 'updateSeries', [{
    //     data: data
    //   }])
    // }, 1000)
  }


  render() {
    return (
          <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
    );
  }
}

export default ApexChart3;