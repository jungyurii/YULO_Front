// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import { useState } from "react";
import noImage from "../../../../assets/images/no-image.png";

function DefaultProjectCard({ image, label, title, description, action,authors, createDate }) {
  let imageSrc ='';
  if(image[0] === undefined) {
    imageSrc = noImage
  }
  else {
    imageSrc = `http://localhost:8080/board/images/${image[0]}`;
  }
  
  return (
    <VuiBox
      sx={{
        display: "flex",
        flexDirection: "column",
        boxShadow: "none",
        overflow: "visible",
      }}
    >
      <VuiBox
        component="img"
        src={imageSrc}
        mb="8px"
        borderRadius="15px"
        sx={({ breakpoints }) => ({
          [breakpoints.up("xl")]: {
            height: "200px",
          },
        })}
      />

      <VuiBox
        sx={({ breakpoints }) => ({
          [breakpoints.only("xl")]: {
            minHeight: "200px",
          },
        })}
      >
        <VuiBox>
          <VuiTypography variant="xxs" color="text" fontWeight="medium" textTransform="capitalize">
            {label}
          </VuiTypography>
        </VuiBox>
        <VuiBox mb={1}>
          {action.type === "internal" ? (
            <VuiTypography
              component={Link}
              to={action.route}
              variant="h5"
              color="white"
              textTransform="capitalize"
            >
              {title}
            </VuiTypography>
          ) : (
            <VuiTypography
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              color="white"
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </VuiTypography>
          )}
        </VuiBox>
        <VuiBox mb={3} lineHeight={0}>
          <VuiTypography variant="button" fontWeight="regular" color="text">
            {description}
          </VuiTypography>
        </VuiBox>
        <VuiBox display="flex" justifyContent="space-between" alignItems="center">
          {action.type === "internal" ? (
            <VuiButton
              component={Link}
              to={action.route}
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </VuiButton>
          ) : (
            <VuiButton
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </VuiButton>
          )}
          <VuiTypography variant="body2" color="white" display="flex">{createDate}</VuiTypography>
        </VuiBox>
      </VuiBox>
    </VuiBox>
  );
}

// Setting default values for the props of DefaultProjectCard
DefaultProjectCard.defaultProps = {
  authors: [],
};

// Typechecking props for the DefaultProjectCard
DefaultProjectCard.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]),
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "white",
      "text",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "white",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  createDate: PropTypes.string.isRequired,
};

export default DefaultProjectCard;