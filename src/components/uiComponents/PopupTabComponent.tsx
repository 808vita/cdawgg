import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Button,
  Accordion,
  AccordionItem,
  Link,
} from "@nextui-org/react";
import MapVizAiInsightsSelectorComponent, {
  availableQuestions,
} from "./MapVizAiInsightsSelectorComponent";
import { useEffect, useState } from "react";
import { backend_call_genani_ai_insights } from "@/utils/fetchHandlers/fetch_gemini_api_call_ai_insights";
import { promptSelectionObject } from "@/utils/helpers/promptSelection";
import { mapVizInsightsProcessor } from "@/utils/jsonUtils/jsonUtils";
import Markdown from "react-markdown";
import React from "react";
import MapVizSelectorPhase2Component, {
  availablePhase2Questions,
} from "./MapVizSelectorPhase2Component";
import { testGroundedDataV2 } from "@/utils/vetexaiHelpers/testGroundedDataV2";
/**
 *
 * @param ({ waypointData })
 * @returns jsx component
 *
 * popup component displays - general information , rating details & ai insights
 *
 * for ai insights - gemini api calls - fetch requests handler function exists here
 */
export default function PopupTabComponent({ waypointData }) {
  const [selectorValue, setSelectorValue] = useState(new Set([]));
  const [selectorPhase2Value, setSelectorPhase2Value] = useState(new Set([]));
  const [loadingState, setLoadingState] = useState(false);
  const [fetchedInsightsData, setFetchedInsightsData] = useState("");
  const [fetchedPhase2Data, setFetchedPhase2Data] = useState("");
  const [citationData, setCitationData] = useState([]);

  const ai_insights_call_handler = async () => {
    let selectedPrompt =
      availableQuestions?.[Array.from(selectorValue)?.[0] as number]?.[
        "prompt"
      ];

    let identifyGoodProductsBool =
      availableQuestions?.[Array.from(selectorValue)?.[0] as number]?.[
        "name"
      ] === "Which products received good reviews?";

    let requiredBranchData = mapVizInsightsProcessor(
      waypointData.place_id,
      selectedPrompt,
      identifyGoodProductsBool
    );

    console.log(selectedPrompt, "selectedPrompt");
    console.log(identifyGoodProductsBool, "identifyGoodProductsBool");
    console.log(requiredBranchData, "requiredBranchData");

    const responseFromGemini = await backend_call_genani_ai_insights(
      requiredBranchData,
      promptSelectionObject[selectedPrompt],
      setLoadingState
    );

    if (!responseFromGemini?.error) {
      // set the sucess content to the correct state
      console.log(responseFromGemini, "responseFromGemini");
      console.log(waypointData, "waypointData");
      console.log(responseFromGemini?.test_content, "responseFromGemini");
      setFetchedInsightsData(responseFromGemini?.text_content);
    }

    if (responseFromGemini?.error) {
      console.log(responseFromGemini?.error, "responseFromGemini?.error");
      setFetchedInsightsData(`error occured please retry.`);
    }
  };

  const phase2_insights_call_handler = async (selectedQuestion) => {
    console.log(selectedQuestion, "selectedQuestion");
    setCitationData([]);
    const responseFromGemini = await testGroundedDataV2(
      selectedQuestion,
      setLoadingState
    );

    if (!responseFromGemini?.error) {
      // set the sucess content to the correct state
      console.log(responseFromGemini, "responseFromGemini");
      console.log(waypointData, "waypointData");
      console.log(
        responseFromGemini?.candidates[0].content.parts[0].text,
        "responseFromGemini"
      );
      setFetchedPhase2Data(
        responseFromGemini?.candidates[0].content.parts[0].text
      );
      setCitationData(
        responseFromGemini?.candidates[0].groundingMetadata.groundingChunks
      );
    }

    if (responseFromGemini?.error) {
      console.log(responseFromGemini?.error, "responseFromGemini?.error");
      setFetchedPhase2Data(`error occured please retry.`);
    }
  };

  let tabs = [
    {
      id: "general",
      label: "General",
      content: (
        <>
          <Accordion defaultExpandedKeys={["general"]}>
            <AccordionItem key="general" aria-label="general" title="General">
              <h4 className="font-thin text mt-1 mb-1">{`Company:`}</h4>
              {
                <h5 className="font-thin text-sm bg-blue-200 p-2 text-center">
                  {`${waypointData?.company}`}
                </h5>
              }
              <br />
              <hr />
              <h4 className="font-thin text mt-1 mb-1">{`District - Pincode:`}</h4>
              {
                <h5 className="font-thin text-sm bg-blue-200 p-2 text-center">
                  {`${waypointData?.district} - ${waypointData?.pincode}`}
                </h5>
              }
              <br />
              <hr />
              <h4 className="font-thin text mt-1 mb-1">{`Marker LatLng:`}</h4>
              <h5 className="font-thin text-sm bg-blue-200 p-2 text-center">
                {`Lat:${waypointData?.lat} , Lng:${waypointData?.lng}`}
              </h5>
              <br />
            </AccordionItem>
            <AccordionItem key="rating" aria-label="rating" title="Ratings">
              <>
                <h4 className="font-thin text mt-1 mb-1">{`Rating`}</h4>
                {
                  <h5 className="font-thin text-sm bg-blue-200 p-2 text-center">
                    {`${waypointData?.rating}`}
                  </h5>
                }
                <br />
                <hr />

                <h5 className="font-thin text mt-1 mb-1">{`Total Reviews`}</h5>
                {
                  <h6 className="font-thin text bg-blue-200 p-1 text-center">
                    {`${waypointData?.reviews}`}
                  </h6>
                }
                <br />
                <hr />

                <Accordion>
                  <AccordionItem key="1" aria-label="Details" title="Details">
                    <h5 className="font-thin text mt-1 mb-1">{`5 Star Reviews`}</h5>
                    {
                      <h6 className="font-thin text bg-blue-200 p-1 text-center">
                        {`${waypointData?.reviews_stats?.["5_star"]}`}
                      </h6>
                    }

                    <h5 className="font-thin text mt-1 mb-1">{`4 Star Reviews`}</h5>
                    {
                      <h6 className="font-thin text bg-blue-200 p-1 text-center">
                        {`${waypointData?.reviews_stats?.["4_star"]}`}
                      </h6>
                    }

                    <h5 className="font-thin text mt-1 mb-1">{`3 Star Reviews`}</h5>
                    {
                      <h6 className="font-thin text bg-blue-200 p-1 text-center">
                        {`${waypointData?.reviews_stats?.["3_star"]}`}
                      </h6>
                    }

                    <h5 className="font-thin text mt-1 mb-1">{`2 Star Reviews`}</h5>
                    {
                      <h6 className="font-thin text bg-blue-200 p-1 text-center">
                        {`${waypointData?.reviews_stats?.["2_star"]}`}
                      </h6>
                    }

                    <h5 className="font-thin text mt-1 mb-1">{`1 Star Reviews`}</h5>
                    {
                      <h6 className="font-thin text bg-blue-200 p-1 text-center">
                        {`${waypointData?.reviews_stats?.["1_star"]}`}
                      </h6>
                    }
                  </AccordionItem>
                </Accordion>
              </>
            </AccordionItem>
          </Accordion>
        </>
      ),
    },
    {
      id: "ai_insights",
      label: "AI Insights",
      content: (
        <>
          {!loadingState && (
            <MapVizAiInsightsSelectorComponent
              selectorValue={selectorValue}
              setSelectorValue={setSelectorValue}
            />
          )}
          {(Array.from(selectorValue)?.[0] as number) >= 0 && (
            <p className="text-small text-default-500">
              Selected -
              {` ${
                availableQuestions?.[
                  Array.from(selectorValue)?.[0] as number
                ]?.["name"]
              }`}
            </p>
          )}
          <>
            {(Array.from(selectorValue)?.[0] as number) >= 0 && (
              <>
                {!loadingState ? (
                  <Button
                    variant="shadow"
                    color="primary"
                    size="md"
                    className="m-4"
                    onClick={ai_insights_call_handler}
                  >
                    ASK AI
                  </Button>
                ) : (
                  <Button color="secondary" isLoading>
                    Processing
                  </Button>
                )}
              </>
            )}

            <div className="max-h-60">
              <h4 className="font-extralight">
                <Markdown>{fetchedInsightsData}</Markdown>
              </h4>
            </div>
          </>
        </>
      ),
    },
    {
      id: "spacer",
      label: "*Phase 2*",
      content: (
        <>
          {!loadingState && (
            <MapVizSelectorPhase2Component
              selectorPhase2Value={selectorPhase2Value}
              setSelectorPhase2Value={setSelectorPhase2Value}
            />
          )}
          {(Array.from(selectorPhase2Value)?.[0] as number) >= 0 && (
            <p className="text-small text-default-500">
              Selected -
              {` ${
                availablePhase2Questions?.[
                  Array.from(selectorPhase2Value)?.[0] as number
                ]?.["name"]
              } in ${waypointData.district + " " + waypointData.pincode} ?`}
            </p>
          )}
          <>
            {(Array.from(selectorPhase2Value)?.[0] as number) >= 0 && (
              <>
                {!loadingState ? (
                  <Button
                    variant="shadow"
                    color="primary"
                    size="md"
                    className="m-4"
                    onClick={() =>
                      (Array.from(selectorPhase2Value)?.[0] as number) >= 0 &&
                      phase2_insights_call_handler(
                        `${
                          availablePhase2Questions?.[
                            Array.from(selectorPhase2Value)?.[0] as number
                          ]?.["name"]
                        } in ${
                          waypointData.district + " " + waypointData.pincode
                        } ?`
                      )
                    }
                  >
                    ASK AI
                  </Button>
                ) : (
                  <Button color="secondary" isLoading>
                    Processing
                  </Button>
                )}
              </>
            )}

            <div className="max-h-60">
              <h4 className="font-extralight">
                <Markdown>{fetchedPhase2Data}</Markdown>
              </h4>
              <div className="flex-col">
                {citationData?.map((citation) => (
                  <div key={citation?.web?.uri}>
                    <Link
                      className="text-xs font-extralight"
                      href={citation?.web?.uri}
                      target="_blank"
                    >
                      {citation?.web?.title}
                    </Link>
                  </div>
                ))}
              </div>
              <p className="font-extralight text-xs">
                Grounding with Google Search
              </p>
            </div>
          </>
        </>
      ),
    },
  ];

  useEffect(() => {
    console.log(selectorValue, "useEffect selectorvalue");

    setFetchedInsightsData("");
  }, [selectorValue]);

  useEffect(() => {
    console.log(selectorValue, "useEffect selectorvalue");

    setFetchedPhase2Data("");
    setCitationData([]);
  }, [selectorPhase2Value]);

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Dynamic tabs" items={tabs}>
        {(item) => (
          <Tab key={item.id} title={item.label}>
            <Card>
              <CardBody>{item.content}</CardBody>
            </Card>
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
