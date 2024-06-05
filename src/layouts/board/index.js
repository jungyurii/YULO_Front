import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { Dialog, DialogActions, DialogContent, Box, TextField, Typography, createTheme, ThemeProvider, Pagination } from "@mui/material";
import MUIRichTextEditor from "mui-rte";

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
import Announcement from "./components/Announcement";
import Footer from "examples/Footer";

// React icons
import { IoChatbubbles } from "react-icons/io5";

function Board() {
  const [view, setView] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [size, setSize] = useState(0);
  const [first, setFirst] = useState(false);
  const [last, setLast] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  const [boardlist, setBoardlist] = useState([]);
  const [open, setOpen] = useState(false);

  const myTheme = createTheme({});

  const handleOpen = (boardId) => {
    console.log("boardId : ", boardId);
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
      console.log("Response : ", response.data.result.data);
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
      <Header setView={setView} userName={userName} email={email}/>
      { view ?
       (<Grid container marginY="30px" width="100%">
          <Grid item xs={12} xl={12}>
          <Announcement />
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
                <VuiButton display="inline" variant="text" fontWeight="bold" color="info" onClick={() => setOpen(true)}> + Add Write
                </VuiButton>
              </VuiBox>
              <Grid container spacing={5}>
                  {
                    boardlist.map((board, index) => (
                      <Grid item xs={12} md={6} xl={3} key={index}  onClick={() => handleOpen(board.boardId)}>
                      <DefaultProjectCard
                        image={profile1}
                        label={"project #" + board.boardId}
                        title={board.title}
                        description={board.content}
                        action={{
                          type: "internal",
                          color: "white",
                          label: "VIEW ALL",
                          onClick: () => handleOpen(board.boardId),
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
                  <Dialog
                    open={open}
                    close={handleClose}
                    aria-labelledby="title"
                    fullWidth
                    maxWidth={'md'}
                    PaperProps={{
                      sx: {
                        minHeight: 700,
                        borderRadius: 3
                      }
                    }}
                    >
                  <DialogContent>
                    <Box>
                      <Box display="flex" alignItems="center" mb={2}>
                        <IoChatbubbles size="22px" color="#4318ff" />
                        <Typography variant="h4" ml={1} fontStyle={{ color: "#4318ff" }}>Community</Typography>
                      </Box>
                        <VuiTypography component="label" variant="h5" color="sidenav" fontWeight="medium" >
                            title
                        </VuiTypography>
                          <TextField  variant="filled" size="medium" fullWidth />
                        <Box sx={{ my: 2, borderBottom: "1px solid #e0e0e0" }} /> 
                      </Box>
                      <ThemeProvider theme={myTheme}>
                        <MUIRichTextEditor
                          label="Type something here..."
                          // onSave={save}
                          inlineToolbar={true}
                        />
                      </ThemeProvider>
                    </DialogContent>
                    <Box sx={{ my: 2, borderBottom: "1px solid #e0e0e0" }} /> 
                    <DialogActions>
                      <VuiButton variant="gradient" color="primary" fullWidth>Post</VuiButton>
                      <VuiButton variant="gradient" color="secondary" fullWidth onClick={handleClose}>Back</VuiButton>
                    </DialogActions>
                </Dialog>
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
