import { Select, SelectItem } from "@nextui-org/react";

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const monthsArray = months.map((month, index) => ({
  id: index,
  name: month,
}));

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
export default function ForecastMonthSelectorComponent({
  monthSelectorValue,
  setMonthSelectorValue,
}) {
  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      <Select
        items={monthsArray}
        //pass index to disable keys
        disabledKeys={[]}
        label="Select A Month"
        placeholder="Select Month"
        selectedKeys={monthSelectorValue}
        // @ts-ignore
        onSelectionChange={setMonthSelectorValue}
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
