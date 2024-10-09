import { Select, SelectItem } from "@nextui-org/react";

export const availablePhase2Questions = [
  {
    id: 0,
    name: "Commercial space showroom rent - low to high range",
    prompt: "",
  },

  {
    id: 1,
    name: "Population estimates",
    prompt: "",
  },

  {
    id: 2,
    name: "Real estate plot per sqft rates",
    prompt: "",
  },
];
/**
 *
 * @param   ({
  selectorValue,
  setSelectorValue,
})
 * @returns jsx component
 *
 * question selector component used in AI insights popup tab
 * sets states which later controls the prompts for gemini api call
 */
export default function MapVizSelectorPhase2Component({
  selectorPhase2Value,
  setSelectorPhase2Value,
}) {
  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      <Select
        items={availablePhase2Questions}
        label="Phase2 - Questions"
        placeholder="Select a question"
        selectedKeys={selectorPhase2Value}
        // @ts-ignore
        onSelectionChange={setSelectorPhase2Value}
        labelPlacement="outside"
        classNames={{
          base: "max-w-lg",
          trigger: "h-12",
        }}
        renderValue={(questions) => {
          return questions.map((item) => (
            <div key={item.key} className="flex items-center gap-2">
              <div className="flex flex-col">
                <span>{item.data.name}</span>
              </div>
            </div>
          ));
        }}
      >
        {(question) => (
          <SelectItem key={question.id} textValue={question.name}>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <span className="text-small">{question.name}</span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
    </div>
  );
}
