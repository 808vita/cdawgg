import { promptSelectionObject } from "@/utils/helpers/promptSelection";
import { Select, SelectItem } from "@nextui-org/react";

export const availableQuestions = [
  {
    id: 0,
    name: "Good highlights about the branch?",
    prompt: promptSelectionObject.insightsQuestionGoodHighlightsPrompt,
  },
  {
    id: 1,
    name: "Which products received good reviews?",
    prompt: promptSelectionObject.insightsQuestionIdentifyProductsPrompt,
  },
  {
    id: 2,
    name: "Which products received bad reviews?",
    prompt: promptSelectionObject.insightsQuestionIdentifyProductsPrompt,
  },
  {
    id: 3,
    name: "Common issues mentioned by customers?",
    prompt: promptSelectionObject.insightsQuestionIssuesMentioned,
  },
  {
    id: 4,
    name: "Provide improvements tips.",
    prompt: promptSelectionObject.insightsQuestionProvideImprovementTips,
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
export default function MapVizAiInsightsSelectorComponent({
  selectorValue,
  setSelectorValue,
}) {
  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      <Select
        items={availableQuestions}
        label="Available Questions"
        placeholder="Select a question"
        selectedKeys={selectorValue}
        // @ts-ignore
        onSelectionChange={setSelectorValue}
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
