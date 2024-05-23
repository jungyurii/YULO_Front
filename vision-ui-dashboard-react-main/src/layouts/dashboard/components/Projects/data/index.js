// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import VuiProgress from "components/VuiProgress";

// Icon
import { IoLogoNoSmoking } from "react-icons/io";
import { IoMdPersonAdd } from "react-icons/io";
import { IoIosFlame } from "react-icons/io";


// Images
import AdobeXD from "examples/Icons/AdobeXD";
import Atlassian from "examples/Icons/Atlassian";
import Slack from "examples/Icons/Slack";
import Spotify from "examples/Icons/Spotify";
import Jira from "examples/Icons/Jira";
import Invision from "examples/Icons/Invision";
import avatar1 from "assets/images/avatar11.png";
import avatar2 from "assets/images/avatar2.png";
import avatar3 from "assets/images/avatar3.png";
import avatar4 from "assets/images/avatar4.png";
import axios from "axios";


export default function modelata(modelInfo) {
  const rows = modelInfo.map(element => {
    return {
      Name: (
        <VuiBox display="flex" alignItems="center">
          <AdobeXD size="20px" />
          <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
            {element.modelName}
          </VuiTypography>
        </VuiBox>
      ),
      Icon: (
        <VuiBox alignItems="center">
          {(element.modelId === 1) ? (
            <IoLogoNoSmoking color="#fff" size="25px" />
          ) : (
            (element.modelId === 2) ? (
              <IoMdPersonAdd color="#fff" size="25px" />
            ) : (
              <IoIosFlame color="#fff" size="25px" />
            )
          )}
        </VuiBox>
      ),
      Usage: (
        <VuiTypography variant="button" color="white" fontWeight="bold">
          {element.modelAllUser}
        </VuiTypography>
      ),
      Accuracy: (
        <VuiBox width="8rem" textAlign="left">
          <VuiTypography color="white" variant="button" fontWeight="bold">
            {element.modelAccuracy}%
          </VuiTypography>
          <VuiProgress value={element.modelAccuracy} color="info" label={false} sx={{ background: "#2D2E5F" }} />
        </VuiBox>
      ),
    };
  });

  return {
    columns: [
      { name: "Name", align: "left" },
      { name: "Icon", align: "center" },
      { name: "Usage", align: "center" },
      { name: "Accuracy", align: "center" },
    ],
    rows: rows,
  };
}

