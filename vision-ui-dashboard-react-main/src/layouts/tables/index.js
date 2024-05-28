import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import gif from "assets/images/cardimgfree.png";
import yolo from "assets/images/model-images/detect_object.png"
import smoke from "assets/images/model-images/detect_smoke.png"

// Data
import cameraData from "layouts/tables/data/cameraData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, ListItemText, Paper, Select, Skeleton, MenuItem } from "@mui/material";
import GradientBorder from "examples/GradientBorder";
import borders from "assets/theme/base/borders";
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import { Image } from "components/ImageButton";
import LiveChart from "examples/Charts/LiveCharts/LiveChart";
import { lineChartDataDashboard } from "layouts/dashboard/data/lineChartData";
import { lineChartOptionsDashboard } from "layouts/dashboard/data/lineChartOptions";

function Tables() {

  const [cameraSettings, setCameraSettings] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading]= useState(true);


  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    axios.post("http://127.0.0.1:8080/camera/cameraSetting", { 
      userId: 1
    })
    .then(responses => {
      console.log("Response : ", responses.data.result.data);
      setCameraSettings(responses.data.result.data);
    })
    .catch(error => {
      console.log("Error : ", error);
    });
  },[]);

  const models = [
    {name:'Please Choose Model...', image: yolo},
    {name:'YOLO Object Detect', image: yolo},
    {name:'Smoke Detection', image: smoke},
    {name:'Fire Detection', image: gif},
    {name:'Safe Hat', image: gif},
    {name:'Electric Scooter', image: gif},
  ];

  const [modelType, setModelType] = useState('Please Choose Model...');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [cardImage, setCardImage] = useState(models[0].image);
  const [cameraName, setCameraName] = useState('');
  const [cameraURL, setCameraURL] = useState('');
  const [label, setLabel] = useState(0);
  const [count, setCount] = useState(0);

  const handleCameraName = (e) => {
    setCameraName(e.target.value);
  }

  const handleCameraURL = (e) => {
    setCameraURL(e.target.value);
  }

  const modelhandleChange = (event) => {
    const selectedModel = event.target.value;
    const selected = models.findIndex(model => model.name === selectedModel);
    
    setCardImage(models[selected].image);
    setModelType(event.target.value);
    setSelectedIndex(selected);
  };

  const handleLabel = (e) => {
    setLabel(e.target.value);
  }

  const handleCount = (e) => {
    setCount(e.target.value);
  }

  const [streamURL, setStreamURL] = useState('');
  const [graphURL, setGraphURL] = useState('');


  const testSubmit = () => {
    axios.post(cameraURL+"/api/model/test",{
      userId: 1,
      cameraURL: cameraURL,
      modelType: selectedIndex,
      cameraId: 1,
      label : label,
      count : count
    })
    .then(response => {
      console.log("response.data.stream_url : ", response.data.stream_url);
      setStreamURL(response.data.stream_url);
      //setGraphURL(response.data.graph_url);
      setIsLoading(false);
    })
    .catch(error => {
      console.log('Error : ', error);
    })
  }

  const saveCameraSubmit = () => {
    const userId = localStorage.getItem("userId");
    axios.post("http://127.0.0.1:8080/camera/cameraAdd", { 
      userId: 1,
      cameraName: cameraName,
      cameraURL: cameraURL,
      streamURL: streamURL,
      graphURL: graphURL,
      modelId: selectedIndex,
      label: label,
      count: count
    }).then(response => {
      console.log('saveCameraSubmit response.data : ',response.data);
    }).catch(error => {
      console.log("saveCameraSubmit Error : ", error);
    })
  }

  const editCamera = (cameraName) => {
    setOpen(true);
    const editCamera = cameraSettings.find((camera) => camera.cameraName === cameraName);
    console.log('editCamera : %o', editCamera);
    setCameraName(editCamera.cameraName);
    setCameraURL(editCamera.cameraName);
    setGraphURL(editCamera.graphURL);
    setCardImage(models[editCamera.modelId].image);
    setModelType(editCamera.modelId);
    setSelectedIndex(editCamera.modelId);
    console.log('editCamera.cameraName : ',editCamera.cameraName);
    console.log('setLabel : ',cameraName);
  }
  
  const { columns, rows } = cameraData({cameraSettings, setCameraSettings, editCamera});
  const { columns: prCols, rows: prRows } = projectsTableData;

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <React.Fragment>
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Card>
            <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
              <VuiTypography variant="lg" color="white">
                Camera Setting
              </VuiTypography>
            </VuiBox>
            <VuiBox
              sx={{
                "& th": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                      `${borderWidth[1]} solid ${grey[700]}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows}/>
            </VuiBox>
          </Card>
        </VuiBox>
        <Card>
          <VuiBox display="flex" justifyContent="space-between" alignItems="center">
            <VuiTypography variant="lg" color="white">
              Projects table
            </VuiTypography>
          </VuiBox>
          <VuiBox
            sx={{
              "& th": {
                borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                  `${borderWidth[1]} solid ${grey[700]}`,
              },
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
              },
            }}
          >
            <Table columns={prCols} rows={prRows} />
          </VuiBox>
        </Card>
      </VuiBox>
      <Footer />
    </DashboardLayout>

    <Dialog
    fullWidth
    maxWidth={'xl'}
    open={open}
    onClose={handleClose}
    >
    <DialogTitle>ADD Camera</DialogTitle>
    <DialogContent>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid>
            <Paper style={{ padding: 10, backgroundColor: "#cbd5e0" }} sx={{height: 400}}>
              <h4>Live Stream Demo</h4>
              <Card sx={() => ({
                height: "90%",
                backgroundSize: "cover",
                backgroundPosition: "50%",
              })}>
                {/* {isLoading ? (
                  <Skeleton variant="rectangular" width={'100%'} height={'100%'} sx={{ bgcolor: '#2d3748', borderRadius:5}}/>
                ) : (
                  <Card sx={() => ({
                    height: "540px",
                    py: "32px",
                    backgroundImage: `url('${streamURL}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "50%"
                  })}>
                  </Card>
                )} */}
                <Card sx={() => ({
                    height: "540px",
                    py: "32px",
                    backgroundImage: `url('${streamURL}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "50%"
                  })}/>
              </Card>
            </Paper>
          </Grid>
          <Grid>
            <Paper style={{ padding: 20, backgroundColor: "#cbd5e0" }} sx={{height: 400, mt: 2}}>
              <h4>Live Graph Demo</h4>
              {/* {isLoading ? (
                  <Skeleton variant="rectangular" width={'100%'} height={'90%'} sx={{ bgcolor: '#2d3748', borderRadius:5}}/>
                ) : (
                    <VuiBox height="90%" display="flex" flexDirection="column" justifyContent="space-between">
                      <Card sx={() => ({
                        height: "540px",
                      })}>
                      <VuiBox height="350px" display="flex" flexDirection="column" justifyContent="space-between">
                        <LiveChart
                          graphURL={graphURL}
                          lineChartData={lineChartDataDashboard}
                          lineChartOptions={lineChartOptionsDashboard}
                        />
                      </VuiBox>
                    </Card>
                    </VuiBox>
                )} */}
                <VuiBox height="90%" display="flex" flexDirection="column" justifyContent="space-between">
                  <Card sx={() => ({
                    height: "540px",
                  })}>
                    <VuiBox height="350px" display="flex" flexDirection="column" justifyContent="space-between">
                      <LiveChart
                        graphURL={graphURL}
                        lineChartData={lineChartDataDashboard}
                        lineChartOptions={lineChartOptionsDashboard}
                      />
                    </VuiBox>
                  </Card>
                </VuiBox>
            </Paper>
          </Grid>
        </Grid>
        {/* 오른쪽 폼 요소 */}
        <Grid item xs={6}>
          <Paper style={{ padding: 20 }} sx={{backgroundColor: "#cbd5e0"}}>
            <h2>Camera Setting</h2>
            <VuiBox component="form" role="form" height="100%">
              <VuiBox mb={2}>
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="#2d3748" fontWeight="large">
                    Camera Name
                  </VuiTypography>
                </VuiBox>
                <GradientBorder
                  minWidth="100%"
                  padding="1px"
                  borderRadius={borders.borderRadius.lg}
                  backgroundImage={radialGradient(
                    palette.gradients.borderLight.main,
                    palette.gradients.borderLight.state,
                    palette.gradients.borderLight.angle
                  )}
                >
                  <VuiInput type="text" placeholder="Enter Your Camera Name..." fontWeight="500" onChange={handleCameraName} />
                </GradientBorder>
              </VuiBox>
              <VuiBox mb={2}>
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="#2d3748" fontWeight="large">
                    Url
                  </VuiTypography>
                </VuiBox>
                <GradientBorder
                  minWidth="100%"
                  padding="1px"
                  borderRadius={borders.borderRadius.lg}
                  backgroundImage={radialGradient(
                    palette.gradients.borderLight.main,
                    palette.gradients.borderLight.state,
                    palette.gradients.borderLight.angle
                  )}
                >
                  <VuiInput type="text" placeholder="Enter Your Camera IP..." fontWeight="500" onChange={handleCameraURL} />
                </GradientBorder>
              </VuiBox>
              <VuiBox>
              <FormControl sx={{ m: 1, width: 300 }}>
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="#2d3748" fontWeight="large">
                    Model
                  </VuiTypography>
                </VuiBox>
                <Select
                  id="demo-checkbox"
                  value={modelType}
                  onChange={modelhandleChange}
                  MenuProps={MenuProps}
                >
                  {models.map((model,index) => (
                    <MenuItem key={index} value={model.name}>
                      <ListItemText primary={model.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              </VuiBox>
              <Card>
                <VuiBox sx={{height: "250px"}}>
                  <Image sx={{width: "100%", backgroundImage: `url(${cardImage})`}} style={{backgroundSize: "contain"}}/>
                </VuiBox>
              </Card>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="#2d3748" fontWeight="large">
                    Detect label
                  </VuiTypography>
                </VuiBox>
                <GradientBorder
                  minWidth="100%"
                  padding="1px"
                  borderRadius={borders.borderRadius.lg}
                  backgroundImage={radialGradient(
                    palette.gradients.borderLight.main,
                    palette.gradients.borderLight.state,
                    palette.gradients.borderLight.angle
                  )}
                >
                  <VuiInput type="number" placeholder="Enter Detect label..." fontWeight="500" onChange={handleLabel}/>
                </GradientBorder>
                </Grid>
                <Grid item xs={6}>
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="#2d3748" fontWeight="large">
                    Detect Count
                  </VuiTypography>
                </VuiBox>
                <GradientBorder
                  minWidth="100%"
                  padding="1px"
                  borderRadius={borders.borderRadius.lg}
                  backgroundImage={radialGradient(
                    palette.gradients.borderLight.main,
                    palette.gradients.borderLight.state,
                    palette.gradients.borderLight.angle
                  )}
                >
                  <VuiInput type="text" placeholder="Enter Detect Count..." fontWeight="500" onChange={handleCount}/>
                </GradientBorder>
                </Grid>
              </Grid>
              <VuiBox mt={2}>
                <VuiButton variant="gradient" color="dark" fullWidth onClick={testSubmit}>테스트</VuiButton>
              </VuiBox>
            </VuiBox>
          </Paper>
        </Grid>
      </Grid>
    </DialogContent>
    <DialogActions sx={{paddingX: 60, paddingBottom: 2}}>
      <VuiButton variant="gradient" color="info" fullWidth onClick={saveCameraSubmit}>카메라 저장하기</VuiButton>
    </DialogActions>
  </Dialog>
  </React.Fragment>
  );
}

export default Tables;