import { Select, SelectItem, Avatar } from "@nextui-org/react";
import { useState } from "react";

export const availableQuestions = [
  {
    id: 0,
    name: "Good highlights about the branch?",
  },
  {
    id: 1,
    name: "Which products received good reviews?",
  },
  {
    id: 2,
    name: "Which products received bad reviews?",
  },
  {
    id: 3,
    name: "Common issues mentioned by customers?",
  },
  {
    id: 4,
    name: "Provide improvements tips.",
  },
];

export default function MapVizAiInsightsSelectorComponent() {
  const [value, setValue] = useState(new Set([]));
  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      <Select
        items={availableQuestions}
        label="Available Questions"
        placeholder="Select a question"
        selectedKeys={value}
        //@ts-ignore
        onSelectionChange={setValue}
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
      <p className="text-small text-default-500">
        Selected:{" "}
        {`${Array.from(value)?.[0]} - ${
          availableQuestions?.[Array.from(value)?.[0]]?.["name"]
        }`}
      </p>
    </div>
  );
}
