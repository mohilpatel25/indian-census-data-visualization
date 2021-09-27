import React from "react";
import { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { GeoJsonLayer } from "@deck.gl/layers";
import { useSelector } from "react-redux";
import { propertyMap } from "./properties.js";
import states from "../assets/states.json"

const CENTER = [23.878932, 77.502576];
const INITIAL_VIEW_STATE = {
  longitude: CENTER[1],
  latitude: CENTER[0],
  zoom: 4,
  minZoom: 4,
  maxZoom: 4
};

const ON_VIEW_STATE_CHANGE = ({ viewState }) => {
  viewState.longitude = CENTER[1];
  viewState.latitude = CENTER[0];
  return viewState;
};

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json";

export default function Map() {
  const property = useSelector((state) => state.propertyStore.property);

  function getColor(d) {
    for (let i = 0; i < propertyMap["color"].length; i++) {
      if (d > propertyMap[property][i]) return propertyMap["color"][i];
    }
  }

  const layers = [
    new GeoJsonLayer({
      id: "geojson",
      data: states,
      stroked: true,
      filled: true,
      pickable: true,
      getFillColor: (d) => getColor(d.properties[property]),
      updateTriggers: {
        getFillColor: [property]
      },
      getLineColor: [3, 13, 18],
      lineWidthMinPixels: 1,
      onHover: ({ object }) => {
        const el = document.getElementById("info");
        if (object) {
          el.innerHTML = `<b>${object.properties.name}</b><br />
          Population: ${object.properties.population}<br />
          Density(per km<sup>2</sup>): ${object.properties.density}<br />
          Males: ${object.properties.males}<br />
          Females: ${object.properties.females}<br />
          Sex Ratio: ${object.properties.sexRatio}<br />
          Urban: ${object.properties.urban}<br />
          Rural: ${object.properties.rural}<br />`;
        } else {
          el.innerHTML = `Hover on state for details`;
        }
      }
    })
  ];

  return (
    <DeckGL
      layers={layers}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      onViewStateChange={ON_VIEW_STATE_CHANGE}
      getCursor={() => "default"}
    >
      <StaticMap reuseMaps mapStyle={MAP_STYLE} preventStyleDiffing={true} />
    </DeckGL>
  );
}
