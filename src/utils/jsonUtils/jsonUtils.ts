import shopsData from "../../data/overview_data_business_name_placeid_dict.json";
import reviewsData from "../..//data/overview_with_reviews_data_business_name_placeid_dict.json";

import goodHighlightsProcessed_BundledReviewsDict from "../../data/processed/identifyGoodHighlightsPrompt_processedBundledReviewsDict.json";
import issuesProcessed_BundledReviewsDict from "../../data/processed/identifyIssuesPrompt_processedBundledReviewsDict.json";
import productsProcessed_BundledReviewsDict from "../../data/processed/identifyProductsPrompt_processedBundledReviewsDict.json";

import goodHighlightsProcessed_MonthlySplitReviewsDict from "../../data/processed/identifyGoodHighlightsPromptprocessedMonthSplitReviewsDict.json";
import issuesProcessed_MonthlySplitReviewsDict from "../../data/processed/identifyIssuesPromptprocessedMonthSplitReviewsDict.json";
import productsProcessed_MonthlySplitReviewsDict from "../../data/processed/identifyProductsPromptprocessedMonthSplitReviewsDict.json";
import { promptSelectionObject } from "../helpers/promptSelection";

/**
 * shops name array
 */
export const companyNamesArray = Object.keys(shopsData);

/**
 * company name as key with array of branches
 */
export const companyNamesObjectWithBranchArray = (() => {
  let companyBranches = {};

  companyNamesArray.map((item) => {
    companyBranches[item] = Object.keys(shopsData[item]);
  });

  return companyBranches;
})();

/**
 *
 * @param company string
 * @param branch string
 * @returns [lat,lng]
 *
 * takes in company name (string) & branch (place_id - string)
 * returns [lat,lng]
 */
export const getStoreLatLng = (company: string, branch: string) => {
  const branchData = shopsData[company][branch];
  const latlng: [number, number] = [branchData?.lat, branchData?.lng];
  return latlng;
};

/**
 *
 * @param company string
 * @param branch string
 * @returns { complete place_id data }
 *
 * takes in company name (string) & branch (place_id - string)
 * { complete place_id data }
 */
export const getStoreBranchData = (company: string, branch: string) => {
  const branchData = shopsData[company][branch];
  return branchData;
};
/**
 *
 * @returns {companyName:index}
 * returns an object of {companyName:index}
 */
export const makeCompanyNamesToIndexObj = () => {
  let companyObj = {};
  companyNamesArray.forEach((company, index) => {
    companyObj[company] = index;
  });
  return companyObj;
};

/**
 * an object of {companyName:index}
 */
export const companyNamesToIndexObj = makeCompanyNamesToIndexObj();

/**
 * an array of index values from Object.values({companyName:index})
 *
 */
export const companyNamesToIndexArray = Object.values(companyNamesToIndexObj);

/**
 *
 * @param companyNameIndex index
 * @returns {complete place_id data}
 *
 * takes in index
 * and returns {complete place_id data}
 */
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

export const reviewsDataArraySeperateObj = Object.values(reviewsData);

export const combinedReviewsDataObj = Object.assign(
  {},
  ...reviewsDataArraySeperateObj
);

export const placeIdArray = Object.keys(combinedReviewsDataObj);

export const asyncBranchLatLng_LocationHighlighter = async (
  companyNameIndexArray,
  company,
  branchId,
  mapRef
) => {
  const selectedCompanyWithAllBranchesDataArray =
    getMultipleCompanyStoresLatLng(companyNameIndexArray);

  const companyNameIndexArray_copy = [...companyNameIndexArray];

  //userOptedStore stores the first item in the  selectedCompanyArray
  // after "shift" the remaining items in selectedCompanyArray are competitors
  const userOptedStore = await companyNameIndexArray_copy.shift();

  console.log(userOptedStore, "shift");
  console.log(companyNameIndexArray_copy, "after shift");

  const selectedCompanyArray = companyNameIndexArray_copy?.map(
    (item) => companyNamesArray[item]
  );

  const userOptedStoreLatLngArray = arrayInsertorUserOptedKeyValue([
    await getStoreBranchData(company, branchId),
  ]);

  // stores the competitior list
  const competitorMultipleCompanyStoresArray = await selectedCompanyArray
    .map((company) => Object?.values(shopsData[company]))
    .flat();

  selectedCompanyWithAllBranchesDataArray.map(
    (item) =>
      item.place_id !== branchId &&
      competitorMultipleCompanyStoresArray.push(item)
  );

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
        // closestStore: Math.min(...closestUserOptedDistance),
        closestStore: closestUserOptedDistance[0],
      };
    });

  return [
    ...userOptedStoreLatLngArray,
    ...competitorStoresWithDistanceMeasured,
  ];
};

export const mapVizInsightsProcessor = (
  place_id,
  prompt,
  identifyGoodProducts = false
) => {
  let processedData = "";
  goodHighlightsProcessed_BundledReviewsDict;
  issuesProcessed_BundledReviewsDict;
  productsProcessed_BundledReviewsDict;

  if (promptSelectionObject.insightsQuestionGoodHighlightsPrompt === prompt) {
    let branchData = goodHighlightsProcessed_BundledReviewsDict[place_id];

    let dataArray = ["4_star", "5_star"].map((item) => branchData[item]);

    processedData = dataArray.flat().toString();
  } else if (promptSelectionObject.insightsQuestionIssuesMentioned === prompt) {
    let branchData = issuesProcessed_BundledReviewsDict[place_id];

    let dataArray = ["1_star", "2_star", "3_star"].map(
      (item) => branchData[item]
    );

    processedData = dataArray.flat().toString();
  } else if (
    promptSelectionObject.insightsQuestionIdentifyProductsPrompt === prompt
  ) {
    if (identifyGoodProducts) {
      let branchData = productsProcessed_BundledReviewsDict[place_id];

      let dataArray = ["4_star", "5_star"].map((item) => branchData[item]);

      processedData = dataArray.flat().toString();
    } else {
      let branchData = productsProcessed_BundledReviewsDict[place_id];

      let dataArray = ["1_star", "2_star", "3_star"].map(
        (item) => branchData[item]
      );

      processedData = dataArray.flat().toString();
    }
  } else if (
    promptSelectionObject.insightsQuestionProvideImprovementTips === prompt
  ) {
    let branchDataGoodHighlights =
      goodHighlightsProcessed_BundledReviewsDict[place_id];
    let branchDataIssues = issuesProcessed_BundledReviewsDict[place_id];

    let ratingArray = ["1_star", "2_star", "3_star", "4_star", "5_star"];
    let dataArrayGoodHighlights = ratingArray
      .map((item) => branchDataGoodHighlights[item])
      .flat();
    let dataArrayIssues = ratingArray
      .map((item) => branchDataIssues[item])
      .flat();

    processedData = dataArrayGoodHighlights.concat(dataArrayIssues).toString();
  }

  return processedData;
};

export const monthSplitProcessor = (
  place_id,
  month,
  prompt,
  identifyGoodProducts = false
) => {
  let processedData = "";

  if (promptSelectionObject.insightsQuestionIssuesMentioned === prompt) {
    let branchData = issuesProcessed_MonthlySplitReviewsDict[place_id]?.[month];

    let dataArray = branchData;

    processedData = branchData ? dataArray.toString() : "";
  } else if (
    promptSelectionObject.insightsQuestionIdentifyProductsPrompt === prompt
  ) {
    if (identifyGoodProducts) {
      let branchData =
        productsProcessed_MonthlySplitReviewsDict[place_id]?.[month];

      let dataArray = branchData;

      processedData = branchData ? dataArray.toString() : "";
    } else {
      let branchData =
        productsProcessed_MonthlySplitReviewsDict[place_id]?.[month];

      let dataArray = branchData;

      processedData = branchData ? dataArray.toString() : "";
    }
  }

  return processedData;
};

export const analysisInsightsProcessor = (
  uniqueWaypointsCurrentRegion,
  month,
  prompt,
  identifyGoodProducts
) => {
  let processedData = "";

  uniqueWaypointsCurrentRegion.map((store) =>
    console.log(
      "analysis insights",
      store.place_id,
      month,
      prompt,
      identifyGoodProducts
    )
  );

  uniqueWaypointsCurrentRegion.map(
    (store) =>
      (processedData =
        processedData +
        monthSplitProcessor(
          store.place_id,
          month,
          prompt,
          identifyGoodProducts
        ))
  );

  return processedData;
};
