import React, { useEffect, useState } from "react";

import { useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";

import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import "leaflet/dist/leaflet.css";

import {
  asyncStoreLatLng_LocationHighlighter,
  companyNamesArray,
  companyNamesToIndexArray,
} from "@/utils/jsonUtils/jsonUtils";

import MenuRadiusSlider from "../uiComponents/MenuRadiusSlider";
import MenuShowMarkerLabels from "../uiComponents/MenuShowMarkerLabels";
import MenuStoreDropdown from "../uiComponents/MenuStoreDropdown";
import MapVizMarkerComponent from "../uiComponents/MapVizMarkerComponent";
import MenuShowOnlyGapMarkers from "../uiComponents/MenuShowOnlyGapMarkers";

/**
 *
 * @param props
 * @returns jsx
 *
 * holds all the components which makes up identify gap location module & acts as the controller point.
 *
 * has menu component - company dropdown,sliders , display labels toggle , display only gap toggle
 *
 * marker popup - for general information , ratings details and AI insights
 *
 * controls map events - double click to place markers
 *
 * holds the main states
 *
 */
const MapVizController = (props: any) => {
  /**
   * waypoints - holds the store location data
   * and is used for plotting of markers on to the map.
   */
  const [waypoints, setWaypoints] = useState<L.LatLng[] | [] | any[]>([]);

  /**
   * routing menu visiblity state
   */
  const [showMenu, setShowMenu] = useState<boolean>(true);

  const [radius, setRadius] = useState(2000);
  const [showMarkerLabels, setShowMarkerLabels] = useState(true);
  const [showOnlyGapMarkers, setShowOnlyGapMarkers] = useState(false);
  const [dropdownSelectedKeys, setDropdownSelectedKeys] = React.useState(
    new Set([companyNamesArray[0]])
  );
  const [stateCompanySelectorArray, setStateCompanySelectorArray] = useState(
    companyNamesToIndexArray
  );

  /**
   * menu visibility handler
   */
  const showMenuHandler = () => {
    setShowMenu((prev) => !prev);
  };

  /**
   * leaflet mapref used for various operations
   */
  const mapRef: L.Map = useMap();

  /**
   *
   * @param e
   *
   * uses latlng from event object and adds it to waypoints state
   *
   * if menu state is false -> sets the menu visibility to true
   *
   * triggers the geocoding util for reverse geocoding latng to stringed address
   */
  const doubleClickEventUtil = (e: L.LeafletMouseEvent | any) => {
    let latLng: L.LatLng = e.latlng;
    console.log(latLng, "double click");
  };

  /**
   * holds the mapevents
   *
   * double click map event is configured here
   */
  const mapEvents: L.Map = useMapEvents({
    click: (e) => {
      console.log(e);
      console.log(e.layerPoint);
    },
    dblclick: (e) => {
      doubleClickEventUtil(e);
    },
  });

  useEffect(() => {
    (async () => {
      const selectedStoresArray = stateCompanySelectorArray;

      const index0storesLatLng = await asyncStoreLatLng_LocationHighlighter(
        selectedStoresArray,
        mapRef
      );

      console.log(index0storesLatLng);

      setWaypoints(index0storesLatLng);
    })();
  }, stateCompanySelectorArray);

  useEffect(() => {
    console.log(waypoints, "useeffect waypoints");
  }, [waypoints]);

  return (
    <>
      <button
        onClick={showMenuHandler}
        className="w-20 h-auto"
        style={{
          position: "absolute",
          background: "#452568",
          zIndex: 600,
          color: "white",
        }}
      >
        <p className="text-4xl align-middle text-center text-lg font-thin ">
          {showMenu
            ? "X"
            : !showMenu && waypoints.length == 0
            ? "R"
            : !showMenu && waypoints.length > 0 && "~R~"}
        </p>
      </button>

      {showMenu && (
        <div
          className="min-h-12 w-screen md:w-1/2 p-4"
          style={{
            position: "absolute",
            background: "#fff",
            zIndex: 500,
          }}
        >
          <div className={`p-3 align-middle text-center text-lg font-thin`}>
            Identify Location Gaps
            <hr />
          </div>

          <div className="pb-3">
            <h4>Select Your Company</h4>
            <MenuStoreDropdown
              dropdownSelectedKeys={dropdownSelectedKeys}
              setDropdownSelectedKeys={setDropdownSelectedKeys}
              setStateCompanySelectorArray={setStateCompanySelectorArray}
            />
          </div>

          <MenuRadiusSlider radius={radius} setRadius={setRadius} />

          <MenuShowMarkerLabels
            showMarkerLabels={showMarkerLabels}
            setShowMarkerLabels={setShowMarkerLabels}
          />
          <br />
          <MenuShowOnlyGapMarkers
            showOnlyGapMarkers={showOnlyGapMarkers}
            setShowOnlyGapMarkers={setShowOnlyGapMarkers}
          />
        </div>
      )}

      {waypoints.map((waypointData: any, idx: any) =>
        showOnlyGapMarkers ? (
          waypointData?.closestStore !== undefined &&
          waypointData?.closestStore > radius && (
            <MapVizMarkerComponent
              key={`marker-${idx}`}
              waypointData={waypointData}
              showMarkerLabels={showMarkerLabels}
              radius={radius}
            />
          )
        ) : (
          <MapVizMarkerComponent
            key={`marker-${idx}`}
            waypointData={waypointData}
            showMarkerLabels={showMarkerLabels}
            radius={radius}
          />
        )
      )}
    </>
  );
};

export default MapVizController;
