import React, { useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import {
  companyNamesArray,
  companyNamesToIndexArray,
  companyNamesToIndexObj,
} from "@/utils/jsonUtils/jsonUtils";

export default function MenuStoreDropdown({
  dropdownSelectedKeys,
  setDropdownSelectedKeys,
  setStateCompanySelectorArray,
}) {
  useEffect(() => {
    console.log(companyNamesToIndexObj, "obj");
    console.log(dropdownSelectedKeys, "dropdownSelectedKeys");
    console.log(Array.from(dropdownSelectedKeys)[0], "dropdownSelectedKeys");
    console.log(
      companyNamesToIndexObj[Array.from(dropdownSelectedKeys)[0] as number],
      "dropdownSelectedKeys"
    );

    console.log(companyNamesToIndexArray, "companyNamesToIndexArray");

    let newArray = [...companyNamesToIndexArray];
    console.log(newArray, "newArray");

    newArray.unshift(
      newArray.splice(
        newArray.findIndex(
          (elt) =>
            elt ===
            companyNamesToIndexObj[
              Array.from(dropdownSelectedKeys)[0] as number
            ]
        ),
        1
      )[0]
    );

    console.log(newArray, "newArray");
    setStateCompanySelectorArray(newArray);
  }, [dropdownSelectedKeys]);

  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Button variant="bordered" className="capitalize">
          {dropdownSelectedKeys}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Select Store"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        // @ts-ignore
        dropdownSelectedKeys={dropdownSelectedKeys}
        // @ts-ignore
        onSelectionChange={setDropdownSelectedKeys}
      >
        {companyNamesArray.map((company, index) => (
          <DropdownItem key={company}>{company}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
