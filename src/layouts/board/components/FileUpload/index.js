import axios from "axios";
import React, { useState } from "react";

export default function FileUpload() {
  const [files, setFiles] = useState();

  const onChangeFiles = (e) => {
    const fileList = e.target.files;
    if (fileList !== null) {
      setFiles(fileList);
    }
  };

  const upload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Array.from(files).forEach((el) => {
        console.log("el : ", el);
      formData.append("userfile", el);
    });

    // 다른 데이터 추가
    const boardWriteRequestDTO = {
        userId: 1,
        title: "1111",
        content: "내용"
    }

    formData.append("boardWriteRequestDTO", JSON.stringify(boardWriteRequestDTO));

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
      alert("성공");
    } catch (error) {
      alert("돌아가");
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={upload} encType="multipart/form-data">
        <input type="file" name="userfile" multiple onChange={onChangeFiles} />
        <input type="submit" />
      </form>
    </div>
  );
}