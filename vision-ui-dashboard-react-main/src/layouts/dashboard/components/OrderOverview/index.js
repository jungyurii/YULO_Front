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
import { Grid } from "@mui/material";

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
      <VuiBox sx={{ height: '400px', width: '90%', overflowY: 'scroll', }}>
        <Grid container spacing="18px" sx={{mt: 0}}>
        {recentDetectedList.length > 0 &&
          recentDetectedList[0].map((item, index) => {
            return (
              <Grid item xs={11} lg={11} xl={11}>
              <TimelineItem
                fullwidth
                icon={<FaBell size="16px" color={palette.info.main} />}
                title={item.cameraName}
                dateTime={item.detectionDate}
                key={index}
              />
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
