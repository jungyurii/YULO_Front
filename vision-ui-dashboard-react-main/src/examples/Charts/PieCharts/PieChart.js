import colors from "assets/theme/base/colors";
import React from "react";
import ReactApexChart from "react-apexcharts";

class PieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      chartDate: [],
      options: {
        chart: {
          type: 'donut',
        },
        labels: [],
        legend: {
          labels: {
            colors: "#FFFFFF",
          },
          fontSize: '12px',
          fontWeight: 600,
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
        }],
        plotOptions: {
          pie: {
            donut: {
              size: '35%'
            },
            customScale: 1.0
          }
        },
        
      },
    };
  }

  componentDidMount() {
    const {pieChartData, label} = this.props;
    console.log('pieChartData : ',pieChartData);
    console.log('label : ',label);
    this.setState({
      chartDate: pieChartData,
      options: {
        labels: label
      }
    });
  }



  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart 
            options={this.state.options} 
            series={this.state.chartDate} type="donut" 
            width="150%"
            height="180%"/>
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default PieChart;