import shopsData from "../../data/overview_data_business_name_placeid_dict.json";

export const companyNamesArray = Object.keys(shopsData);

export const getCompanyStoresLatLng = (companyNameIndex) => {
  const selectedCompany = companyNamesArray[companyNameIndex];
  const storesLatLngArray = Object?.values(shopsData[selectedCompany]);

  return storesLatLngArray;
};

export const getMultipleCompanyStoresLatLng = (companyNameIndexArray) => {
  const selectedCompanyArray = companyNameIndexArray?.map(
    (item) => companyNamesArray[item]
  );

  const multipleCompanyStoresArray = selectedCompanyArray
    .map((company) => Object?.values(shopsData[company]))
    .flat();

  return multipleCompanyStoresArray;
};

export const arrayInsertorUserOptedKeyValue = (userOptedStoreLatLngArray) => {
  return userOptedStoreLatLngArray.map((item) => ({
    ...item,
    userOpted: true,
  }));
};

export const asyncStoreLatLng_LocationHighlighter = async (
  companyNameIndexArray,
  mapRef
) => {
  if (companyNameIndexArray?.length === 1) {
    return getMultipleCompanyStoresLatLng(companyNameIndexArray);
  }

  const companyNameIndexArray_copy = [...companyNameIndexArray];

  //userOptedStore stores the first item in the  selectedCompanyArray
  // after "shift" the remaining items in selectedCompanyArray are competitors
  const userOptedStore = await companyNameIndexArray_copy.shift();

  console.log(userOptedStore, "shift");
  console.log(companyNameIndexArray_copy, "after shift");

  const selectedCompanyArray = companyNameIndexArray_copy?.map(
    (item) => companyNamesArray[item]
  );

  const userOptedStoreLatLngArray = arrayInsertorUserOptedKeyValue(
    await getCompanyStoresLatLng(userOptedStore)
  );

  // stores the competitior list
  const competitorMultipleCompanyStoresArray = await selectedCompanyArray
    .map((company) => Object?.values(shopsData[company]))
    .flat();

  // console.log(
  //   mapRef.distance(index0storesLatLng[0], index0storesLatLng[1]),
  //   "distance"
  // );

  const competitorStoresWithDistanceMeasured =
    competitorMultipleCompanyStoresArray?.map((competitorStore: any) => {
      const closestUserOptedDistance = userOptedStoreLatLngArray.map(
        (optedStore) =>
          mapRef.distance(
            { lat: optedStore?.lat, lng: optedStore?.lng },
            { lat: competitorStore?.lat, lng: competitorStore?.lng }
          )
      );

      return {
        ...competitorStore,
        closestStore: Math.min(...closestUserOptedDistance),
      };
    });

  return [
    ...userOptedStoreLatLngArray,
    ...competitorStoresWithDistanceMeasured,
  ];
};
