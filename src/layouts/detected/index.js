// @mui material components
import Grid from "@mui/material/Grid";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Billing page components
import PaymentMethod from "layouts/detected/components/PaymentMethod";
import BillingInformation from "layouts/detected/components/BillingInformation";

import colors from "assets/theme/base/colors";
import { useState } from "react";

function Detected() {
  const { gradients } = colors;
  const [detectedList, setDetectedList] = useState([]);
  return (
    <DashboardLayout>
      <DashboardNavbar/>
      <VuiBox mt={4}>
        <VuiBox mb={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} width="100%">
              <PaymentMethod setDetectedList={setDetectedList}/>
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox my={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <BillingInformation detectedList={detectedList} setDetectedList={setDetectedList}/>
            </Grid>           
          </Grid>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Detected;
