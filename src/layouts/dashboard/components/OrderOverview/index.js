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
import TimelineItem from "../TimelineItem";
import AdobeXD from "examples/Icons/AdobeXD";

// Vision UI Dashboard theme imports
import palette from "assets/theme/base/colors";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, Stack } from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import VuiButton from "components/VuiButton";
import { useState } from "react";
import axios from "axios";

function OrdersOverview({recentDetectedList,setRecentDetectedList}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detectedId, setDetectdId] = useState(0);
  const [detectionServerPath, setDetectionServerPath] = useState('');

  const openModal = (detectionId,detectionServerPath) => {
    // 모달 표시 상태를 true로 설정하여 모달을 엽니다.
    setIsModalOpen(true);
    setDetectdId(detectionId);
    setDetectionServerPath(detectionServerPath);
  };

  const fetchData = () => {
    axios.post("http://127.0.0.1:8080/detection/detectionsList", { userId: 1})
    .then(response => {
      setRecentDetectedList(response.data.result.data);
    }
    ).catch(error => {
      console.log("Error : ", error);
    });
  };

  const checkVideo = () => {
    axios.post("http://127.0.0.1:8080/detection/detectionCheck", {
      detectionId: detectedId,
    })
    .then(response => {
      fetchData();
    })
    .catch(error => {
      console.log("Error : ",error);
    });
    setIsModalOpen(false);
  };

  const deleteVideo = () => {
    axios.post("http://127.0.0.1:8080/detection/detectionDelete", {
      detectionId: detectedId
    })
    .then(response => {
      fetchData();
    })
    .catch(error => {
      console.log("Error : ", error);
    });
    setIsModalOpen(false);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }


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
              {new Date().getMonth()+1}
            </VuiTypography>{" "}
            <VuiTypography variant="button" color="text" fontWeight="regular">
              {" "}
              월 감지 내역
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </VuiBox>
      <VuiBox shadow="lg" sx={{ height: '400px', width: '570px', overflowY: 'scroll', overflowX: 'hidden', pr: 2 }}>
        <Grid container spacing="18px">
        {recentDetectedList.length > 0 &&
          recentDetectedList[0].map((item, index) => {
            return (
              <Grid container xs={11} lg={11} xl={11} marginX={2} padding={1} key={index} sx={{ borderTop: 1, borderBottom: 1, alignItems: 'center' }}>
                <VuiBox display="flex" width="100%" flexDirection="row" justifyContent="space-between">
                  <TimelineItem
                    fullwidth
                    icon={<FaBell size="16px" color={palette.info.main} />}
                    title={item.cameraName}
                    dateTime={new Date(item.detectionDate).toLocaleString('en-US', { 
                      year: 'numeric', 
                      month: '2-digit', 
                      day: '2-digit', 
                      hour: '2-digit', 
                      minute: '2-digit', 
                      second: '2-digit' 
                    })}
                  >
                  </TimelineItem>
                  {item.detectionChecked ? (
                    <VuiButton variant="text" color="success" onClick={() => openModal(item.detectionId, item.detectionServerPath)} sx={{ ml: 10 }}>
                      <CheckBoxIcon sx={{ mr: "4px" }}>check</CheckBoxIcon>&nbsp;CHECKED
                    </VuiButton>
                  ) : (
                    <VuiButton variant="text" color="info" onClick={() => openModal(item.detectionId, item.detectionServerPath)} sx={{ ml: 10 }}>
                      <CheckBoxOutlineBlankIcon sx={{ mr: "4px" }}>check</CheckBoxOutlineBlankIcon>&nbsp;CHECK
                    </VuiButton>
                  )}
                </VuiBox>
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
    close={closeModal}
    aria-labelledby="modal-title"
    fullWidth
    maxWidth={'lg'}
  >
    {/* 비디오 플레이어 컴포넌트 */}
    <DialogContent sx={{ backgroundColor:"#012654"}} >
      <Card>
        <VuiBox height="100%" display="flex" flexDirection="column" justifyContent="space-between">
          <video width="100%" controls>
            <source src={`http://10.200.72.238:8000/web/static/${detectionServerPath}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </VuiBox>
      </Card>
      <DialogActions sx={{paddingBottom: 2}}>
          <VuiButton variant="gradient" color="info" fullWidth onClick={checkVideo}>확인 완료</VuiButton>
          <VuiButton variant="gradient" color="error" fullWidth onClick={deleteVideo}>삭제</VuiButton>
      </DialogActions>
    </DialogContent>
  </Dialog>
  </React.Fragment>
  );
}

export default OrdersOverview;
