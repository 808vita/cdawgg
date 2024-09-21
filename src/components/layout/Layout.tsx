
import React from "react";
import { Providers } from "../providers/ProviderNextUI";
/**
 *
 * @param param0
 * @returns React.JSX.Element
 *
 * layout
 *
 */
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <div className="flex justify-center content-center">
        <div className="w-full">
          {children}
        </div>
      </div>
    </Providers>
  );
};

export default Layout;