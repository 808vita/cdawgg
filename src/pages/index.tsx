import HomeCardComponent from "@/components/uiComponents/HomeCardComponent";
import { Accordion, AccordionItem } from "@nextui-org/react";

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
      <div className="align-center">
        <div className="mt-5 lg:max-w-5xl">
          <Accordion variant="splitted">
            <AccordionItem
              key="1"
              aria-label="Grounding With Google Search"
              title="Grounding With GOOGLE Search"
            >
              Phase 2 of the Location Gaps module introduced a new feature to
              explore and connect with new data points, such as regional
              population, commercial rent rates, and current real estate rates.
              This feature leverages Google Search to improve accuracy and
              provide citations. It demonstrates the capability to connect
              relevant external data and the scope for expanding to meet custom
              requirements.
              <hr />
              Note for Judges: Google Search grounding is a preview feature with
              API call limits. Avoid triggering multiple searches
              simultaneously.
              {[
                {
                  cardHeading: "Identify Location Gaps",
                  description:
                    "Module- Identifies ideal locations for new stores based on competitor presence.",
                  pageLink: "/mapviz",
                },
              ].map((pageItem) => (
                <HomeCardComponent
                  key={pageItem.cardHeading}
                  pageItem={pageItem}
                />
              ))}
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="Routing Simulator + Package Damage Detection"
              title="Routing Simulator - Package Damage Detection"
            >
              Phase 2 expands the Routing Module's capabilities. After routing a
              path, a simulation can be triggered. The Package Damage feature,
              using the multimodal Gemini model, detects damage using the mock
              delivery proof image. This feature is pluggable—it can be quickly
              added as a plugin layer without disrupting existing workflows or
              setups.
              {[
                {
                  cardHeading: "V2 Routing + Simulator",
                  description:
                    "Module - Expands upon Routing Module brining simulation & package damage detection capabilities using Google Gemini AI",
                  pageLink: "/routing-sim",
                },
              ].map((pageItem) => (
                <HomeCardComponent
                  key={pageItem.cardHeading}
                  pageItem={pageItem}
                />
              ))}
            </AccordionItem>

            <AccordionItem
              key="3"
              aria-label="Phase 2 - Improvements Video"
              title="Phase 2 - Improvements Video"
            >
              Video showcasing Phase 2 improvements.
              <div className="flex-col justify-center content-center">
                <video width="320" controls preload="none">
                  <source
                    src="/embed_phase2_cdawgg_trimmed.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default index;
