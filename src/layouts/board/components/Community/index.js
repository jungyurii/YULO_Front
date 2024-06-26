import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Comments from "../Comments";
import FileUpload from "../FileUpload";

// @mui material components
import { Dialog, DialogActions, DialogContent, Box, TextField, Typography, Pagination, Icon, Grid, Card } from "@mui/material";
import { TextareaAutosize } from "@material-ui/core";

// Images
import profile1 from "assets/images/profile-1.png";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// React icons
import { IoChatbubbles, IoClose } from "react-icons/io5";
import CustomSnackbar from "layouts/dashboard/components/SnackBar";

function Community() {
  const userId = localStorage.getItem("userId");
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
  const [board, setBoard] = useState();
  const [comments, setComments] = useState([]);

  const [files, setFiles] = useState();

  const [show, setShow] = useState(false); // SnackBar
  const toggleSnackbar = () => setShow(!show);

  const handleOpenDetail = (boardId) => {
    console.log("boardId : ", boardId);
    axios.post("http://127.0.0.1:8080/board/detail", {
      boardId: boardId
    })
      .then(response => {
        console.log(response.data.result.data);
        setBoard(response.data.result.data);
        setComments(response.data.result.data.comments);
      })
      .catch(error => {
        console.log("error : ", error)
      })
    setOpenDetail(true);
  };

  const handleClose = () => {
    setOpenPost(false);
    setOpenDetail(false);
  }

  const upload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Array.from(files).forEach((el) => {
      console.log("el : ", el);
      formData.append("files", el);
    });

    // 다른 데이터 추가
    const boardWriteRequestDTO = {
      userId: userId,
      title: title,
      content: content,
      comments: comments
    }

    const json = JSON.stringify(boardWriteRequestDTO);
    const blob = new Blob([json], { type: "application/json" });
    formData.append("boardWriteRequestDTO", blob);

    console.log("FormData : %o", formData);

    try {
      const response = await axios.post(`http://127.0.0.1:8080/board/write`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // 파일을 위한 Content-Type
          "Accept": "application/json", // JSON 응답을 원하는 경우
        },
        transformRequest: [
          function () {
            return formData;
          },
        ],
      });
      handleClose(); // 모달창을 닫고
      toggleSnackbar(); // 스낵바를 띄움
    } catch (error) {
      alert("이미지 업로드 실패");
      console.log(error);
    }
  };

  const handleDelete = (boardId) => {
    console.log("boardId : ", boardId);
    axios.post(`http://127.0.0.1:8080/board/delete`, {
      userId: userId,
      boardId: boardId
    })
      .then(response => {
        console.log("response : ", response);
        alert("게시글 삭제 완료")
        setOpenDetail(false);

        axios.get("http://127.0.0.1:8080/board/list?page=1", {
          userId: userId
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
      })
      .catch(error => {
        console.log("Error : ", error);
      })
  }

  const handlePageChange = (page) => {
    axios.get(`http://127.0.0.1:8080/board/list?page=${page}`)
      .then(response => {
        setBoardlist(response.data.result.data.content);
        setCurrentPage(page);
        console.log("Response : ", response.data.result.data);
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
  }, [])


  return (
    <>
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
                <Grid item xs={12} md={6} xl={3} key={index} onClick={() => handleOpenDetail(board.boardId)}>
                  <DefaultProjectCard
                    image={board.imageUrls}
                    label={"project #" + board.boardId}
                    title={board.title}
                    description={board.content}
                    action={{
                      type: "internal",
                      color: "white",
                      label: "VIEW ALL",
                      onClick: () => handleOpenDetail(board.boardId),
                    }}
                    createDate={board.createDate}
                  />
                </Grid>
              ))
            }
          </Grid>
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
                <TextField variant="filled" size="medium" fullWidth focused value={title}
                  onChange={(event) => setTitle(event.target.value)} />
                <Box sx={{ my: 2, borderBottom: "1px solid #e0e0e0" }} />
              </Box>
              <FileUpload files={files} setFiles={setFiles} />
              <TextareaAutosize
                style={{ marginTop: 30, width: "100%", borderRadius: "5px" }}
                minRows={25}
                aria-label="maximum height"
                placeholder="Type something here..."
                value={content}
                onChange={(event) => setContent(event.target.value)}
              />
            </DialogContent>

            <Box sx={{ my: 2, borderBottom: "1px solid #e0e0e0" }} />
            <DialogActions>
              <form onSubmit={upload} encType="multipart/form-data" style={{ width: "50%" }}>
                <VuiButton variant="gradient" color="primary" fullWidth type="submit">Post</VuiButton></form>
                <VuiButton variant="gradient" color="secondary" sx={{ width: "50%" }} onClick={handleClose}>Back</VuiButton>
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
                minHeight: 900,
                minWidth: 1500,
                borderRadius: 3
              }
            }}
          >

            <Box display="flex" alignContent="space-between" p={2}>
              <IoChatbubbles size="35px" color="#4318ff" />
              <Typography variant="h4" ml={1} fontStyle={{ color: "#4318ff" }}>Community</Typography>
              <Box width="100%" />
              <IoClose size="30px" onClick={handleClose} />
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <DialogContent style={{height:"700px"}}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ py: 2, borderBottom: '1px solid #e0e0e0' }}>
                      <VuiTypography variant="h5" color="sidenav" fontWeight="medium">
                        {board && board.title}
                      </VuiTypography>
                    </Box>
                    <Box sx={{ py: 2, borderBottom: '1px solid #e0e0e0' }}>
                      <VuiTypography variant="subtitle2" color="sidenav" fontWeight="medium">
                        작성자 : {board && board.userName}
                      </VuiTypography>
                    </Box>
                    <Box sx={{ py: 2, borderBottom: '1px solid #e0e0e0' }}>
                      <VuiTypography variant="subtitle2" color="sidenav">
                        작성 날짜 : {board && board.createDate}
                      </VuiTypography>
                    </Box>
                    <Box sx={{ py: 2, flexGrow: 1, overflowY: 'auto' }}>
                      <VuiTypography variant="body1" color="sidenav">
                        {board && board.content}
                      </VuiTypography>
                    </Box>
                    {board && board.files.map((file, key) => (
                  <Box
                  sx={{
                    width: "100%",
                    height: "300px",
                    border: "2px black solid",
                    borderRadius: "30px",
                    marginX: "5px",
                    backgroundImage: `url(http://localhost:8080/board/images/${file.origFilename})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  key={key}
                />
                ))}
                  </Box>
                </DialogContent>
                <Box sx={{ my: 2, borderBottom: '1px solid #e0e0e0' }} />
                <VuiBox display="flex" justifyContent="flex-end">
                  <VuiButton
                    sx={{ mr: 2, fontSize: '12px' }}
                    variant="text"
                    color="error"
                    onClick={() => handleDelete(board.boardId)}
                  >
                    <Icon>delete</Icon>&nbsp;DELETE
                  </VuiButton>
                </VuiBox>
              </Grid>
              {/* <Box>
                    <VuiButton variant="text" color="primary" fontWeight="regular">
                      <Icon>favorite</Icon>&nbsp;
                      45
                    </VuiButton>
                    <VuiButton variant="text" color="primary">
                      <Icon>message</Icon>&nbsp;
                      100
                    </VuiButton>
                  </Box> */}

              <Grid item xs={6}>
                <Box mr={4}>
                  <Typography variant="h5">Comments</Typography>
                  <Box sx={{ my: 2, borderBottom: "1px solid #e0e0e0" }} />
                  {board && <Comments comments={comments} setComments={setComments} boardId={board.boardId} />}
                </Box>
              </Grid>
            </Grid>
          </Dialog>

          <VuiBox mt={4} display="flex" justifyContent="center">
            <Pagination
              color="info"
              size="large"
              count={totalPages} // 전체 페이지 수
              page={currentPage} // 현재 페이지
              onChange={(event, page) => handlePageChange(page)}
              showFirstButton={!first} // 첫번째 페이지가 아닐 때 첫번째 페이지 버튼 표시
              showLastButton={!last} // 마지막 페이지가 아닐 때 마지막 페이지 버튼 표시
              sx={{
                '& .MuiPaginationItem-root': { color: '#FFFFFF', },
                '& .MuiPaginationItem-root.Mui-selected': { backgroundColor: 'info.main', },
              }} />
          </VuiBox>
        </VuiBox>
      </Card>
      <CustomSnackbar show={show} setShow={setShow} />
    </>
  )
}

export default Community;