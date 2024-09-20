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
