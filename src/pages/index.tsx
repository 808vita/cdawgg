import HomeCardComponent from "@/components/uiComponents/HomeCardComponent";
import React from "react";

export const pagesWithLinksArray = [
  {
    cardHeading: "Identify Location Gaps",
    description:
      "Module- Identifies ideal locations for new stores based on competitor presence.",
    pageLink: "/mapviz",
  },
  {
    cardHeading: "Demand Analysis & Forecast",
    description:
      "Module - Predicts demand for specific products across different regions using historical sales data & competitor data.",
    pageLink: "/forecast",
  },
  {
    cardHeading: "Routing",
    description:
      "Module - Creates efficient delivery routes that minimize delivery times and enhance customer satisfaction.",
    pageLink: "/routing",
  },
  {
    cardHeading: "Reviews Processor ",
    description:
      "(use moderately on deployed version) Module - For preprocessing reviews data (use/ test moderately - sends api calls under the RPM limits)",
    pageLink: "/reviews_processor",
  },
];
/**
 * 
 * @returns page jsx
 * 
 * home page for CDAWGG
 */
const index = () => {
  return (
    <>
      <div className="flex justify-center content-center">
        <h1 className="m-8 text-yellow-500 text-5xl md:text-8xl font-thin tracking-wide">
          CDAWGG
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-2 lg:gap-3 justify-center content-center">
        {pagesWithLinksArray.map((pageItem) => (
          <HomeCardComponent key={pageItem.cardHeading} pageItem={pageItem} />
        ))}
      </div>
    </>
  );
};

export default index;
