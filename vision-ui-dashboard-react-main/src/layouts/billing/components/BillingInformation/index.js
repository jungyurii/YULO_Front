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
import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Billing page components
import Bill from "layouts/billing/components/Bill";
// Vision UI Dashboard React components
import VuiPagination from "components/VuiPagination";

// @mui material components
import Icon from "@mui/material/Icon";

function BillingInformation() {
  return (

    <Card id="delete-account" fullwidth>
      <VuiBox>
        <VuiTypography variant="lg" color="white" fontWeight="bold">
          Detected List
        </VuiTypography>
      </VuiBox>
      <VuiBox>
        <VuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Bill
            name="oliver liam"
            company="viking burrito"
            email="oliver@burrito.com"
            vat="FRB1235476"
          />
          <Bill
            name="lucas harper"
            company="stone tech zone"
            email="lucas@stone-tech.com"
            vat="FRB1235476"
          />
          <Bill
            name="ethan james"
            company="fiber notion"
            email="ethan@fiber.com"
            vat="FRB1235476"
            noGutter
          />
        </VuiBox>
      </VuiBox>
      <VuiBox mt={4} display="flex" justifyContent="center">
        <VuiPagination>
          <VuiPagination item>
            <Icon>keyboard_arrow_left</Icon>
          </VuiPagination>
          <VuiPagination item active>1</VuiPagination>
          <VuiPagination item>2</VuiPagination>
          <VuiPagination item>3</VuiPagination>
          <VuiPagination item>
            <Icon>keyboard_arrow_right</Icon>
          </VuiPagination>
        </VuiPagination>
      </VuiBox>
    </Card>
    
  );
}

export default BillingInformation;
