import React, { useEffect } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import {
  companyNamesObjectWithBranchArray,
  getStoreBranchData,
} from "@/utils/jsonUtils/jsonUtils";

/**
 *
 * @param ({
  branchDropdownSelectedKeys,
  setBranchDropdownSelectedKeys,
  dropdownSelectedKeys,
})
 * @returns jsx component
 *
 * branch dropdown selector
 * handles & sets states for critical useEffect side effects
 *
 */
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
          ].map((branchId, index) => (
            <SelectItem key={branchId}>{branchId}</SelectItem>
          ))}
      </Select>
      <p className="text-small text-default-500">
        Selected:
        {["district", "pincode"].map(
          (item) =>
            getStoreBranchData(
              Array.from(dropdownSelectedKeys)[0] as string,
              Array.from(branchDropdownSelectedKeys)[0] as string
            )?.[item] + " "
        )}
      </p>
    </div>
  );
}
