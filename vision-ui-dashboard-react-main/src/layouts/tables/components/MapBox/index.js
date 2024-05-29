import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useRef, useState } from 'react';
import marker from "assets/images/small-logos/marker.png"



const Map = ReactMapboxGl({
  accessToken:
    process.env.REACT_APP_KEY_MAPBOX
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

class MapBox extends React.Component {
  constructor(props) {
    super(props);
    this.zoom = [15];
    this.bearing = [-60];
    this.pitch = [60];
    this.center = [-0.0824952, 51.5144951];
    this.onStyleLoad = this.onStyleLoad.bind(this);
  }

  onStyleLoad(map) {
    const { onStyleLoad } = this.props;
    return onStyleLoad && onStyleLoad(map);
  }

  render() {
    return (
      React.createElement(Map, {
        style: "mapbox://styles/mapbox/light-v9",
        containerStyle: mapStyle,
        onStyleLoad: this.onStyleLoad,
        zoom: this.zoom,
        center: this.center,
        pitch: this.pitch,
        bearing: this.bearing
      },
      React.createElement(Layer, {
        id: "3d-buildings",
        sourceId: "composite",
        sourceLayer: "building",
        filter: ['==', 'extrude', 'true'],
        type: "fill-extrusion",
        minZoom: 14,
        paint: paintLayer
      }))
    );
  }
}

export default MapBox;