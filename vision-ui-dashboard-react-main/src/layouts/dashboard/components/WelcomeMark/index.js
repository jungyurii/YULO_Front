import React from "react";

import { Card, Icon } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

import gif from "assets/images/cardimgfree.png";

const WelcomeMark = ({data}) => {
  return (
    <Card sx={() => ({
      height: "540px",
      py: "32px",
      backgroundImage: `url('${data.streamURL}')`,
      backgroundSize: "cover",
      backgroundPosition: "50%"
    })}>
      <VuiBox height="100%" display="flex" flexDirection="column" justifyContent="space-between">
        <VuiTypography
          component="a"
          href="#"
          variant="button"
          color="white"
          fontWeight="regular"
          sx={{
            mr: "5px",
            display: "inline-flex",
            alignItems: "center",
            cursor: "pointer",

            "& .material-icons-round": {
              fontSize: "3.125rem",
              transform: `translate(2px, -0.5px)`,
              transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
            },

            "&:hover .material-icons-round, &:focus  .material-icons-round": {
              transform: `translate(6px, -0.5px)`,
            },
          }}
        >
          {data.cameraName}
        </VuiTypography>
      </VuiBox>
    </Card>
  );
};

export default WelcomeMark;
