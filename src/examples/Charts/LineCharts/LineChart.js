import React from "react";
import ReactApexChart from "react-apexcharts";

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    const { lineChartData, lineChartOptions } = this.props;
    console.log("LineChart : %o", lineChartData);
    const series = [];

    data: [{
              x: new Date('2018-02-12').getTime(),
              y: 76
            }, {
              x: new Date('2018-02-12').getTime(),
              y: 76
    }]
    lineChartData.forEach(element => {
      console.log(element);
      
      const newarr= element.data.map((data,index) => {
        const d = {
          y: element.data[index],
          x: new Date(element.dateTime[index])
        }
        return d;
      });
      series.push({data : newarr, name: element.name});
    });
    console.log('SERIES: %o', series);

    this.setState({
      chartData: series,
      chartOptions: lineChartOptions,
    });
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type="area"
        width="100%"
        height="100%"
      />
    );
  }
}

export default LineChart;
