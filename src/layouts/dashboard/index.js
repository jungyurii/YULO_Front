// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Box, Card, CircularProgress, LinearProgress, Stack } from "@mui/material";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import linearGradient from "assets/theme/functions/linearGradient";

// Vision UI Dashboard React base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

// Dashboard layout components
import WelcomeMark from "layouts/dashboard/components/WelcomeMark";
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrderOverview";
import SatisfactionRate from "layouts/dashboard/components/SatisfactionRate";
import ReferralTracking from "layouts/dashboard/components/ReferralTracking";

// React icons
import { IoIosRocket } from "react-icons/io";
import { IoGlobe } from "react-icons/io5";
import { IoCamera } from "react-icons/io5";
import { IoVideocam } from "react-icons/io5";
import { IoBuild } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { IoDocument } from "react-icons/io5";

// Data
import LineChart from "examples/Charts/LineCharts/LineChart";
import BarChart from "examples/Charts/BarCharts/BarChart";
import { lineChartDataDashboard } from "layouts/dashboard/data/lineChartData";
import { lineChartOptionsDashboard } from "layouts/dashboard/data/lineChartOptions";
import { barChartDataDashboard } from "layouts/dashboard/data/barChartData";
import { barChartOptionsDashboard } from "layouts/dashboard/data/barChartOptions";
import PieChart from "examples/Charts/PieCharts/PieChart";
import { useEffect, useState } from "react";
import axios from "axios";
import { Margin } from "@mui/icons-material";
import AddCamera from "./components/AddCamera";
import MaxWidthDialog from "./components/AddCamera";
import ApexChart from "examples/Charts/LineCharts/LineChart2";

function Dashboard() {
  const { gradients } = colors;
  const { cardContent } = gradients;

  const [camerasDetected, setCamerasDetected] = useState([]);
  const [total, setTotal] = useState('0');
  const [cameraRank, setCameraRank] = useState([]);
  const [modelInfo, setModelInfo] = useState([]);
  const [recentDetectedList, setRecentDetectedList] = useState([]);
  const [cameraSetting, setCameraSetting] = useState([]);
  const [graphData, setGraphData] = useState([]);
  

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    
    Promise.all([
      axios.post("http://127.0.0.1:8080/camera/cameraName", { userId: 1 }),
      axios.post("http://127.0.0.1:8080/camera/cameraRanking", { userId: 1 }),
      axios.post("http://127.0.0.1:8080/model/allInfoGet"),
      axios.post("http://127.0.0.1:8080/detection/detections", { userId: 1}),
      axios.post("http://127.0.0.1:8080/camera/cameraSetting", { userId: 1 }),
      axios.post("http://127.0.0.1:8080/graph/graphList", { userId: 1 })
    ])
    .then(responses => {
      const [cameraNameResponse, cameraRankResponse, allModelInfoResponse, recentDetectedListResponse, cameraSettingResponse, graphDataResponse] = responses;

      console.log('cameraNameResponse : ',cameraNameResponse.data.result.data);
      console.log('cameraRankResponse : ',cameraRankResponse.data.result.data);
      console.log('allModelInfoResponse : ',allModelInfoResponse.data.result.data);
      console.log('allModelInfoResponse : ',allModelInfoResponse.data.result.data);
      console.log('recentDetectedListResponse : ',recentDetectedListResponse.data.result.data);
      console.log('cameraSettingResponse : ', cameraSettingResponse.data.result.data);
      console.log('graphDataResponse : ', graphDataResponse.data.result.data);

      const entries = Object.entries(cameraNameResponse.data.result.data).sort((data1, data2) => data2[0] - data1[0]);
      const lastEntry = entries.pop();

      setCamerasDetected(entries); 
      setTotal(lastEntry[1]);
      setModelInfo(allModelInfoResponse.data.result.data);
      setRecentDetectedList(recentDetectedListResponse.data.result.data);
      setCameraSetting(cameraSettingResponse.data.result.data);
      setCameraRank(Object.entries(cameraRankResponse.data.result.data).sort((data1, data2) => data2[1] - data1[1]));
      setGraphData(graphDataResponse.data.result.data);
    })
    .catch(error => {
      console.log("Error : ", error);
    })

    // const eventSource = new EventSource('http://127.0.0.1:8080/api/notification/sse/notifications', {
    //   userId: 1
    // });
    // console.log("EventSource: ", eventSource);
    // eventSource.addEventListener("onmessage", (event) => {
    //   const data = JSON.parse(event.data);
    //   console.log("Data : %o", data);
    //   setNotification(data.message);
    // });

    // return () => {
    //   eventSource.close();
    // };

  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3} style={{ overflowX: 'visible' }}>
          <Grid container spacing={3} sx={{width: '170%'}} style={{ overflowX: 'visible' }}>
            <Grid item xs={12} md={6} xl={2}>
              <MiniStatisticsCard
                title={{ text: "today's total detected", fontWeight: "bold" }}
                count={total}
                percentage={{ color: "success", text: "+55%" }} // 전날 대비 변화량
                icon={{ color: "info", component: <IoDocument size="22px" color="white" /> }}
              />
            </Grid>
            {
              Object.entries(camerasDetected).map(([index, data]) => (
                <Grid item xs={12} md={6} xl={1} key={index}>
                  <MiniStatisticsCard
                    title={{ text: data[0] }}
                    count={data[1]}
                    percentage={{ color: "success", text: "+3%" }}
                    icon={{ color: "info", component: <IoVideocam size="22px" color="white" /> }}
                  />
                </Grid>
              ))
            }
          </Grid>
        </VuiBox>
        <VuiBox mb={3} style={{ overflowX: 'visible' }}>
          <Grid container spacing="18px" sx={{width: '300%'}} style={{ overflowX: 'visible' }}>
            {
              Object.entries(cameraSetting).map(([index, data]) => (
                <Grid item xs={12} lg={6} xl={2} key={index}>
                  <WelcomeMark data={data}/>
                </Grid>
              ))
            }
            <Grid item xs={12} lg={6} xl={1}>
              <MaxWidthDialog />
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6} xl={7}>
              <Card>
                <VuiBox sx={{ height: "100%" }}>
                  <VuiTypography variant="h4" color="white" fontWeight="bold" mb="5px">
                    검출 변화량 그래프
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="10px">
                    <VuiTypography variant="button" color="success" fontWeight="bold">
                      +5% more{" "}
                      <VuiTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox sx={{ height: "350px" }}>
                  {
                    graphData.length > 0 && (
                      // <LineChart
                      //   lineChartData={graphData}
                      //   lineChartOptions={lineChartOptionsDashboard}
                      // />
                      <ApexChart lineChartData={graphData}/>
                    )
                  }
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6} xl={5}>
              <Card>
                <VuiBox sx={{ height: "420px" }}>
                  <VuiTypography variant="h4" color="white" fontWeight="bold" mb="5px">
                    카메라별 검출 순위
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography variant="button" color="success" fontWeight="bold">
                      (+23){" "}
                      <VuiTypography variant="button" color="text" fontWeight="regular">
                        than last week
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox display="flex">
                    <VuiBox sx={{ width: "360px" }} p="20px">
                    {
                      Object.entries(cameraRank).map(([index, data]) => (
                        
                        <Grid item xs={6} md={3} lg={8} key={index}>
                          <Stack
                            direction="row"
                            spacing={{ sm: "10px", xl: "4px", xxl: "20px" }}
                            mb="6px"
                          >
                            <VuiTypography color="text" variant="button" fontWeight="medium">
                              {data[0]}
                            </VuiTypography>
                            <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                              {data[1]}
                            </VuiTypography>
                          </Stack>
                          <VuiProgress value={data[1]} color="info" sx={{ background: "#2D2E5F", mb:"35px" }} />
                        </Grid>
                      ))
                    }
                    </VuiBox>
                    <VuiBox alignItems="center" mb="10px">
                    {cameraRank.length > 0 && (
                      <PieChart 
                        pieChartData={cameraRank.map(([index, data]) => (data))} 
                        label={cameraRank.map(([index, data]) => (index))}
                      />
                    )}
                    </VuiBox>
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>
        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
          <Grid item xs={12} md={6} lg={8}>
            <Projects modelInfo={modelInfo}/>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            {
              recentDetectedList.length > 0 && (
                <OrdersOverview recentDetectedList={[recentDetectedList]} setRecentDetectedList={setRecentDetectedList}/>
              )
            }
          </Grid>
        </Grid>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;