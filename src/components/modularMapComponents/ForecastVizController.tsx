import React, { useEffect, useState } from "react";

import { useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";

import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import "leaflet/dist/leaflet.css";

import {
  asyncBranchLatLng_LocationHighlighter,
  companyNamesArray,
  companyNamesObjectWithBranchArray,
  companyNamesToIndexArray,
  getStoreLatLng,
} from "@/utils/jsonUtils/jsonUtils";

import MenuRadiusSlider from "../uiComponents/MenuRadiusSlider";
import MenuShowMarkerLabels from "../uiComponents/MenuShowMarkerLabels";
import MenuStoreDropdown from "../uiComponents/MenuStoreDropdown";

import MenuBranchDropdown from "../uiComponents/MenuBranchDropdown";
import ForecastVizMarkerComponent from "../uiComponents/ForecastVizMarkerComponent";
import { uniqueArrayPlaceIdObjectsOnly } from "@/utils/forecastVizHelpers/forecastVizHelpers";
import MenuGoHomeComponent from "../uiComponents/MenuGoHomeComponent";

/**
 *
 * @param props
 * @returns jsx
 *
 * holds all the components which makes up forecast module & acts as the controller point.
 *
 * has menu component - company dropdown , branch selector ,sliders , display labels toggle
 *
 * marker popup - for general information , ratings details and AI insights
 *
 * controls map events - double click to place markers
 *
 * holds the main states
 *
 */
const ForecastVizController = (props: any) => {
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

  const [dropdownSelectedKeys, setDropdownSelectedKeys] = useState(
    new Set([companyNamesArray[0]])
  );
  const [branchDropdownSelectedKeys, setBranchDropdownSelectedKeys] = useState(
    new Set([companyNamesObjectWithBranchArray[companyNamesArray[0]][0]])
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
      let company = Array.from(dropdownSelectedKeys)?.[0] as string;
      let branchId = Array.from(branchDropdownSelectedKeys)?.[0] as string;

      const index0storesLatLng = await asyncBranchLatLng_LocationHighlighter(
        selectedStoresArray,
        company,
        branchId,
        mapRef
      );

      console.log(index0storesLatLng);

      const selectedBranchWithOtherStoresInRange = index0storesLatLng.filter(
        (item) => item?.userOpted || (item?.closestStore < radius && item)
      );

      const uniqueValues = uniqueArrayPlaceIdObjectsOnly(
        selectedBranchWithOtherStoresInRange
      );
      console.log("selectedBranchWithOtherStoresInRange", uniqueValues);
      setWaypoints(uniqueValues);
    })();
  }, [...stateCompanySelectorArray, branchDropdownSelectedKeys, radius]);

  useEffect(() => {
    console.log(waypoints, "useeffect waypoints");
  }, [waypoints]);

  useEffect(() => {
    console.log(
      dropdownSelectedKeys,
      " dropdownSelectedKeys -- branchDropdownSelectedKeys "
    );

    setBranchDropdownSelectedKeys(
      new Set([
        companyNamesObjectWithBranchArray[
          Array.from(dropdownSelectedKeys)[0] as string
        ][0],
      ])
    );
  }, [dropdownSelectedKeys]);

  useEffect(() => {
    console.log(branchDropdownSelectedKeys, "branchDropdownSelectedKeyss");
    let company = Array.from(dropdownSelectedKeys)?.[0] as string;
    let branchId = Array.from(branchDropdownSelectedKeys)?.[0] as string;
    if (!branchId || !company) {
      console.log(company, "company");
      console.log(branchId, "branch");
      console.log("returned without latlng call");
    }

    let branchLatLng = getStoreLatLng(company, branchId);
    console.log(branchLatLng, "branchLatLng");

    if (branchLatLng[0]) {
      mapRef.setView(branchLatLng, 14);
    }
  }, [branchDropdownSelectedKeys]);

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
          <MenuGoHomeComponent />
          <div className={`p-3 align-middle text-center text-lg font-thin`}>
            Demand Analysis & Forecast
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
          <div className="pb-3">
            <h4>Select Branch</h4>
            <MenuBranchDropdown
              branchDropdownSelectedKeys={branchDropdownSelectedKeys}
              setBranchDropdownSelectedKeys={setBranchDropdownSelectedKeys}
              dropdownSelectedKeys={dropdownSelectedKeys}
            />
          </div>

          <MenuRadiusSlider radius={radius} setRadius={setRadius} />
          <p className="text-small text-default-500">
            (Data Augmentation Search Radius)
          </p>
          <br />
          <MenuShowMarkerLabels
            showMarkerLabels={showMarkerLabels}
            setShowMarkerLabels={setShowMarkerLabels}
          />
        </div>
      )}

      {waypoints.map((waypointData: any, idx: any) => (
        <ForecastVizMarkerComponent
          key={`marker-${idx}`}
          waypointData={waypointData}
          showMarkerLabels={showMarkerLabels}
          radius={radius}
        />
      ))}
    </>
  );
};

export default ForecastVizController;
