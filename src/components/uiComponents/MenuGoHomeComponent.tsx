import { Chip, Link } from "@nextui-org/react";
import React from "react";

/**
 *
 * @returns jsx component
 *
 * simple go home chip button - to be placed inside menu
 */
const MenuGoHomeComponent = () => {
  return (
    <div className="flex justify-end content-center">
      <Link className="" href="/">
        <Chip>Go Home</Chip>
      </Link>
    </div>
  );
};

export default MenuGoHomeComponent;
