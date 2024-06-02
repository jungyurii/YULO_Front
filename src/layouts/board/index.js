import { useEffect, useState } from "react";

// @mui material components
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Images
import profile1 from "assets/images/profile-1.png";
import profile2 from "assets/images/profile-2.png";
import profile3 from "assets/images/profile-3.png";
import team1 from "assets/images/avatar1.png";
import team2 from "assets/images/avatar2.png";
import team3 from "assets/images/avatar3.png";
import team4 from "assets/images/avatar4.png";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import VuiPagination from "components/VuiPagination";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

// Overview page components
import Header from "layouts/board/components/Header";
import Welcome from "./components/Welcome";
import Footer from "examples/Footer";

import Pagination from '@mui/material/Pagination';

import axios from "axios";
import React from "react";

function Board() {
  const [view, setView] = useState(true);
  const [paging, setPaging] = useState(1);
  const [boardlist, setBoardlist] = useState([]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    axios.get("http://127.0.0.1:8080/board/list?page=1", { 
      userId: 1
    })
    .then(response => {
      console.log("Response : ", response.data.result.data.content);
      setBoardlist(response.data.result.data.content);
    })
    .catch(error => {
      console.log("Error : ", error);
    });
  },[])

  return (
    <DashboardLayout>
      <Header setView={setView} />
      { view ?
       (<Grid container marginY="30px" width="100%">
        <Grid item xs={12} xl={12}>
          <Welcome />
       </Grid>
      </Grid>) 
      : (
        <Grid container marginY="30px" width="100%"> 
        <Grid item xs={12} xl={12}>
          <Card>
            <VuiBox display="flex" flexDirection="column" height="100%" >
              <VuiBox display="flex" flexDirection="column" mb="24px">
                <VuiTypography color="white" variant="lg" fontWeight="bold" mb="6px">
                  Projects
                </VuiTypography>
                <VuiTypography color="text" variant="button" fontWeight="regular">
                  Architects design houses
                </VuiTypography>
              </VuiBox>
              <Grid container spacing={5}>
                  {
                    boardlist.map((board, index) => (
                      <Grid item xs={12} md={6} xl={3} key={index}>
                      <DefaultProjectCard
                        image={profile1}
                        label="project #1"
                        title={board.title}
                        description={board.title}
                        action={{
                          type: "internal",
                          route: "/pages/profile/profile-overview",
                          color: "white",
                          label: "VIEW ALL",
                        }}
                        authors={[
                          { image: team1, name: "Elena Morison" },
                          { image: team2, name: "Ryan Milly" },
                          { image: team3, name: "Nick Daniel" },
                          { image: team4, name: "Peterson" },
                        ]}
                      />
                    </Grid>
                    ))
                  }
                  {/* <VuiBox mt={4} display="flex" justifyContent="center">
                    <Pagination
                      number={1} // 현재 페이지
                      size={8} // 페이지당 요소 수

                    />
                  </VuiBox> */}
              </Grid>
            </VuiBox>
          </Card>
        </Grid>
      </Grid>

       )
      }

      <Footer />
    </DashboardLayout>
  );
}

export default Board;
