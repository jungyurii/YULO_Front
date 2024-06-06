
import { cctv_info } from "layouts/cameraMap/data/positions";
import React, { useEffect, useRef, useState } from "react";
import "assets/css/overlay.css";
import {geojson} from '../../data/incheon.js';
import VuiSwitch from "components/VuiSwitch/index.js";
import VuiTypography from "components/VuiTypography/index.js";
import VuiBox from "components/VuiBox/index.js";
import danger from "assets/images/danger.png";

import linearGradient from "assets/theme/functions/linearGradient";
import { Card, Grid, ListItemText, MenuItem, Select } from "@mui/material";
import Video from "../../../../assets/videos/annotated_output_2.mp4"
import { safeMap } from "layouts/cameraMap/data/safeMap.js";
import { Gauge } from "../Gage/index.js";


function KakaoMap({position}) {
  // 카카오 API 호출
  const apiKey = process.env.REACT_APP_KEY_KAKAO_1;
  const [mapTypes, setMapTypes] = useState({});
  const map = useRef();
  const cluseterMap = useRef();
  const overlayMap = useRef();
  const customOverlay = useRef();
  const [polygons, setPolygons] = useState([]);
  const [mapLayoutType, setMapLayoutType] = useState(1);

  const [mapName, setMapName] = useState('');
  const [guage, setGuage] = useState(0);
  
  let data = geojson.features;
  let coordinates = []; //좌표 저장 배열
  let name = ''; //행정구 이름
  let polygonsVar = [];

  const findValueByKey = (obj, key) => {
    if (key in obj) {
      return obj[key];
    } else {
      return `Key "${key}" not found in the object.`;
    }
  }


  const displayArea = (coordinates, name, type) => {
    let path = [];
    let points = [];
    
    const mapType = safeMap[type-1].safeGrade;

    coordinates[0][0].forEach((coordinate) => {
      let point = {};
      point.x = coordinate[1];
      point.y = coordinate[0];
      points.push(point);
      path.push(new window.kakao.maps.LatLng(coordinate[1], coordinate[0]));
    });

    let grade = findValueByKey(mapType, name.split(' ')[1]);
    var color = '#fff';

    if(grade === 1){
      color = '#0000ff'
    } else if(grade === 2) {
      color = '#00ACFF';
    } else if (grade === 3) {
      color = '#339933';
    } else if (grade === 4) {
      color = '#FFA500';
    } else if(grade === 5) {
      color = '#FF0000';
    }

    

    let polygon = new window.kakao.maps.Polygon({ 
      map: map.current,
      path: path, // 그려질 다각형의 좌표 배열입니다
      strokeWeight: 2, // 선의 두께입니다
      strokeColor: '#004c80', // 선의 색깔입니다
      strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: 'solid', // 선의 스타일입니다
      fillColor: color, // 채우기 색깔입니다
      fillOpacity: 0.7, // 채우기 불투명도 입니다
    });
    polygonsVar.push(polygon);
    // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경하고 오버레이를 설정합니다
    window.kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
      polygon.setOptions({ fillColor: '#0ff' });
      customOverlay.current.setContent('<div class="area">' + name + '</div>');
      customOverlay.current.setPosition(mouseEvent.latLng);
      setGuage(grade);
      setMapName(name);
      customOverlay.current.setMap(map.current);
    });

    // 다각형에 mousemove 이벤트를 등록하고 이벤트가 발생하면 커스텀 오버레이의 위치를 변경합니다
    window.kakao.maps.event.addListener(polygon, 'mousemove', function (mouseEvent) {
      if (customOverlay.current.getMap()) {
        customOverlay.current.setPosition(mouseEvent.latLng);
      }
    });

    // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래 색으로 변경하고 오버레이를 숨깁니다
    window.kakao.maps.event.addListener(polygon, 'mouseout', function () {
      customOverlay.current.setMap(null);
      polygon.setOptions({ fillColor: color });
    });

    setPolygons(polygonsVar);
  }
  // 지도에 표시되어 있는 모든 원과 반경정보를 표시하는 선, 커스텀 오버레이를 지도에서 제거합니다
  const  removePolygon = () => {         
    polygons.forEach((polygon) => {
      polygon.setOptions({ fillColor: null });
      polygon.setMap(null);
    });     
     // polygons 배열 초기화
  }

  const handleMapLayoutChange = (e) => {
    setMapLayoutType(e.target.value);
    removePolygon();
    polygonsVar = []; 

    data.forEach((val) => {
      coordinates = val.geometry.coordinates;
      name = val.properties.adm_nm;
      displayArea(coordinates, name, e.target.value);
    });

    setPolygons(polygonsVar); 
  };

  

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services,clusterer,drawing&autoload=false`;
    document.head.appendChild(script);

    
  
    script.addEventListener("load", () => {
      window.kakao.maps.load(() => {
        map.current = new window.kakao.maps.Map(document.getElementById('map'), { // 지도를 표시할 div
          center: new window.kakao.maps.LatLng(position.latitude, position.longitude), // 지도의 중심좌표 
          level: 8 // 지도의 확대 레벨 
        });
  
        setMapTypes({
          terrain : window.kakao.maps.MapTypeId.TERRAIN,    
          traffic :  window.kakao.maps.MapTypeId.TRAFFIC,
          bicycle : window.kakao.maps.MapTypeId.BICYCLE,
          useDistrict : window.kakao.maps.MapTypeId.USE_DISTRICT
        })

        cluseterMap.current = new window.kakao.maps.MarkerClusterer({
          map: map.current, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
          averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
          minLevel: 10 // 클러스터 할 최소 지도 레벨 
        });

        var imageSrc = danger; // 마커이미지의 주소입니다    
        var imageSize = new window.kakao.maps.Size(40, 40); // 마커이미지의 크기입니다
        var imageOption = {offset: new window.kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
        
        
        var markers = cctv_info.positions.map(function(position) {
            return new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(position.lat, position.lon),
                image: markerImage
            });
        });
        // 클러스터러에 마커들을 추가합니다
        cluseterMap.current.addMarkers(markers);


        var content = '<div class="overlaybox">' +
        '    <div class="boxtitle">인하공전 안전시설</div>' +
        '    <div class="first">' +
        '        <video autoplay loop muted type="video/mp4" controls style="width: 100%; height: auto;">' +
        `          <source src=${Video} type="video/mp4">` +
        '        </video>' +
        `    <div class="text btn">카메라 추가</div>` + 
        '    </div>' +
        '</div>';

        // 커스텀 오버레이가 표시될 위치입니다 
        var positions = new window.kakao.maps.LatLng(position.latitude, position.longitude);

        // 커스텀 오버레이를 생성합니다
        overlayMap.current = new window.kakao.maps.CustomOverlay({
          position: positions,
          content: content,
          xAnchor: 0.3,
          yAnchor: 0.91
        });

        // 커스텀 오버레이를 지도에 표시합니다
        overlayMap.current.setMap(map.current);


        customOverlay.current = new window.kakao.maps.CustomOverlay({});
        
        
        data.forEach((val) => {
          coordinates = val.geometry.coordinates;
          name = val.properties.adm_nm;
    
          displayArea(coordinates, name, 1);
        });
      });
    });
  }, [apiKey, position]);

  const setOverlayMapTypeId = () => {
    var chkTerrain = document.getElementById('chkTerrain'),  
        chkTraffic = document.getElementById('chkTraffic'),
        chkBicycle = document.getElementById('chkBicycle'),
        chkUseDistrict = document.getElementById('chkUseDistrict');
    
    // 지도 타입을 제거합니다
    for (var type in mapTypes) {
      map.current.removeOverlayMapTypeId(mapTypes[type]);    
    }

    // 지적편집도정보 체크박스가 체크되어있으면 지도에 지적편집도정보 지도타입을 추가합니다
    if (chkUseDistrict.checked) {
      map.current.addOverlayMapTypeId(mapTypes.useDistrict);    
    }
    
    // 지형정보 체크박스가 체크되어있으면 지도에 지형정보 지도타입을 추가합니다
    if (chkTerrain.checked) {
      map.current.addOverlayMapTypeId(mapTypes.terrain);    
    }
    
    // 교통정보 체크박스가 체크되어있으면 지도에 교통정보 지도타입을 추가합니다
    if (chkTraffic.checked) {
      map.current.addOverlayMapTypeId(mapTypes.traffic);    
    }
    
    // 자전거도로정보 체크박스가 체크되어있으면 지도에 자전거도로정보 지도타입을 추가합니다
    if (chkBicycle.checked) {
      map.current.addOverlayMapTypeId(mapTypes.bicycle);    
    }
  }

  return (
    <>
        <VuiBox sx={{backgroundColor: "#030c1d", borderRadius:"15px", width:"110%"}} mb={1}> 
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <VuiBox
              display="flex"
            >
              <VuiBox m={1} p={1}>
                <VuiSwitch color="info" id="chkUseDistrict" onClick={setOverlayMapTypeId} />
                <VuiTypography variant="button" fontWeight="regular" color="text">
                  지적편집도 정보 보기
                </VuiTypography>
              </VuiBox>
              <VuiBox m={1} p={1}>
                <VuiSwitch color="info" id="chkTerrain" onClick={setOverlayMapTypeId} />
                <VuiTypography variant="button" fontWeight="regular" color="text">
                  지형정보 보기 
                </VuiTypography>
              </VuiBox>
              <VuiBox m={1} p={1}>
                <VuiSwitch color="info" id="chkTraffic" onClick={setOverlayMapTypeId} />
                <VuiTypography variant="button" fontWeight="regular" color="text">
                  교통정보 보기       
                </VuiTypography>
              </VuiBox>
              <VuiBox m={1} p={1}>
                <VuiSwitch color="info" id="chkBicycle" onClick={setOverlayMapTypeId} />
                <VuiTypography variant="button" fontWeight="regular" color="text">
                  자전거도로 정보 보기
                </VuiTypography>
              </VuiBox>
            </VuiBox>
            <VuiBox width="50%" pl={5}>
              <VuiTypography variant="button" fontWeight="regular" color="text">
                ✅  생활 안전 지도 선택
              </VuiTypography>
                  <Select
                    id="demo-checkbox"
                    value={mapLayoutType}
                    onChange={handleMapLayoutChange}
                    // MenuProps={MenuProps}
                    p={2}
                  >
                    <MenuItem m={1} value={1}>
                      <ListItemText>범죄발생 지도 보기</ListItemText>
                    </MenuItem>
                    <MenuItem value={2}>
                      <ListItemText>교통사고 발생 지도 보기</ListItemText>
                    </MenuItem>
                    <MenuItem value={3}>
                      <ListItemText>화재발생 지도 보기</ListItemText>
                    </MenuItem>
                    <MenuItem value={4}>
                      <ListItemText>생활안전 지도 보기</ListItemText>
                    </MenuItem>
                  </Select>
                </VuiBox>
                <VuiBox py={2} px={5}>
                  <VuiTypography variant="h4" fontWeight="bold" color="text">
                    ⚠️ 표시는 CCTV 취약 지점입니다. CCTV를 설치가 필요한 구역입니다.
                  </VuiTypography>
                </VuiBox>
                </Grid>
                <Grid item xs={5}>
                  <VuiBox>
                    <Gauge guage={guage}/>
                  </VuiBox>
                  <VuiTypography variant="h6" fontWeight="bold" color="text">
                  {mapName} 지역 등급은 현재 {guage} 등급입니다. <span style={{fontSize:"10px"}}>등급은 (0~5) 로 높을 수록 위험합니다.</span>
                  </VuiTypography>
                </Grid>
          </Grid>
        </VuiBox>
      <div id="map" style={{ width: "110%", height: "100%", borderRadius:"20px" }}>
      </div>
    </>
  );
}

export default KakaoMap;