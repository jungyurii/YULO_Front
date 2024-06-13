import React, { useEffect, useState } from "react";
import { Card, Dialog, DialogContent, Box, Typography } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Table from "examples/Tables/Table";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import axios from "axios";
import { IoNotifications, IoClose } from "react-icons/io5";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

function Announcement() {
  const [noticelist, setNoticelist] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [size, setSize] = useState(0);
  const [first, setFirst] = useState(false);
  const [last, setLast] = useState(false);

  const [notice, setNotice] = useState([]);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

  const handlePageChange = (page) => {
    axios.get(`http://127.0.0.1:8080/board/listNotice?page=${page}`)
      .then(response => {
        setNoticelist(response.data.result.data.content);
        setCurrentPage(page);
      })
      .catch(error => {
        console.log("Error : ", error);
      });
  };

  const handleTitleClick = (noticeId) => {
    axios.post("http://127.0.0.1:8080/board/detailNotice", {
      noticeId: noticeId
    })
      .then(response => {
        setNotice(response.data.result.data);
        setOpenDetail(true);
      })
      .catch(error => {
        console.log("Error : ", error);
      });
  };

  const handleClose = () => {
    setOpenDetail(false);
    setSelectedNotice(null);
  };

  useEffect(() => {
    axios.get("http://127.0.0.1:8080/board/listNotice?page=1")
      .then(response => {
        setNoticelist(response.data.result.data.content);
        setTotalPages(response.data.result.data.totalPages);
        setCurrentPage(response.data.result.data.number + 1);
        setTotalElements(response.data.result.data.totalElements);
        setSize(response.data.result.data.size);
        setFirst(response.data.result.data.first);
        setLast(response.data.result.data.last);
      })
      .catch(error => {
        console.log("Error : ", error);
      });
  }, []);

  const tableRows = noticelist.map((notice) => ({
    id: (
      <VuiTypography
        variant="body2"
        color="white"
      >
      {notice.noticeId}
      </VuiTypography>
    ),
    name: (
      <VuiTypography
        variant="body2"
        color="white"
      >
      {notice.userName}
      </VuiTypography>
    ),
    title: (
      <VuiTypography
        variant="body2"
        color="info"
        fontWeight="medium"
        onClick={() => handleTitleClick(notice.noticeId)}
        sx={{ cursor: 'pointer' }}
      >
        {notice.title}
      </VuiTypography>
    ),
    date: (
      <VuiTypography
        variant="body2"
        color="white"
      >
      {notice.createDate}
      </VuiTypography>
    ),
  }));

  return (
      <Card>
        <Table
          columns={[
            { name: "id", align: "center" },
            { name: "name", align: "center" },
            { name: "title", align: "center" },
            { name: "date", align: "center" },
          ]}
          rows={tableRows}
        />
        <VuiBox mt={4} display="flex" justifyContent="center">
          <Pagination
            color="info"
            size="large"
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => handlePageChange(page)}
            showFirstButton={!first}
            showLastButton={!last}
            sx={{
              '& .MuiPaginationItem-root': { color: '#FFFFFF', },
              '& .MuiPaginationItem-root.Mui-selected': { backgroundColor: 'info.main', },
            }} />
        </VuiBox>

        <Dialog
          open={openDetail}
          onClose={handleClose}
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
              <Box display="flex" alignContent="space-between" mb={5}>
                <IoNotifications size="35px" color="#4318ff" />
                <Typography variant="h4" ml={1} fontStyle={{ color: "#4318ff" }}>Announcement</Typography>
                <Box width="100%" />
                <IoClose size="30px" onClick={handleClose} />
              </Box>
              <VuiTypography variant="h5" color="sidenav" fontWeight="medium">
                {notice && notice.title}
              </VuiTypography>
              <Box sx={{ my: 2, borderBottom: "1px solid #e0e0e0" }} />
            </Box>
            <VuiTypography variant="h5" color="sidenav" fontWeight="medium">
              {notice && notice.content}
            </VuiTypography>
          </DialogContent>

          <Box sx={{ my: 2, borderBottom: "1px solid #e0e0e0" }} />
        </Dialog>
      </Card>
  );
}

export default Announcement;