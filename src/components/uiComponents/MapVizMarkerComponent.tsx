import React from "react";
import { Marker, Popup, Tooltip, Circle } from "react-leaflet";

import { Icon } from "leaflet";

import { markerPath } from "@/utils/leafletConfig";
import PopupTabComponent from "./PopupTabComponent";

const MapVizMarkerComponent = ({
  waypointData,
  showMarkerLabels,
  radius,
}) => {
  return (
    <Marker
      position={[waypointData.lat, waypointData.lng]}
      icon={
        new Icon({
          iconUrl: markerPath,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          className: waypointData?.userOpted ? "hue-rotate-0" : "hue-rotate-90",
        })
      }
    >
      {showMarkerLabels && (
        <Tooltip permanent={true}>
          {`${waypointData?.company} - ${waypointData?.pincode}`}
        </Tooltip>
      )}
      <Popup>
        <PopupTabComponent waypointData={waypointData} />
      </Popup>

      {/**
       * raise radius meters to state variable
       * latLng?.closestStore < 500 --this will display stores in range of lesser than 500meters
       * latLng?.closestStore ? 500 --this will display stores in range of greater than 500meters
       */}
      {/* {latLng?.closestStore !==undefined && latLng?.closestStore < 500 && */}

      {waypointData?.closestStore !== undefined &&
        waypointData?.closestStore > radius && (
          <Circle
            center={{ lat: waypointData?.lat, lng: waypointData?.lng }}
            radius={radius}
            fillOpacity={0.1}
            color="green"
          ></Circle>
        )}
    </Marker>
  );
};

export default MapVizMarkerComponent;
