import React from "react";
import { Marker, Popup, Tooltip, Circle } from "react-leaflet";

import { Icon } from "leaflet";

import { markerPath } from "@/utils/leafletConfig";

import ForecastPopupTabComponent from "./ForecastPopupTabComponent";
/**
 *
 * @param ({
  waypointData,
  showMarkerLabels,
  radius,
}) 
 * @returns jsx component
 *
 * forecast viz marker component
 * handles marker , tooltip , popup & conditionally renders the circle range
 */
const ForecastVizMarkerComponent = ({
  waypointData,
  showMarkerLabels,
  radius,
}) => {
  return (
    <>
      {(waypointData?.userOpted ||
        (waypointData?.closestStore !== undefined &&
          waypointData?.closestStore < radius)) && (
        <Marker
          position={[waypointData.lat, waypointData.lng]}
          icon={
            new Icon({
              iconUrl: markerPath,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              className: waypointData?.userOpted
                ? "hue-rotate-0"
                : "hue-rotate-90",
            })
          }
        >
          {showMarkerLabels && (
            <Tooltip permanent={true}>
              {`${waypointData?.company} - ${waypointData?.pincode}`}
            </Tooltip>
          )}
          <Popup>
            <ForecastPopupTabComponent waypointData={waypointData} />
          </Popup>

          {waypointData?.userOpted && (
            <Circle
              center={{ lat: waypointData?.lat, lng: waypointData?.lng }}
              radius={radius}
              fillOpacity={0.1}
              color="green"
            ></Circle>
          )}
        </Marker>
      )}
    </>
  );
};

export default ForecastVizMarkerComponent;
