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
              Phase 2 - Part of Location Gaps Module - introduced new feature to
              explore and connect with new data points like population for
              region , commerical rent rates & ongoing realestate rates.
              Grounding powered by Google Search to improve accuracy with
              citations. Demonstrating capabilities to connect relevant external
              data and scopes for expansion of custom requirements.
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
              Phase 2 - Expands upon Routing Module capabilities. After routing
              a path Simulation can use triggered. Package Damage feature using
              multimodal Gemini Model detects damages using the mock delivery
              proof image. Pluggable - quickly add on damage detection as plugin
              layer without disrupting the workflows & existing setups.
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
              Video showcasing the improvements made in Phase2.
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
