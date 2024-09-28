import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  Button,
} from "@nextui-org/react";
import MapVizAiInsightsSelectorComponent, {
  availableQuestions,
} from "./MapVizAiInsightsSelectorComponent";
import { useEffect, useState } from "react";
import { backend_call_genani_ai_insights } from "@/utils/fetchHandlers/fetch_gemini_api_call_ai_insights";
import { promptSelectionObject } from "@/utils/helpers/promptSelection";
import { mapVizInsightsProcessor } from "@/utils/jsonUtils/jsonUtils";

export default function PopupTabComponent({ waypointData }) {
  const [selectorValue, setSelectorValue] = useState(new Set([]));
  const [loadingState, setLoadingState] = useState(false);
  const [fetchedInsightsData, setFetchedInsightsData] = useState("");

  const branchData = [
    "Refrigerator booked with full payment and not delivered as promised.. waited two days and the there was no information from the Viveks side about the delay till I called the staff many times and asked.. initially phone was also not answered and I had to call many times for the updates where as they could have informed about delay. could have informed me prior about delay so that I would not have wasted my time and leave while waiting for delivery.. still am waiting today at home only for the delivery and no information so far , calls are also not being answered as well.. Very poor Customer care!!",
    "I had the worst experience buying a Crompton pedestal fan yesterday. I asked them to open and check it once, but they refused, stating that it was a sealed piece and there would be no issues. However, after opening the box at home, I noticed extensive wear and tear on the fan, making it appear used. The wires were tied with a rubber band, and there was a significant amount of dust all around. The paint had worn off in many places. I called customer service, and they assured me that the branch would contact me, but I havent received any calls yet. I have tried calling them, but they havent picked up. If Viveks sees this review, please help solve my problem.",
    "Very bad.staff billed me Rs380/- for extended warranty without my permission.",
    "good service",
    "Good service",
    "We have ordered and paid full payment on 14th January for purchase of 7 kg Samsung washing mc top model and concerned salesman assured it wl be delivered on 14th itself..till this time, it is not delivered, after 3 days..such a poor service..nobody is picking up the phone",
    "Ive purchase Bosch washing machine on 18 sep 2022, As per your sales officer telling free of cost for delivery. But Delivery agent Pandian is asking extra money and we provide 100 rs he is asking exta money behaving very rudely.",
  ];

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

            <div>
              <h4 className="font-extralight">{fetchedInsightsData}</h4>
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
