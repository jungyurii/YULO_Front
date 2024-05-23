import React, { useState } from "react";

import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Icon, InputLabel, MenuItem, Select, Switch, Typography } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

import gif from "assets/images/cardimgfree.png";
import { ImageButton } from "components/ImageButton";
import { ImageSrc } from "components/ImageButton";
import { ImageBackdrop } from "components/ImageButton";
import { Image } from "components/ImageButton";
import { ImageMarked } from "components/ImageButton";
import { IoAddCircleOutline } from "react-icons/io5";

const AddCamera = () => {
  const [open, setOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState('md');
  const [fullWidth, setFullWidth] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  return (
    <React.Fragment>
      <Card sx={() => ({
        height: "540px",
        py: "32px",
        backgroundSize: "cover",
        backgroundPosition: "50%"
      })}>
        <ImageButton
            focusRipple
            key={gif.title}
            style={{
              width: '100%',
              height: '100%'
            }}
            onClick={handleClickOpen} // 수정된 부분: 카드 클릭 시 handleClickOpen 함수 호출
          >
            <ImageSrc style={{ backgroundImage: `url(${gif})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                align="center"
                sx={{
                  position: 'relative',
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
              >
                <IoAddCircleOutline size="20px" color="white" sx={{pr:2}} />
                Add Camera
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>
      </Card>
      <Dialog
          fullWidth={fullWidth}
          maxWidth={'xl'}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>Optional sizes</DialogTitle>
          <DialogContent>
            <Typography variant="body1">You can set my maximum width and whether to adapt or not.</Typography>
            <Box
              noValidate
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                m: 'auto',
                width: 'fit-content',
              }}
            >
              <FormControl sx={{ mt: 2, minWidth: 120 }}>
                <InputLabel htmlFor="max-width">maxWidth</InputLabel>
                <Select
                  autoFocus
                  value={maxWidth}
                  onChange={handleMaxWidthChange}
                  label="maxWidth"
                  inputProps={{
                    name: 'max-width',
                    id: 'max-width',
                  }}
                >
                  <MenuItem value={false}>false</MenuItem>
                  <MenuItem value="xs">xs</MenuItem>
                  <MenuItem value="sm">sm</MenuItem>
                  <MenuItem value="md">md</MenuItem>
                  <MenuItem value="lg">lg</MenuItem>
                  <MenuItem value="xl">xl</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel
                sx={{ mt: 1 }}
                control={
                  <Switch checked={fullWidth} onChange={handleFullWidthChange} />
                }
                label="Full width"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
  );
};

export default AddCamera;
