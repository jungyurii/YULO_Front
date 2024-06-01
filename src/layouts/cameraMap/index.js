import VuiBox from "components/VuiBox";
import KakaoMap from "./components/KakaoMap";
import React, { useEffect, useState } from "react";
import { Box, Card, CircularProgress, LinearProgress, Stack } from "@mui/material";
import VuiTypography from "components/VuiTypography";

const { default: DashboardLayout } = require("examples/LayoutContainers/DashboardLayout");
const { default: DashboardNavbar } = require("examples/Navbars/DashboardNavbar");

function CameraMap() {
  const [position, setPosition] = useState();
  console.log('position : ',position);

  const askForLocation = () =>  {
    navigator.geolocation.getCurrentPosition(accessToGeo)
  }

  const accessToGeo = (position) => {
    const positionObj = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    }
    console.log('positionObj : ',positionObj);
    setPosition(positionObj);
  }
  useEffect(() => {
    askForLocation();
  },[]);

  return (
    
      <DashboardLayout>
        <DashboardNavbar/>
        <Card sx={() => ({
          height: "90vh",
          py: "32px",
          backgroundSize: "cover",
          backgroundPosition: "50%"
        })}>
          <VuiTypography variant="h4" color="white" fontWeight="bold" mb="5px">
              카메라 API
          </VuiTypography>
          <VuiBox py={3} sx={{width: "130vh", height: "90vh"}}>
            {position !== undefined && <KakaoMap position={position}/>}  
          </VuiBox>
        </Card>
      </DashboardLayout>
    
  )
}

export default CameraMap;