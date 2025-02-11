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

import { IoLogoNoSmoking } from "react-icons/io";
import { IoMdPersonAdd } from "react-icons/io";
import { IoIosFlame } from "react-icons/io";
import { FaHelmetSafety } from "react-icons/fa6";
import { MdBikeScooter } from "react-icons/md";
import React, { useState } from "react";
import axios from "axios";

import { Dialog, DialogActions, DialogContent, Card } from "@mui/material";


function Bill({ name, company, email, vat, noGutter, detectionId, videoSrc }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { gradients } = colors;
  const { bill } = gradients;

  const openModal = (detectionId) => {
    // 모달 표시 상태를 true로 설정하여 모달을 엽니다.
    setIsModalOpen(true);
    
  };
  const checkVideo = (detectionId) => {
    axios.post("http://127.0.0.1:8080/detection/detectionCheck", {
      detectionId: detectionId,
    })
    .then(response => {
      fetchData();
    })
    .catch(error => {
      console.log("Error : ",error);
    });
    setIsModalOpen(false);
  };

  const deleteVideo = (detectionId) => {
    axios.post("http://127.0.0.1:8080/detection/detectionDelete", {
      detectionId: detectionId
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

  return (
    <React.Fragment>
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
            {(email === 1) ? (
              <IoMdPersonAdd color="#fff" size="25px" />
            ) : (
            (email === 2) ? (
              <IoLogoNoSmoking color="#fff" size="25px" />
            ) : (
              (email === 3) ? (
                <FaHelmetSafety color="#fff" size="25px"/>
              ) : (
                (email === 4) ? (
                  <MdBikeScooter color="#fff" size="25px"/>
                ) : (
                  <IoIosFlame color="#fff" size="25px" />
              )))
          )}
          </VuiTypography>
        </VuiBox>
      </VuiBox>
      <VuiBox width="10%" display="flex" flexDirection="column" justifyContent="center">
      </VuiBox>
      <VuiBox width="20%" display="flex" flexDirection="row" justifyContent="space-between">
        <video autoPlay loop muted type="video/mp4" style={{width: "60%", height: "100%", marginRight: "50px"}}>
          <source src={`http://10.200.72.238:8000/web/static/${videoSrc}`} type="video/mp4"/>
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
          <VuiButton variant="text" color="text" onClick={() => openModal(detectionId)}>
            <Icon sx={{ mr: "4px" }}>edit</Icon>&nbsp;SHOW
          </VuiButton>
        </VuiBox>
      </VuiBox>
    </VuiBox>
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
            <source src={`http://10.200.72.238:8000/web/static/${videoSrc}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </VuiBox>
      </Card>
      <DialogActions sx={{paddingBottom: 2}}>
          <VuiButton variant="gradient" color="info" fullWidth onClick={() => checkVideo(detectionId)}>확인 완료</VuiButton>
          <VuiButton variant="gradient" color="error" fullWidth onClick={() => deleteVideo(detectionId)}>삭제</VuiButton>
      </DialogActions>
    </DialogContent>
  </Dialog>
  </React.Fragment>
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
