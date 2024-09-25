import React, { useState } from "react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { availablePromptsArray } from "@/utils/helpers/promptSelection";

export default function ReviewProcessorRadioSelector({
  promptSelectorState,
  setPromptSelectorState,
}) {
  return (
    <div className="flex flex-col gap-3">
      <RadioGroup
        label="Select Prompt"
        value={promptSelectorState}
        onValueChange={setPromptSelectorState}
      >
        {availablePromptsArray.map((option) => (
          <Radio key={option} value={option}>
            {option}
          </Radio>
        ))}
      </RadioGroup>
      <p className="text-default-500 text-small">
        Selected: {promptSelectorState}
      </p>
    </div>
  );
}
