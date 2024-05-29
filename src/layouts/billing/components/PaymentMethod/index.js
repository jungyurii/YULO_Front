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
    console.log('handleFromDate : ',e.target.value);
    setFrom(e.target.value);
  }

  const handleToDate = (e) => {
    console.log('handleToDate : ',e.target.value);
    setTo(e.target.value);
  }

  const handleName = (e) => {
    setName(e.target.value);
  }

  const submitDateRange = () => {
    axios.post()
  }

  return (
    <Card id="delete-account">
      <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="32px" >
        <VuiTypography variant="lg" fontWeight="bold" color="white" >
          Date Picker
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