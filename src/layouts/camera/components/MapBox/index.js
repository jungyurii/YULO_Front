import ReactMapboxGl, { Layer,Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { Component } from 'react';
import pin from "assets/images/small-logos/marker.png"

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_KEY_MAPBOX
});

const mapStyle = {
  flex: 1
};

const paintLayer = {
  'fill-extrusion-color': '#aaa',
  'fill-extrusion-height': {
    type: 'identity',
    property: 'height'
  },
  'fill-extrusion-base': {
    type: 'identity',
    property: 'min_height'
  },
  'fill-extrusion-opacity': 0.6
};

class MapBox extends Component {
  constructor(props) {
    super(props);
    this.zoom = [15];
    this.bearing = [-60];
    this.pitch = [60];
    this.state = {
      // center: [0.6597909, 37.4510414], // 기본 값 설정
      center: [126.6597909, 37.4510414], // 기본 값 설정
      markerPosition: [126.6597909, 37.4510414] // 기본 마커 위치
    };
  }

  onMarkerDragEnd = (coordinates) => {
    console.log("이벤트 발생");
    this.setState({ markerPosition: coordinates });
  };

  componentDidMount() {
    const { position } = this.props;
    if (position) {
      const { longitude, latitude } = position;
      this.setState({
        center: [longitude, latitude]
      });
    }
  }

  render() {
    return (
      <Map
        style="mapbox://styles/mapbox/light-v10"
        containerStyle={mapStyle}
        zoom={this.zoom}
        center={this.state.center}
        pitch={this.pitch}
        bearing={this.bearing}
      >
        <Layer
          id="3d-buildings"
          sourceId="composite"
          sourceLayer="building"
          filter={['==', 'extrude', 'true']}
          type="fill-extrusion"
          minZoom={14}
          paint={paintLayer}
        />
        <Marker
          coordinates={this.state.markerPosition}
          draggable={true}
          color="red"
          onDragEnd={this.onMarkerDragEnd}
        >
          <img src={pin} />
        </Marker>
      </Map>
    );
  }
}

export default MapBox;
