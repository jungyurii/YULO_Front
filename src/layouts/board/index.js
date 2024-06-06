import { useState } from "react";
import React from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

// Overview page components
import Header from "layouts/board/components/Header";
import Announcement from "./components/Announcement";
import Community from "./components/Community";
import Footer from "examples/Footer";


function Board() {
  const [view, setView] = useState(true);

  return (
    <DashboardLayout>
      <Header setView={setView} />
      { view ?
       (<Grid container marginY="30px" width="100%">
          <Grid item xs={12} xl={12}>
          <Announcement />
       </Grid>
      </Grid>) 
      : (
        <Grid container marginY="30px" width="100%"> 
        <Grid item xs={12} xl={12}>
          <Community />
        </Grid>
      </Grid>
    )}
    <Footer />
  </DashboardLayout>
  );
}

export default Board;
