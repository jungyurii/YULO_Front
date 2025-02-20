// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import VuiInput from "components/VuiInput";

// Images
import colors from "assets/theme/base/colors";
import { useState } from "react";
import axios from "axios";

function PaymentMethod({setDetectedList}) {
  const { grey } = colors;
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [name, setName] = useState('');

  const handleFromDate = (e) => {
    setFrom(e.target.value);
  }

  const handleToDate = (e) => {
    setTo(e.target.value);
  }

  const handleName = (e) => {
    setName(e.target.value);
  }

  const submitDateRange = () => {
    axios.post("http://localhost:8080/detection/detectionsDetails", {
      userId: localStorage.getItem("userId"),
      cameraName: name,
      startDate : from+ "T00:00:00",
      endDate : to+ "T23:59:59"
    }).then(response => {
      console.log("Response : ", response);
      setDetectedList(response.data.result.data);
    }).catch(error => {
      console.log("Error : ", error);
    })
  }

  return (
    <Card id="delete-account">
      <VuiBox display="flex" width="100%" justifyContent="space-between" alignItems="center" mb="32px" >
        <VuiTypography variant="lg" fontWeight="bold" color="white" >
          Detection Search 
        </VuiTypography>
        <VuiButton variant="contained" color="info" onClick={submitDateRange}>
          Check
        </VuiButton>
      </VuiBox>
      <VuiBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <VuiInput type="date" placeholder="Date" value={from} onChange={handleFromDate}/>
          </Grid>

          <Grid item xs={12} md={3}>
            <VuiInput type="date" placeholder="Date" value={to} onChange={handleToDate}/>
          </Grid>

          <Grid item xs={12} md={3}>
            <VuiInput placeholder="Camera   Name" onChange={handleName}/>
          </Grid>

          <Grid item xs={12} md={3}>
            <VuiInput placeholder="Camera   Place" />
          </Grid>
          
        </Grid>
      </VuiBox>
    </Card>
  );
}

export default PaymentMethod;