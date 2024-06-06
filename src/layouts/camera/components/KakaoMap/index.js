
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import React, { useEffect, useRef, useState } from "react";


const {kakao} = window;
function KakaoMap({position, setPosition}) {
  // 카카오 API 호출
  const apiKey = process.env.REACT_APP_KEY_KAKAO_1;

  const map = useRef();
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services,clusterer&autoload=false`;
    document.head.appendChild(script);
  
    script.addEventListener("load", () => {
      window.kakao.maps.load(() => {
        map.current = new window.kakao.maps.Map(document.getElementById('map'), { // 지도를 표시할 div
          center: new window.kakao.maps.LatLng(position.latitude, position.longitude), // 지도의 중심좌표 
          level: 2 // 지도의 확대 레벨 
        });

  
        // 마커가 표시될 위치입니다 
        var markerPosition = new window.kakao.maps.LatLng(position.latitude, position.longitude);
  
        // 마커를 생성합니다
        var marker = new window.kakao.maps.Marker({
          position: markerPosition
        });
  
        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map.current);
  
        // 마커가 드래그 가능하도록 설정합니다 
        marker.setDraggable(true);
        
        window.kakao.maps.event.addListener(marker, 'dragend', function() {
          var currentPos = marker.getPosition();
          console.log('position : ', position);
          setPosition({            
            latitude: currentPos.Ma,
            longitude: currentPos.La
          });
          console.log('currentPos : ',currentPos);
        });
      });
    });
  }, []);


  return (
    <>
      <div id="map" style={{ width: "100%", height: "100%" }}>

      </div>
    </>
  );
}

export default KakaoMap;