import React from "react";
import ReactApexChart from "react-apexcharts";


class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: []
      ,
      options: {
        chart: {
          type: 'area',
          height: 350,
          zoom: {
            autoScaleYaxis: true
          }
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
          style: 'hollow',
        },
        xaxis: {
          type: 'datetime',
          min: new Date('27 May 2024').getTime(),
          tickAmount: 1,
        },
        tooltip: {
          x: {
            format: 'dd MMM yyyy'
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
      },
    
    
      // selection: 'one_day',
    
    };
  }
  componentDidMount() {

    const { lineChartData } = this.props;
    const series = [];
  
    lineChartData.forEach(element => {
      console.log(element);
  
      const newarr = element.data.map((data, index) => {
        const d = [
          new Date(element.dateTime[index]).getTime(), element.data[index]
        ]
        return d;
      });
      series.push({ data: newarr, name: element.name });
    });
    console.log('SERIES: %o', series);
  
    // const updatedOptions = { ...this.state.options };
    // updatedOptions.xaxis.min = new Date('27 May 2024').getTime();
  
    this.setState({
      series: series,
    });
  }

  // updateData(timeline) {
  //   this.setState({
  //     selection: timeline
  //   }, () => {
  //     switch (timeline) {
  //       case 'one_month':
  //         ApexCharts.exec(
  //           'area-datetime',
  //           'zoomX',
  //           new Date('26 May 2024').getTime(),
  //           new Date('27 May 2024').getTime()
  //         )
  //         break;
  //       // 나머지 case들도 같은 방식으로 처리
  //       default:
  //     }
  //   });
  // }


  render() {
    return (
    <ReactApexChart 
      options={this.state.options} 
      series={this.state.series} 
      type="area" 
      height={300} 
    />
  );
  }
}

export default ApexChart;