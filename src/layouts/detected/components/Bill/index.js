// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import linearGradient from "assets/theme/functions/linearGradient";
import colors from "assets/theme/base/colors";
import Video from "../../../../assets/videos/annotated_output_2.mp4"
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';


function Bill({ name, company, email, vat, noGutter, key }) {
  const { gradients } = colors;
  const { bill } = gradients;

  return (
    <VuiBox
      component="li"
      display="flex"
      sx={{ background: linearGradient(bill.main, bill.state, bill.deg) }}
      borderRadius="lg"
      p="24px"
      mb={noGutter ? "0px" : "24px"}
      mt="20px"
    >
      <VuiBox width="65%" display="flex" flexDirection="column">
        <VuiBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb="5px"
        >
          <VuiTypography
            variant="h4"
            color="white"
            fontWeight="medium"
            textTransform="capitalize"
          >
            {name}
          </VuiTypography>
        </VuiBox>
        <VuiBox mb={1} lineHeight={0} display="flex">
          <VuiTypography variant="h6" color="text">
            Detected Date :&nbsp;&nbsp;&nbsp;
            </VuiTypography>
          <VuiTypography
            variant="h6"
            color="text"
            fontWeight="regular"
            textTransform="capitalize"
          >
            {new Date(company).toLocaleString('en-US', { 
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit', 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    second: '2-digit' 
                  })}
          </VuiTypography>
        </VuiBox>
        <VuiBox mb={1} lineHeight={0} display="flex">
          <VuiTypography variant="h6" color="text">
            Model Type :&nbsp;&nbsp;&nbsp;
          </VuiTypography>
          <VuiTypography variant="h6" fontWeight="regular" color="text">
            {email}
          </VuiTypography>
        </VuiBox>
      </VuiBox>
      <VuiBox width="10%" display="flex" flexDirection="column" justifyContent="center">
      {vat ? (
              <VuiButton variant="text" color="success">
                <CheckBoxIcon sx={{ mr: "4px" }}>check</CheckBoxIcon>&nbsp;CHECKED
              </VuiButton>
            ) : (
              <VuiButton variant="text" color="info">
                <CheckBoxOutlineBlankIcon sx={{ mr: "4px" }}>check</CheckBoxOutlineBlankIcon>&nbsp;CHECK
              </VuiButton>
      )}
      </VuiBox>
      <VuiBox width="20%" display="flex" flexDirection="row" justifyContent="space-between">
        <video autoPlay loop muted type="video/mp4" style={{width: "60%", height: "100%", marginRight: "50px"}}>
          <source src={Video} type="video/mp4"/>
        </video>
        <VuiBox
          display="flex"
          alignItems="center"
          mt={{ xs: 2, sm: 0 }}
          ml={{ xs: -1.5, sm: 0 }}
          sx={({ breakpoints }) => ({
            [breakpoints.only("sm")]: {
              flexDirection: "column",
            },
          })}
          >
          <VuiBox mr={2}>
            <VuiButton variant="text" color="error">
              <Icon sx={{ mr: "4px" }}>delete</Icon>&nbsp;DELETE
            </VuiButton>
          </VuiBox>
          <VuiButton variant="text" color="text">
            <Icon sx={{ mr: "4px" }}>edit</Icon>&nbsp;SHOW
          </VuiButton>
        </VuiBox>
      </VuiBox>
    </VuiBox>
  );
}

// Setting default values for the props of Bill
Bill.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
Bill.propTypes = {
  name: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  vat: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Bill;
