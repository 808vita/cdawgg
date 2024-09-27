import React, { useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import {
  companyNamesArray,
  companyNamesObjectWithBranchArray,
  companyNamesToIndexArray,
  companyNamesToIndexObj,
} from "@/utils/jsonUtils/jsonUtils";

export default function MenuBranchDropdown({
  branchDropdownSelectedKeys,
  setBranchDropdownSelectedKeys,
  dropdownSelectedKeys,
}) {
  useEffect(() => {
    console.log(branchDropdownSelectedKeys, "branchDropdownSelectedKeys");
  }, [branchDropdownSelectedKeys]);

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        label="Selected Branch"
        variant="bordered"
        placeholder="Select Branch"
        selectedKeys={branchDropdownSelectedKeys}
        className="max-w-xs"
        onSelectionChange={setBranchDropdownSelectedKeys}
        selectionMode="single"
      >
        {dropdownSelectedKeys &&
          companyNamesObjectWithBranchArray[
            Array.from(dropdownSelectedKeys)[0] as string
          ].map((company, index) => (
            <SelectItem key={company}>{company}</SelectItem>
          ))}
      </Select>
      <p className="text-small text-default-500">
        Selected: {branchDropdownSelectedKeys}
      </p>
    </div>
  );
}
