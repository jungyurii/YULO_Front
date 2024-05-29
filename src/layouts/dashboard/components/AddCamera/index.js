import React, { useEffect, useState } from "react";

import { Grid, TextField, Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Icon, InputLabel, MenuItem, Select, Switch, Typography, Paper, OutlinedInput, Checkbox, ListItemText, Tooltip } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import Skeleton from '@mui/material/Skeleton';

import gif from "assets/images/cardimgfree.png";
import yolo from "assets/images/model-images/detect_object.png"
import smoke from "assets/images/model-images/detect_smoke.png"
import { ImageButton } from "components/ImageButton";
import { ImageSrc } from "components/ImageButton";
import { ImageBackdrop } from "components/ImageButton";
import { Image } from "components/ImageButton";
import { ImageMarked } from "components/ImageButton";
import { IoAddCircleOutline } from "react-icons/io5";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import GradientBorder from "examples/GradientBorder";
import borders from "assets/theme/base/borders";
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import axios from "axios";
import { AreaChart, CartesianGrid, Legend, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { lineChartDataDashboard } from "layouts/dashboard/data/lineChartData";
import { lineChartOptionsDashboard } from "layouts/dashboard/data/lineChartOptions";
import LiveChart from "examples/Charts/LiveCharts/LiveChart";
import KakaoMap from "layouts/tables/components/KakaoMap";
import MapBox from "layouts/tables/components/MapBox";


const AddCamera = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const askForLocation = () =>  {
    navigator.geolocation.getCurrentPosition(accessToGeo)
}

  const accessToGeo = (position) => {
    const positionObj = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    }
    console.log(positionObj);
    setPosition(positionObj);
  }
  useEffect(() => {
    askForLocation();
  },[]);

  const handleClose = () => {
    setOpen(false);
  };
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
      setGraphURL(response.data.graph_url);
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
      <Card sx={() => ({
        height: "540px",
        py: "32px",
        backgroundSize: "cover",
        backgroundPosition: "50%"
      })}>
        <ImageButton
            focusRipple
            key={gif.title}
            style={{
              width: '100%',
              height: '100%'
            }}
            onClick={handleClickOpen}
          >
            <ImageSrc style={{ backgroundImage: `url(${gif})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                align="center"
                sx={{
                  position: 'relative',
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
              >
                <IoAddCircleOutline size="20px" color="white" sx={{pr:2}} />
                Add Camera
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>
      </Card>


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
                      {isLoading ? (
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
                      )}
                    </Card>
                  </Paper>
                </Grid>
                <Grid>
                  <Paper style={{ padding: 20, backgroundColor: "#cbd5e0" }} sx={{height: 400, mt: 2}}>
                    <h4>Location</h4>
                    {isLoading ? (
                        <Skeleton variant="rectangular" width={'100%'} height={'90%'} sx={{ bgcolor: '#2d3748', borderRadius:5}}/>
                      ) : (
                          <VuiBox height="90%" display="flex" flexDirection="column" justifyContent="space-between">
                            <Card sx={() => ({
                              height: "540px",
                            })}>
                            <VuiBox height="350px" display="flex" flexDirection="column" justifyContent="space-between">
                              {/* <LiveChart
                                graphURL={graphURL}
                                lineChartData={lineChartDataDashboard}
                                lineChartOptions={lineChartOptionsDashboard}
                              /> */}
                              {/* <LiveChart
                                url={graphURL}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="dateTime" style={{color:"black"}}/>
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                              </LiveChart> */}
                              {/* <KakaoMap position={position}/> */}
                              {position && <MapBox position={position}/>}
                            </VuiBox>
                          </Card>
                          </VuiBox>
                      )}
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
};

export default AddCamera;

// const LiveChart = (({url}) => {
//   const [datas, setDatas] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         console.log(url);
        
//         const response = await axios.get(url);

//         if (Array.isArray(response.data)) {  
//           setDatas((prevDatas) => [...prevDatas, ...response.data]);  
//         } else {
//           console.error("Unexpected response data format", response.data);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     if (url) { // url이 비어 있지 않을 때만 실행
//       fetchData(); // 최초 1회 요청
//       const interval = setInterval(fetchData, 1000); // 이후 주기적으로 요청

//       return () => {
//         clearInterval(interval);
//       };
//     }
//   }, [url]);

//   return (
//     <ResponsiveContainer width="95%" height="95%">
//       <LineChart
//         width={'100%'}
//         height={'100%'}
//         data={datas}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="dateTime" style={{color:"black"}}/>
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// });
