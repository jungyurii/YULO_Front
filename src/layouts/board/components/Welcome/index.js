import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";

// Vision UI Dashboard React examples
import Table from "examples/Tables/Table";

import axios from "axios";

function Welcome() {

  const [noticelist, setNoticelist] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8080/board/listNotice?page=1")
    .then(response => {
      console.log("Response : ", response.data.result.data.content);
      setNoticelist(response.data.result.data.content);
    })
    .catch(error => {
      console.log("Error : ", error);
    });
  },[])

  const tableRows = noticelist.map((notice, index) => ({
    id: notice.noticeId,
    name: notice.userName,
    title: notice.title,
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
      </Card>
    );
  };

export default Welcome;
