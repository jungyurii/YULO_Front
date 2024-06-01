
import { cctv_info } from "layouts/cameraMap/data/positions";
import React, { useEffect, useRef, useState } from "react";


function KakaoMap({position}) {
  // 카카오 API 호출
  const apiKey = process.env.REACT_APP_KEY_KAKAO_1;
  const [mapTypes, setMapTypes] = useState({});
  const map = useRef();
  const cluseterMap = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services,clusterer,drawing&autoload=false`;
    document.head.appendChild(script);
  
    script.addEventListener("load", () => {
      window.kakao.maps.load(() => {
        map.current = new window.kakao.maps.Map(document.getElementById('map'), { // 지도를 표시할 div
          center: new window.kakao.maps.LatLng(position.latitude, position.longitude), // 지도의 중심좌표 
          level: 9 // 지도의 확대 레벨 
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
        
        
        
        var markers = cctv_info.positions.map(function(position) {
            return new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(position.lat, position.lng)
            });
        });
        // 클러스터러에 마커들을 추가합니다
        cluseterMap.current.addMarkers(markers);
      });
    });
  }, []);

  const setOverlayMapTypeId = () => {
    console.log("함수 실행: %o", mapTypes.useDistrict);
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
      <p>
        <input type="checkbox" id="chkUseDistrict" onClick={setOverlayMapTypeId} /> 지적편집도 정보 보기
        <input type="checkbox" id="chkTerrain" onClick={setOverlayMapTypeId} /> 지형정보 보기 
        <input type="checkbox" id="chkTraffic" onClick={setOverlayMapTypeId} /> 교통정보 보기       
        <input type="checkbox" id="chkBicycle" onClick={setOverlayMapTypeId} /> 자전거도로 정보 보기
      </p>
      <div id="map" style={{ width: "100%", height: "100%" }}>

      </div>
    </>
  );
}

export default KakaoMap;