import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";

export default function PopupTabComponent({ waypointData }) {
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
      content:<>

<h4 className="font-thin text-lg mt-2 mb-2">{`Rating`}</h4>
          {
            <h5 className="font-thin text-sm bg-blue-200 p-2 text-center">
              {`${waypointData?.rating}`}
            </h5>
          }
          <br />
          <hr />

      <h4 className="font-thin text-lg mt-2 mb-2">{`Total Reviews`}</h4>
          {
            <h5 className="font-thin text-sm bg-blue-200 p-2 text-center">
              {`${waypointData?.reviews}`}
            </h5>
          }
          <br />
          <hr />

      </>
        
    },
    {
      id: "ai_insights",
      label: "AI Insights",
      content:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
