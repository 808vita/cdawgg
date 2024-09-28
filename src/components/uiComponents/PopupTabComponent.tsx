import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Button,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import MapVizAiInsightsSelectorComponent, {
  availableQuestions,
} from "./MapVizAiInsightsSelectorComponent";
import { useEffect, useState } from "react";
import { backend_call_genani_ai_insights } from "@/utils/fetchHandlers/fetch_gemini_api_call_ai_insights";
import { promptSelectionObject } from "@/utils/helpers/promptSelection";
import { mapVizInsightsProcessor } from "@/utils/jsonUtils/jsonUtils";
import Markdown from "react-markdown";

export default function PopupTabComponent({ waypointData }) {
  const [selectorValue, setSelectorValue] = useState(new Set([]));
  const [loadingState, setLoadingState] = useState(false);
  const [fetchedInsightsData, setFetchedInsightsData] = useState("");

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

  let tabs = [
    {
      id: "general",
      label: "General",
      content: (
        <>
          <h4 className="font-thin text-lg mt-2 mb-2">{`Company:`}</h4>
          {
            <h5 className="font-thin text-sm bg-blue-200 p-2 text-center">
              {`${waypointData?.company}`}
            </h5>
          }
          <br />
          <hr />
          <h4 className="font-thin text-lg mt-2 mb-2">{`District - Pincode:`}</h4>
          {
            <h5 className="font-thin text-sm bg-blue-200 p-2 text-center">
              {`${waypointData?.district} - ${waypointData?.pincode}`}
            </h5>
          }
          <br />
          <hr />
          <h4 className="font-thin text-lg mt-2 mb-2">{`Marker LatLng:`}</h4>
          <h5 className="font-thin text-sm bg-blue-200 p-2 text-center">
            {`Lat:${waypointData?.lat} , Lng:${waypointData?.lng}`}
          </h5>
          <br />
        </>
      ),
    },
    {
      id: "ratings",
      label: "Ratings",
      content: (
        <>
          <h4 className="font-thin text-lg mt-2 mb-2">{`Rating`}</h4>
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
              Selected:
              {`${Array.from(selectorValue)?.[0]} - ${
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
  ];

  useEffect(() => {
    console.log(selectorValue, "useEffect selectorvalue");

    setFetchedInsightsData("");
  }, [selectorValue]);

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
