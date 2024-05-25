import React, { useState } from "react";

import { Grid, TextField, Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Icon, InputLabel, MenuItem, Select, Switch, Typography, Paper, OutlinedInput, Checkbox, ListItemText } from "@mui/material";
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

const AddCamera = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const models = [
    {name:'YOLO Object Detect', image: yolo},
    {name:'Smoke Detection', image: smoke},
    {name:'Fire Detection', image: gif},
    {name:'Safe Hat', image: gif},
    {name:'Electric Scooter', image: gif},
  ];

  const [modelType, setModelType] = useState('YOLO Object Detect');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [cardImage, setCardImage] = useState(models[0].image);
  const [cameraName, setCameraName] = useState('');
  const [cameraURL, setCameraURL] = useState('');

  const handleCameraName = (e) => {
    setCameraName(e.target.value);
  }

  const handleCameraURL = (e) => {
    setCameraURL(e.target.value);
  }

  const modelhandleChange = (event) => {
    const selectedModel = event.target.value;
    const selected = models.findIndex(model => model.name === selectedModel);
    
    console.log("선택된 모델 인덱스:", selected);
    console.log("선택된 모델:", selectedModel);
    setCardImage(models[selected].image);
    setModelType(event.target.value);
    setSelectedIndex(selected);
  };

  const testSubmit = () => {
    
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
                      backgroundImage: `url('http://127.0.0.1:8000/api/report/get_model_stream/video/1/1')`,
                      backgroundSize: "cover",
                      backgroundPosition: "50%",
                    })}>
                      {isLoading ? (
                        <Skeleton variant="rectangular" width={'100%'} height={'100%'} sx={{ bgcolor: '#2d3748', borderRadius:5}}/>
                      ) : (
                          <VuiBox height="100%" display="flex" flexDirection="column" justifyContent="space-between">
                          <VuiTypography
                            component="a"
                            href="#"
                            variant="button"
                            color="white"
                            fontWeight="regular"
                            sx={{
                              mr: "5px",
                              display: "inline-flex",
                              alignItems: "center",
                              cursor: "pointer",

                              "& .material-icons-round": {
                                fontSize: "3.125rem",
                                transform: `translate(2px, -0.5px)`,
                                transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
                              },

                              "&:hover .material-icons-round, &:focus  .material-icons-round": {
                                transform: `translate(6px, -0.5px)`,
                              },
                            }}
                          >
                            카메라 이름 1
                          </VuiTypography>
                        </VuiBox>
                      )}
                    </Card>
                  </Paper>
                </Grid>
                <Grid>
                  <Paper style={{ padding: 20, backgroundColor: "#cbd5e0" }} sx={{height: 400, mt: 2}}>
                    <h4>Live Graph Demo</h4>
                    {isLoading ? (
                        <Skeleton variant="rectangular" width={'100%'} height={'90%'} sx={{ bgcolor: '#2d3748', borderRadius:5}}/>
                      ) : (
                          <VuiBox height="100%" display="flex" flexDirection="column" justifyContent="space-between">
                          <VuiTypography
                            component="a"
                            href="#"
                            variant="button"
                            color="white"
                            fontWeight="regular"
                            sx={{
                              mr: "5px",
                              display: "inline-flex",
                              alignItems: "center",
                              cursor: "pointer",

                              "& .material-icons-round": {
                                fontSize: "3.125rem",
                                transform: `translate(2px, -0.5px)`,
                                transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
                              },

                              "&:hover .material-icons-round, &:focus  .material-icons-round": {
                                transform: `translate(6px, -0.5px)`,
                              },
                            }}
                          >
                            카메라 이름 1
                          </VuiTypography>
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
                        <VuiInput type="number" placeholder="Enter Detect label..." fontWeight="500" disabled={selectedIndex !== 0}/>
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
                        <VuiInput type="text" placeholder="Enter Detect Count..." fontWeight="500" disabled={selectedIndex !== 0}/>
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
            <VuiButton variant="gradient" color="info" fullWidth>카메라 저장하기</VuiButton>
          </DialogActions>
        </Dialog>
      </React.Fragment>
  );
};

export default AddCamera;
