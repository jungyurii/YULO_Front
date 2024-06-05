import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import Pagination from '@mui/material/Pagination';

// Vision UI Dashboard React examples
import Table from "examples/Tables/Table";
import VuiBox from "components/VuiBox";

import axios from "axios";

function Announcement() {
  const [noticelist, setNoticelist] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [size, setSize] = useState(0);
  const [first, setFirst] = useState(false);
  const [last, setLast] = useState(false);

  const handelPageChange = (page) => {
    axios.get(`http://127.0.0.1:8080/board/listNotice?page=${page}`)
    .then(response => {
      setNoticelist(response.data.result.data.content);
      setCurrentPage(page);
    })
    .catch(error => {
      console.log("Error : ", error);
    })
  }

  useEffect(() => {
    axios.get("http://127.0.0.1:8080/board/listNotice?page=1")
    .then(response => {
      console.log("Response : ", response.data.result.data.content);
      setNoticelist(response.data.result.data.content);
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

  const tableRows = noticelist.map((notice, index) => ({
    id: notice.noticeId,
    name: notice.userName,
    title: notice.title,
    date: notice.createDate,
  }));

    return (
      <Card>
        <Table
          columns={[
            { name: "id", align: "left" },
            { name: "name", align: "left" },
            { name: "title", align: "center" },
            { name: "date", align: "center" },
          ]}
          rows={tableRows}
        />
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
      </Card>
    );
  };

export default Announcement;
