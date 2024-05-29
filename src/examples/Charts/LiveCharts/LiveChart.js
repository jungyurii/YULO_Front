import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const LiveChart = ({ graphURL, lineChartData, lineChartOptions }) => {
  const [chartData, setChartData] = useState(lineChartData);
  const [chartOptions, setChartOptions] = useState(lineChartOptions);

  useEffect(() => {
    console.log("그래프 리 렌더링");
    console.log(graphURL);
    const interval = setInterval(fetchUrl, 5000); // 5초마다 URL 가져오기

    // 컴포넌트가 마운트되었을 때 한 번 데이터를 가져옴
    fetchUrl();

    return () => clearInterval(interval);
  }, [graphURL]);

  const fetchUrl = () => {
    axios
      .get(graphURL)
      .then((response) => {
        console.log(response.data);
        
        
      
        setChartData(prevData => {
          const newDataPoint = response.data[0].data; 
          console.log("prevData : ", prevData);
          return [{
          ...prevData[0],
          data: [...prevData[0].data, newDataPoint]
          }]
        });
        
        //const newCategoriPoint = response.data[0].name;
        // setChartOptions(prevOptions => {
        //   // 기존의 옵션을 복사하여 새로운 객체 생성
        //   const newOptions = { ...prevOptions };
        //   console.log("prevOptions : ", prevOptions);
        //   // xaxis의 categories를 빈 문자열로 설정
        //   newOptions.xaxis.categories.push(newCategoriPoint);
        
        //   // 변경된 옵션 반환
        //   return newOptions;
        // });
        // console.log('chartData : ', chartData);
      })
      .catch((error) => {
        console.log("Error: ", error);
        console.log(graphURL);
      });
  };

  return (
    <ReactApexChart
      options={chartOptions}
      series={chartData}
      type="area"
      width="100%"
      height="90%"
    />
  );
};

export default LiveChart;
