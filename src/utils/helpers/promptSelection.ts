/**
 * promptSelectionObject - is used while doing multi parted api calls
 */
export const promptSelectionObject = {
  identifyProductsPrompt: "identifyProductsPrompt",
  identifyIssuesPrompt: "identifyIssuesPrompt",
  identifyGoodHighlightsPrompt: "identifyGoodHighlightsPrompt",
  insightsQuestionGoodHighlightsPrompt: "insightsQuestionGoodHighlightsPrompt",
  insightsQuestionIdentifyProductsPrompt:
    "insightsQuestionIdentifyProductsPrompt",
  insightsQuestionIssuesMentioned: "insightsQuestionIssuesMentioned",
  insightsQuestionProvideImprovementTips:
    "insightsQuestionProvideImprovementTips",
};

/**
 * availablePromptsArray - available types of prompts
 */
export const availablePromptsArray = Object.values(promptSelectionObject);
