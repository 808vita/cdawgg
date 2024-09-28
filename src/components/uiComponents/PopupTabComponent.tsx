import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  Button,
} from "@nextui-org/react";
import MapVizAiInsightsSelectorComponent from "./MapVizAiInsightsSelectorComponent";
import { useState } from "react";

export default function PopupTabComponent({ waypointData }) {
  const [selectorValue, setSelectorValue] = useState(new Set([]));

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
          <MapVizAiInsightsSelectorComponent
            selectorValue={selectorValue}
            setSelectorValue={setSelectorValue}
          />
          <>
            {(Array.from(selectorValue)?.[0] as number) >= 0 && (
              <>
                <Button
                  variant="shadow"
                  color="primary"
                  size="md"
                  className="m-4"
                  onClick={() =>
                    console.log(
                      "oof",
                      Array.from(selectorValue)?.[0],
                      waypointData
                    )
                  }
                >
                  ASK AI
                </Button>
              </>
            )}
            <div>
              "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.",
            </div>
          </>
        </>
      ),
    },
  ];

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
