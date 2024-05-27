import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import React from "react";

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
import { Dialog, DialogContent, DialogTitle, Grid, Icon } from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import VuiButton from "components/VuiButton";
import { useState } from "react";
import axios from "axios";

function OrdersOverview({recentDetectedList}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const checkVideo = (detectionId) => {
    console.log("detectionId : %o", detectionId);
    // 모달 표시 상태를 true로 설정하여 모달을 엽니다.
    setIsModalOpen(true);
    axios.post("http://127.0.0.1:8080/detection/detectionCheck", {
      detectionId: detectionId,
    })
    .then(response => {
      console.log(response.data);
      axios.post("http://127.0.0.1:8080/detection/detections", { userId: 1}).then(

      ).catch(
        
      );
    })
    .catch(error => {
      console.log("Error : ",error);
    })
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (<React.Fragment>
    <Card>
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
                  {
                    item.detectionChecked ? (
                      <VuiButton variant="text" color="success">
                        <CheckBoxIcon sx={{ mr: "4px" }}>check</CheckBoxIcon>&nbsp;CHECKED
                      </VuiButton>
                    ) : (
                      <VuiButton variant="text" color="info" onClick={() => checkVideo(item.detectionId)}> 
                        <CheckBoxOutlineBlankIcon sx={{ mr: "4px" }}>check</CheckBoxOutlineBlankIcon>&nbsp;CHECK
                      </VuiButton>
                    )}
                </Grid>
              </Grid>
            );
          })
        }
        </Grid>
      </VuiBox>
      {/* 모달을 표시하는 부분 */}
      
  </Card>
  <Dialog
    open={isModalOpen}
    onClose={closeModal}
    aria-labelledby="modal-title"
    fullWidth
    maxWidth={'lg'}
  >
    {/* 비디오 플레이어 컴포넌트 */}
    <DialogContent sx={{ width: "100%", maxWidth: "900px", height: "100%", margin: 0, padding: 0, backgroundColor:"#012654", alignItems:"center"}} >
      <Card>
        <VuiBox height="100%" display="flex" flexDirection="column" justifyContent="space-between">
          <video width="100%" controls>
            <source src={'http://192.168.0.100:8000/web/static/1006.mp4'} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </VuiBox>
      </Card>
    </DialogContent>
  </Dialog>
  </React.Fragment>
  );
}

export default OrdersOverview;
