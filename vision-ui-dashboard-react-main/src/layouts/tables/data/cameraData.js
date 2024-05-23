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

/* eslint-disable react/prop-types */
// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import VuiBadge from "components/VuiBadge";

// Images
import avatar1 from "assets/images/avatar1.png";
import avatar2 from "assets/images/avatar2.png";
import avatar3 from "assets/images/avatar3.png";
import avatar4 from "assets/images/avatar4.png";
import avatar5 from "assets/images/avatar5.png";
import avatar6 from "assets/images/avatar6.png";
import { IoLogoNoSmoking } from "react-icons/io5";
import { IoIosFlame, IoMdPersonAdd } from "react-icons/io";
import VuiButton from "components/VuiButton";
import Icon from "@mui/material/Icon";
import axios from "axios";
import { useState } from "react";


export default function cameraData(props) {
  const {cameraSettings, setCameraSettings} = props;
  const deleteCamera = (cameraName) => {
    console.log('deleteCameraName : ', cameraName);
    const userId = localStorage.getItem("userId");
    axios.post("http://127.0.0.1:8080/camera/cameraDelete", {
      userId : userId,
      cameraName : cameraName
    })
    .then(response => {
      setCameraSettings(prevSettings => prevSettings.filter(camera => camera.cameraName !== cameraName));
    })
    .catch(error => {
      console.log("Error : ", error);
    })
  }
  const rows = cameraSettings.map((camera,index) => {
    return {
      ID: 
        (
          <VuiTypography variant="body3" color="white" fontWeight="medium">
            {index+1}
          </VuiTypography>
        ),
      Name: 
        (
          <VuiTypography variant="body4" color="white" fontWeight="bold">
            {camera.cameraName}
          </VuiTypography>
        ),
      Model: 
        (
          <VuiBox alignItems="center">
            {(camera.modelId === 1) ? (
              <IoLogoNoSmoking color="#fff" size="25px" />
            ) : (
              (camera.modelId === 2) ? (
                <IoMdPersonAdd color="#fff" size="25px" />
              ) : (
                <IoIosFlame color="#fff" size="25px" />
              )
            )}
          </VuiBox>
        ),
      Status: 
        (
          <VuiBadge
            variant="standard"
            badgeContent="Online"
            color="success"
            size="xs"
            container
            sx={({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
              background: success.main,
              border: `${borderWidth[1]} solid ${success.main}`,
              borderRadius: borderRadius.md,
              color: white.main,
            })}
          />
        ),
      Action: 
        (
        <VuiBox
          display="flex"
          alignItems="right"
          mt={{ xs: 2, sm: 0 }}
          ml={{ xs: -1.5, sm: 0 }}
          sx={({ breakpoints }) => ({
            [breakpoints.only("sm")]: {
              flexDirection: "column",
            },
          })}
        >
          <VuiBox mr={1}>
            <VuiButton variant="text" color="error" onClick={() => deleteCamera(camera.cameraName)}>
              <Icon sx={{ mr: "4px" }}>delete</Icon>&nbsp;DELETE
            </VuiButton>
          </VuiBox>
          <VuiButton variant="text" color="text">
            <Icon sx={{ mr: "4px" }}>edit</Icon>&nbsp;EDIT
          </VuiButton>
        </VuiBox>
        ),
    };
  });

  return {
    columns: [
      { name: "ID", align: "left" },
      { name: "Name", align: "left" },
      { name: "Model", align: "center" },
      { name: "Status", align: "center" },
      { name: "Action", align: "center" },
    ],
    rows: rows,
  }

};
