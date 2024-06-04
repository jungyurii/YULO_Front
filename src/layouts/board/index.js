import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Pagination from '@mui/material/Pagination';

// Images
import profile1 from "assets/images/profile-1.png";
import team1 from "assets/images/avatar1.png";
import team2 from "assets/images/avatar2.png";
import team3 from "assets/images/avatar3.png";
import team4 from "assets/images/avatar4.png";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

// Overview page components
import Header from "layouts/board/components/Header";
import Welcome from "./components/Welcome";
import Footer from "examples/Footer";

// import Pagination from '@mui/material/Pagination';

import axios from "axios";
import React from "react";
import VuiInput from "components/VuiInput";


function Board() {
  const [view, setView] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [size, setSize] = useState(0);
  const [first, setFirst] = useState(false);
  const [last, setLast] = useState(false);

  const [boardlist, setBoardlist] = useState([]);
  const [open, setOpen] = useState(false);
  const [clickBoardIndex, setClickBoardIndex] = useState(); // 클릭된 카드를 식별하기 위한 상태 추가

  const handleOpen = (index) => {
    setClickBoardIndex(index); // 클릭된 카드 index 저장
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }
  
  const handelPageChange = (page) => {
    axios.get(`http://127.0.0.1:8080/board/list?page=${page}`)
    .then(response => {
      setBoardlist(response.data.result.data.content);
      setCurrentPage(page);
    })
    .catch(error => {
      console.log("Error : ", error);
    })
  }

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    axios.get("http://127.0.0.1:8080/board/list?page=1", { 
      userId: 1
    })
    .then(response => {
      console.log("Response : ", response.data.result.data.content);
      console.log("TotalPages : ", response.data.result.data.totalPages);
      console.log("CurrentPage : ", response.data.result.data.number + 1);
      console.log("TotalElements : ", response.data.result.data.totalElements);
      console.log("Size : ", response.data.result.data.size);
      console.log("First : ", response.data.result.data.first);
      console.log("Last : ", response.data.result.data.last);
      setBoardlist(response.data.result.data.content);
      setTotalPages(response.data.result.data.totalPages); // 전체 페이지 수 설정
      setCurrentPage(response.data.result.data.number + 1); // 현재 페이지 번호 설정
      setTotalElements(response.data.result.data.totalElements); // 전체 요소 수 설정
      setSize(response.data.result.data.size); // 페이지당 요소 수 설정
      setFirst(response.data.result.data.first); // 첫 번째 페이지인지
      setLast(response.data.result.data.last); // 마지막 페이지인지
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
              <VuiBox display="flex" flexDirection="row" justifyContent="space-between" mb="24px">
                <VuiTypography color="white" variant="lg" fontWeight="bold" mb="6px">
                  Community
                </VuiTypography>
                <VuiButton display="inline" variant="text" fontWeight="bold" color="info"> + Add Write
                </VuiButton>
              </VuiBox>
              <Grid container spacing={5}>
                  {
                    boardlist.map((board, index) => (
                      <Grid item xs={12} md={6} xl={3} key={index}>
                      <DefaultProjectCard
                        image={profile1}
                        label="project #1"
                        title={board.title}
                        description={board.content}
                        action={{
                          type: "internal",
                          color: "white",
                          label: "VIEW ALL",
                          onClick: () => handleOpen(index), // 클릭 이벤트 시 해당 카드의 index를 전달
                        }}
                        authors={[
                          { image: team1, name: "Elena Morison" },
                          { image: team2, name: "Ryan Milly" },
                          { image: team3, name: "Nick Daniel" },
                          { image: team4, name: "Peterson" },
                        ]}
                      />
                      {/* <Dialog
                          open={handleOpen}
                          close={handleClose}
                          aria-labelledby="title"
                          fullWidth
                          maxWidth={'lg'}
                        >
                        <DialogContent sx={{ backgroundColor:"#012654"}} >
                          <Card>
                            <VuiBox height="100%" display="flex" flexDirection="column" justifyContent="space-between">
                              <VuiInput></VuiInput>
                            </VuiBox>
                          </Card>
                          <DialogActions sx={{paddingBottom: 2}}>
                              <VuiButton variant="gradient" color="error" fullWidth onClick={handleClose}>닫기</VuiButton>
                          </DialogActions>
                        </DialogContent>
                      </Dialog> */}
                    </Grid>
                    ))
                  }
              </Grid>
                <VuiBox mt={4} display="flex" justifyContent="center">
                  <Pagination
                    color="secondary"
                    count={totalPages} // 전체 페이지 수
                    page={currentPage} // 현재 페이지
                    onChange={(event, page) => handelPageChange(page)}
                    showFirstButton={!first} // 첫번째 페이지가 아닐 때 첫번째 페이지 버튼 표시
                    showLastButton={!last} // 마지막 페이지가 아닐 때 마지막 페이지 버튼 표시
                  />
                </VuiBox>
            </VuiBox>
          </Card>
        </Grid>
      </Grid>
    )}
    <Footer />
  </DashboardLayout>
  );
}

export default Board;
