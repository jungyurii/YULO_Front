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

function PaymentMethod() {
  const { grey } = colors;

  return (
    <Card id="delete-account">
      <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="32px" >
        <VuiTypography variant="lg" fontWeight="bold" color="white" >
          Date Picker
        </VuiTypography>
        <VuiButton variant="contained" color="info">
          Check
        </VuiButton>
      </VuiBox>
      <VuiBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <VuiInput type="date" placeholder="Date" value="2024-05-26" />
          </Grid>

          <Grid item xs={12} md={3}>
            <VuiInput type="date" placeholder="Date" value="2024-05-26" />
          </Grid>

          <Grid item xs={12} md={3}>
            <VuiInput placeholder="Camera   Name" />
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