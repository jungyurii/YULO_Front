import React from "react";
import ReactApexChart from "react-apexcharts";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 3 * 60 * 1000); // 5분 전의 시간을 계산
    this.state = {
      series: [],
      options: {
        chart: {
          type: 'area',
          height: 350,
          zoom: {
            autoScaleYaxis: true
          }
        },
        dataLabels: {
          enabled: true,
        },
        markers: {
          size: 0,
          style: 'hollow',
        },
        xaxis: {
          type: 'datetime',
          min: fiveMinutesAgo.getTime(),
          max: now.getTime(),
          tickAmount: 1,
          labels: {
            show: true,
            style: {
              colors: "#fff",
              fontSize: "10px",
              fontFamily: "Plus Jakarta Display",
            },
          },
        },
        yaxis: {
          show: true,
          labels: {
            show: true,
            style: {
              colors: "#fff",
              fontSize: "10px",
              fontFamily: "Plus Jakarta Display",
            },
          },
        },
        tooltip: {
          x: {
            format: 'yyyy MMM dd hh:mm:ss'
          },
          theme: "dark",
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: "dark",
            type: "vertical",
            shadeIntensity: 0,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 0.8,
            opacityTo: 0,
            stops: [],
          },
        },
        legend: {
          labels: {
            colors: "#FFFFFF",
          },
          fontSize: '12px',
          fontWeight: 600,
        },
      },
    };
  }

  componentDidMount() {
    this.updateSeries(this.props.lineChartData);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.newGraphData !== this.props.newGraphData) {
      this.updateSeries(this.props.newGraphData, true);
    }
  }

  updateSeries = (data, append = false) => {
    const newSeries = data.map(element => {
      const newarr = element.data.map((data, index) => {
        const d = [new Date(element.dateTime[index]).getTime(), element.data[index]];
        return d;
      });
      return { data: newarr, name: element.name };
    });

    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000); // 5분 전의 시간을 계산

    if (append) {
      this.setState(prevState => {
        const updatedSeries = prevState.series.map(existingSeries => {
          const match = newSeries.find(newS => newS.name === existingSeries.name);
          if (match) {
            return {
              ...existingSeries,
              data: [...existingSeries.data, ...match.data].filter((item, index, self) =>
                index === self.findIndex((t) => (
                  t[0] === item[0] && t[1] === item[1]
                ))
              ) // 중복 데이터 제거
            };
          }
          return existingSeries;
        });

        const nonMatchedSeries = newSeries.filter(newS => !prevState.series.some(existingSeries => existingSeries.name === newS.name));

        return {
          series: [...updatedSeries, ...nonMatchedSeries],
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.options.xaxis,
              min: fiveMinutesAgo.getTime(),
              max: now.getTime(),
            },
          },
        };
      });
    } else {
      this.setState({
        series: newSeries,
        options: {
          ...this.state.options,
          xaxis: {
            ...this.state.options.xaxis,
            min: fiveMinutesAgo.getTime(),
            max: now.getTime(),
          },
        },
      });
    }
  }

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
