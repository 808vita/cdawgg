/**
 * promptSelectionObject - is used while doing multi parted api calls
 */
export const promptSelectionObject = {
  identifyProductsPrompt: "identifyProductsPrompt",
  identifyIssuesPromptWithoutGuard: "identifyIssuesPromptWithoutGuard",
  identifyGoodHighlightsPromptWithoutGuard:
    "identifyGoodHighlightsPromptWithoutGuard",
};

/**
 * availablePromptsArray - available types of prompts
 */
export const availablePromptsArray = Object.values(promptSelectionObject);
