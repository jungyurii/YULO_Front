// @mui material components
import Card from "@mui/material/Card";
import Pagination from '@mui/material/Pagination';
import axios from "axios";
import { useState, useEffect } from "react";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Billing page components
import Bill from "layouts/detected/components/Bill";

// @mui material components
import Icon from "@mui/material/Icon";


function BillingInformation() {
  const [detectedList, setDetectedList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [size, setSize] = useState(0);
  const [first, setFirst] = useState(false);
  const [last, setLast] = useState(false);

  const handelPageChange = (page) => {
    axios.get(`http://127.0.0.1:8080/detection/detections?userId=1&page=${page}`)
    .then(response => {
      setDetectedList(response.data.result.data.content);
      setCurrentPage(page);
    })
    .catch(error => {
      console.log("error : ", error);
    })
  }

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    axios.get("http://127.0.0.1:8080/detection/detections?userId=1&page=1", { 
      userId: 1
    })
    .then(response => {
      console.log('Response : ', response.data.result.data);
      setDetectedList(response.data.result.data.content);
      setTotalPages(response.data.result.data.totalPages); // 전체 페이지 수 설정
      setCurrentPage(response.data.result.data.number + 1); // 현재 페이지 번호 설정
      setTotalElements(response.data.result.data.totalElements); // 전체 요소 수 설정
      setSize(response.data.result.data.size); // 페이지당 요소 수 설정
      setFirst(response.data.result.data.first); // 첫 번째 페이지인지
      setLast(response.data.result.data.last); // 마지막 페이지인지
    })
    .catch(error => {
      console.log("Error : ", error);
    })
  }, []);

  return (

    <Card id="delete-account" fullwidth>
      <VuiBox>
        <VuiTypography variant="lg" color="white" fontWeight="bold">
          Detected List
        </VuiTypography>
      </VuiBox>
      <VuiBox>
        <VuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {detectedList.map(detection => (
            <Bill
              name={detection.cameraName}
              company={detection.detectionDate}
              email={detection.modelId}
              vat={detection.detectionChecked}
              key={detection.detectionId}
            />
          ))}

        </VuiBox>
      </VuiBox>
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
}

export default BillingInformation;
