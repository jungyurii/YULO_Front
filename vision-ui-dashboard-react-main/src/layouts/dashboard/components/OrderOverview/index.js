import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// React icons
import { BsCheckCircleFill } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { IoLogoCss3 } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { BsCreditCardFill } from "react-icons/bs";
import { SiDropbox } from "react-icons/si";

// Vision UI Dashboard React example components
import TimelineItem from "examples/Timeline/TimelineItem";
import AdobeXD from "examples/Icons/AdobeXD";

// Vision UI Dashboard theme imports
import palette from "assets/theme/base/colors";
import { Grid, Icon } from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import VuiButton from "components/VuiButton";

function OrdersOverview({recentDetectedList}) {
  console.log('recentDetectedList : ',recentDetectedList[0]);
  return (
    <Card className="h-100">
      <VuiBox mb="10px">
        <VuiTypography variant="h4" fontWeight="bold" mb="5px" color="white">
          최근 감지 내역
        </VuiTypography>
        <VuiBox mb={2}>
          <VuiBox display="flex" alignItems="center">
            <BsCheckCircleFill color="green" size="15px" mr="5px" />
            <VuiTypography variant="button" color="text" fontWeight="medium" ml="5px" mr="2px">
              +30%
            </VuiTypography>{" "}
            <VuiTypography variant="button" color="text" fontWeight="regular">
              {" "}
              this month
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </VuiBox>
      <VuiBox shadow="lg" sx={{ height: '400px', width: '570px', overflowY: 'scroll',overflowX: 'hidden', pr: 2 }}>
        <Grid container spacing="18px">
        {recentDetectedList.length > 0 &&
          recentDetectedList[0].map((item, index) => {
            return (
              <Grid container xs={11} lg={11} xl={11} marginX={2} padding={1} key={index} sx={{ borderTop: 1, borderBottom: 1}}>
                <Grid item width={400}>
                  <TimelineItem
                    fullwidth
                    icon={<FaBell size="16px" color={palette.info.main} />}
                    title={item.cameraName}
                    dateTime={item.detectionDate}
                  />
                </Grid>
                <Grid item sx={1}>
                  <VuiButton variant="text" color="success">
                    <CheckBoxIcon sx={{ mr: "4px" }}>check</CheckBoxIcon>&nbsp;CHECK
                  </VuiButton>
                </Grid>
              </Grid>

            );
          })
        }
        </Grid>
      </VuiBox>
    </Card>
  );
}

export default OrdersOverview;
