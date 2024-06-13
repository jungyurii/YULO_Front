
import { Alert, AlertTitle, Button, IconButton } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import React from 'react';

function CustomSnackbar({show, setShow, message}) {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShow(false);
  };
  
  return (
    <>      
      <Snackbar open={show} autoHideDuration={6000} onClose={handleClose}>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        {message}
      </Alert>
      </Snackbar>
    </>
  )
}

export default CustomSnackbar;
