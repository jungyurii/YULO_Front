/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// @mui material components
import Grid from "@mui/material/Grid";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";

// Vision UI Dashboard React components
import MasterCard from "examples/Cards/MasterCard";
// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Billing page components
import PaymentMethod from "layouts/detected/components/PaymentMethod";
import Invoices from "layouts/detected/components/Invoices";
import BillingInformation from "layouts/detected/components/BillingInformation";
import Transactions from "layouts/detected/components/Transactions";
import CreditBalance from "./components/CreditBalance";
import { useEffect, useState } from "react";
import axios from "axios";

import colors from "assets/theme/base/colors";

function Detected() {
  const { gradients } = colors;
  const { cardContent } = gradients;
  const [detectedList, setDetectedList] = useState([]);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios.post("http://127.0.0.1:8080/detection/detections", { 
      userId: userId
    })
    .then(response => {
      console.log('response.data.result.data : ',response.data.result.data);
      setDetectedList(response.data.result.data);
    })
    .catch(error => {
      console.log("Error : ", error);
    })
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar/>
      <VuiBox mt={4}>
        <VuiBox mb={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7} xl={8}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <PaymentMethod setDetectedList={setDetectedList}/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox my={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <BillingInformation detectedList={detectedList}/>
            </Grid>           
          </Grid>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Detected;
