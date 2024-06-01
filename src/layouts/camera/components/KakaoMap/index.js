
import React, { useEffect, useRef, useState } from "react";


const {kakao} = window;
function KakaoMap({position}) {
  // 카카오 API 호출
  const apiKey = process.env.REACT_APP_KEY_KAKAO_1;
  const [mapTypes, setMapTypes] = useState({});
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
  
        // var geocoder = new window.kakao.maps.services.Geocoder();

  
        // // 마커가 표시될 위치입니다 
        // var markerPosition = new window.kakao.maps.LatLng(position.latitude, position.longitude);
  
        // // 마커를 생성합니다
        // var marker = new window.kakao.maps.Marker({
        //   position: markerPosition
        // });
  
        // // 마커가 지도 위에 표시되도록 설정합니다
        // marker.setMap(map);
  
        // // 마커가 드래그 가능하도록 설정합니다 
        // marker.setDraggable(true);
  
        // // 마커 클러스터러를 생성합니다 
        // var clusterer = new window.kakao.maps.MarkerClusterer({
        //   map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
        //   averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
        //   minLevel: 10 // 클러스터 할 최소 지도 레벨 
        // });

        // 데이터를 가져오기 위해 jQuery를 사용합니다
        // 데이터를 가져와 마커를 생성하고 클러스터러 객체에 넘겨줍니다
        // $.get("/download/web/data/chicken.json", function (data) {
        //   // 데이터에서 좌표 값을 가지고 마커를 표시합니다
        //   // 마커 클러스터러로 관리할 마커 객체는 생성할 때 지도 객체를 설정하지 않습니다
        //   var markers = $(data.positions).map(function (i, position) {
        //     return new window.kakao.maps.Marker({
        //       position: new window.kakao.maps.LatLng(position.lat, position.lng)
        //     });
        //   });
  
        //   // 클러스터러에 마커들을 추가합니다
        //   clusterer.addMarkers(markers);
        // });
        setMapTypes({
          terrain : window.kakao.maps.MapTypeId.TERRAIN,    
          traffic :  window.kakao.maps.MapTypeId.TRAFFIC,
          bicycle : window.kakao.maps.MapTypeId.BICYCLE,
          useDistrict : window.kakao.maps.MapTypeId.USE_DISTRICT
        })

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