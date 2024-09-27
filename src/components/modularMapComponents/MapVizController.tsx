import React, { useEffect, useState } from "react";

import {
  Marker,
  Popup,
  Tooltip,
  useMap,
  useMapEvents,
  Polygon,
  Circle,
} from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";

import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { markerPath } from "@/utils/leafletConfig";
import { routingUtilExported } from "@/utils/routingUtil";
import { geocodingUtilExported } from "@/utils/geocodingUtil";
import * as h3 from "h3-js";
import {
  h3indexUtil,
  hexBoundaryUtil,
  hexCenterCoordinatesUtil,
} from "@/utils/hexUtils";

import {
  asyncStoreLatLng_LocationHighlighter,
  companyNamesArray,
  companyNamesToIndexArray,
  getCompanyStoresLatLng,
  getMultipleCompanyStoresLatLng,
} from "@/utils/jsonUtils/jsonUtils";

import PopupTabComponent from "../uiComponents/PopupTabComponent";
import MenuRadiusSlider from "../uiComponents/MenuRadiusSlider";
import MenuShowMarkerLabels from "../uiComponents/MenuShowMarkerLabels";
import MenuStoreDropdown from "../uiComponents/MenuStoreDropdown";
import MapVizMarkerComponent from "../uiComponents/MapVizMarkerComponent";
import MenuShowOnlyGapMarkers from "../uiComponents/MenushowOnlyGapMarkers";

// const markerPath = "/marker-icon.png";

/**
 * routeControl2 with current setup is working
 *
 * run operations on this variable to remove waypoints markers, routing points
 *
 */
let routeControl2: L.Routing.Control | null = null;

/**
 *
 * @param props
 * @returns jsx
 *
 * Routing machine
 *
 * holds waypoints & reverseCodedWaypoints states -- currently --might alter later
 *
 * has menu component - trigger routing , clear markers
 *
 * controls map events - double click to place markers ,reverse geocode and then use it routing path
 *
 */
const MapVizController = (props: any) => {
  /**
   * waypoints on double click stored here
   *
   * later used for reverse geocoidng and routing machine
   */
  const [waypoints, setWaypoints] = useState<L.LatLng[] | [] | any[]>([]);

  /**
   * reverse geocoded strings are stored here
   */
  const [reverseCodedWaypoints, setReverseCodedWaypoints] = useState<
    [] | any[] | string[]
  >([]);

  /**
   * routing menu visiblity state
   */
  const [showMenu, setShowMenu] = useState<boolean>(true);

  /**
   * h3index gets stored here
   */
  const [h3IndexList, setH3IndexList] = useState<[] | any[] | string[]>([]);

  /**
   * hexCenterCoordinates gets stored here
   * list of [lat,lng]
   */
  const [hexCenterCoordinatesList, setHexCenterCoordinatesList] = useState<
    [] | any[] | L.LatLng[]
  >([]);

  /**
   * hexBoundary gets stored here
   * list of latlng boundary data
   *  [[lat,lng]]
   */
  const [hexBoundaryList, setHexBoundaryList] = useState<
    [] | any[] | [L.LatLng[]]
  >([]);

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
   * routing util to trigger routing machine path geneartions
   */
  const routingUtil = () => {
    routeControl2 = routingUtilExported(waypoints, mapRef);
  };

  /**
   *
   * @param latLng
   *
   * triggers geocodingUtilExported
   *
   * tries to reverse geocode from latlng and then stores the string value to state
   */
  const geocodingUtil = (latLng: any) => {
    geocodingUtilExported(
      L,
      mapRef,
      latLng,
      reverseCodedWaypoints,
      setReverseCodedWaypoints
    );
  };

  /**
   * clear markers , paths from the map
   */
  const clearUtil = () => {
    mapRef.removeControl(routeControl2 as L.Routing.Control);
  };

  /**
   * reset the waypoint states
   *
   * empty out - waypoints , reversecodedwaypoints , indexlist , hexcenters , hexboundarylist
   */
  const resetWaypointStates = () => {
    setWaypoints([]);
    setReverseCodedWaypoints([]);
    setH3IndexList([]);
    setHexCenterCoordinatesList([]);
    setHexBoundaryList([]);
  };

  /**
   *
   * @param latLng
   *
   * h3combo util
   *
   * generate h3index from latlng and store to state
   *
   * generate hex center coordiantes and store to state
   *
   * generate hex boundary [[lat,lng]] using h3index string and store to state.
   */
  const h3ComboUtil = (latLng: L.LatLng) => {
    // modified version for mapvize
    // setting setH3IndexList empty before each generation
    setH3IndexList([]);
    const h3Index: string = h3indexUtil(latLng, setH3IndexList, 11);

    const hexCenterCoordinates: h3.CoordPair = hexCenterCoordinatesUtil(
      h3Index,
      setHexCenterCoordinatesList
    );

    hexBoundaryUtil(h3Index, setHexBoundaryList);
  };

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
      // const index0storesLatLng = getCompanyStoresLatLng(1);

      const selectedStoresArray = stateCompanySelectorArray;

      // const selectedStoresArray = [0, 1, 2, 3];

      // const selectedStoresArray = [1, 0, 2, 3];

      // const index0storesLatLng =  getMultipleCompanyStoresLatLng(
      //   selectedStoresArray
      // );

      // const index0storesLatLng = Promise.all(
      //   await asyncStoreLatLng_LocationHighlighter(selectedStoresArray, mapRef)
      // ).then((values) => {
      //   setWaypoints(values);
      // });

      const index0storesLatLng = await asyncStoreLatLng_LocationHighlighter(
        selectedStoresArray,
        mapRef
      );

      console.log(index0storesLatLng);
      // add h3 layer for the marker
      // index0storesLatLng?.map((item: any) => h3ComboUtil(item));

      // console.log(
      //   mapRef.distance(index0storesLatLng[0], index0storesLatLng[1]),
      //   "distance"
      // );

      setWaypoints(index0storesLatLng);
    })();
  }, stateCompanySelectorArray);

  useEffect(() => {
    console.log(waypoints, "useeffect waypoints");
  }, [waypoints]);

  useEffect(() => {
    console.log(hexBoundaryList, "useeffect hexBoundaryList");
  }, [hexBoundaryList]);

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

      {
        // showMenu &&

        waypoints.map((waypointData: any, idx: any) =>
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
        )
      }

      {hexBoundaryList?.length > 0 &&
        hexBoundaryList?.map((singileHexCoordinates, idx) => (
          <Polygon
            key={`hex-${idx}`}
            pathOptions={{ color: "red" }}
            positions={
              singileHexCoordinates as
                | L.LatLngExpression[]
                | L.LatLngExpression[][]
                | L.LatLngExpression[][][]
            }
          />
        ))}
    </>
  );
};

export default MapVizController;
