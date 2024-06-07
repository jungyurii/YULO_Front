import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import CommentExampleThreaded from "../Comments";
import FileUpload from "../FileUpload";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { Dialog, DialogActions, DialogContent, Box, Button, TextField, Typography, createTheme, Pagination, Icon } from "@mui/material";
import { styled } from '@mui/material/styles';
import { TextareaAutosize } from "@material-ui/core";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
import TimelineItem from "examples/Timeline/TimelineItem";

// React icons
import { IoChatbubbles } from "react-icons/io5";

function Community() {
  const [boardlist, setBoardlist] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [size, setSize] = useState(0);
  const [first, setFirst] = useState(false);
  const [last, setLast] = useState(false);

  const [openPost, setOpenPost] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [file, setFile] = useState([]);

  const myTheme = createTheme({});

  const handleOpenDetail = (boardId) => {
    console.log("boardId : ", boardId);
    setOpenDetail(true);
  };

  const handleClose = () => {
    setOpenPost(false);
    setOpenDetail(false);
  }

  const post = () => {
    console.log("post 작동 준비");
    const userId = localStorage.getItem("userId");
    axios.post("http://127.0.0.1:8080/board/write", {
        userId: userId,
        title: title,
        content: content
    })
    .then(response => {
        console.log('response.data : ', response.data.result.data);
        const userId = response.data.result.data.userId;
        const title = response.data.result.data.title;
        const content = response.data.result.data.content;
        localStorage.setItem("userId", userId);
    })
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

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });


  return (
        <Card>
        <VuiBox display="flex" flexDirection="column" height="100%" >
            <VuiBox display="flex" flexDirection="row" justifyContent="space-between" mb="24px">
                <VuiTypography color="white" variant="lg" fontWeight="bold" mb="6px">
                    Community
                </VuiTypography>
                    <VuiButton display="inline" variant="text" fontWeight="bold" color="info" onClick={() => setOpenPost(true)}> + Add Write
                </VuiButton>
            </VuiBox>
            <Grid container spacing={5}>
                {
                boardlist.map((board, index) => (
                    <Grid item xs={12} md={6} xl={3} key={index}  onClick={() => handleOpenDetail(board.boardId)}>
                    <DefaultProjectCard
                    image={profile1}
                    label={"project #" + board.boardId}
                    title={board.title}
                    description={board.content}
                    action={{
                        type: "internal",
                        color: "white",
                        label: "VIEW ALL",
                        onClick: () => handleOpenDetail(board.boardId),
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

                <Dialog // 글 작성 Dialog
                    open={openPost} 
                    close={handleClose}
                    aria-labelledby="title"
                    fullWidth
                    maxWidth={'md'}
                    PaperProps={{
                        sx: {
                            minHeight: 800,
                            minWidth: 1000,
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
                          <TextField  variant="filled" size="medium" fullWidth focused />
                        <Box sx={{ my: 2, borderBottom: "1px solid #e0e0e0" }} /> 
                    </Box>
                    <FileUpload />
                    <TextareaAutosize
                        maxRows={15}
                        aria-label="maximum height"
                        placeholder="Type something here..."
                    />
                </DialogContent>

                <Box sx={{ my: 2, borderBottom: "1px solid #e0e0e0" }} /> 
                <DialogActions>
                    <VuiButton variant="gradient" color="primary" fullWidth onClick={post}>Post</VuiButton>
                    <VuiButton variant="gradient" color="secondary" fullWidth onClick={handleClose}>Back</VuiButton>
                </DialogActions>
                </Dialog>





                <Dialog // 글 상세 보기 Dialog
                    open={openDetail}
                    close={handleClose}
                    aria-labelledby="title"
                    fullWidth
                    maxWidth={'md'}
                    PaperProps={{
                        sx: {
                        minHeight: 800,
                        minWidth: 1000,
                        borderRadius: 3
                        }
                    }}
                > 
                <DialogContent>
                <Box>
                    <Box display="flex" alignItems="center" mb={5}>
                    <IoChatbubbles size="22px" color="#4318ff" />
                        <Typography variant="h4" ml={1} fontStyle={{ color: "#4318ff" }}>Community</Typography>
                    </Box>
                        <VuiTypography variant="h5" color="sidenav" fontWeight="medium" >
                            title
                        </VuiTypography>
                        <Box sx={{ my: 2, borderBottom: "1px solid #e0e0e0" }} /> 
                    </Box>
                        <VuiTypography variant="h5" color="sidenav" fontWeight="medium" >
                            content
                        </VuiTypography>
                </DialogContent>


                <Box sx={{ my: 2, borderBottom: "1px solid #e0e0e0" }} />
                <VuiBox>
                    <VuiButton variant="text" color="primary" fontWeight="regular">
                        <Icon>favorite</Icon>&nbsp;
                            45
                    </VuiButton>
                    <VuiButton variant="text" color="primary">
                        <Icon>message</Icon>&nbsp;
                            100
                    </VuiButton>
                </VuiBox>
                    <DialogActions>
                    <TextareaAutosize aria-label="minimum height" minRows={3} placeholder="Comments..." />
                        <VuiButton variant="gradient" color="secondary" fullWidth onClick={handleClose}>Send</VuiButton>
                    </DialogActions>


                <Box ml={3} mr={3}>
                    <Typography variant="h5">Comments</Typography>
                    <Box sx={{ my: 2, ml: 3, borderBottom: "1px solid #e0e0e0" }} />
                    <CommentExampleThreaded />
                </Box>
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
        )}

export default Community;