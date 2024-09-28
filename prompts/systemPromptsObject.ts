import {
  systemSafeGuardInstructions,
  identifyProductsPromptWithoutGuard,
  identifyIssuesPromptWithoutGuard,
  identifyGoodHighlightsPromptWithoutGuard,
  insightsQuestionGoodHighlightsPromptWithoutGuard,
  insightsQuestionIdentifyProductsPromptWithoutGuard,
  insightsQuestionIssuesMentionedPromptWithoutGuard,
  insightsQuestionProvideImprovementTipsPromptWithoutGuard,
} from "./prompts";

export const systemPromptsObject = {
  identifyProductsPrompt: {
    text: `${systemSafeGuardInstructions}
    ${identifyProductsPromptWithoutGuard}`,
  },

  identifyIssuesPrompt: {
    text: `${systemSafeGuardInstructions}
    ${identifyIssuesPromptWithoutGuard}`,
  },

  identifyGoodHighlightsPrompt: {
    text: `${systemSafeGuardInstructions}
    ${identifyGoodHighlightsPromptWithoutGuard}`,
  },

  insightsQuestionGoodHighlightsPrompt: {
    text: `${systemSafeGuardInstructions}
    ${insightsQuestionGoodHighlightsPromptWithoutGuard}`,
  },

  insightsQuestionIdentifyProductsPrompt: {
    text: `${systemSafeGuardInstructions}
    ${insightsQuestionIdentifyProductsPromptWithoutGuard}`,
  },
  insightsQuestionIssuesMentioned: {
    text: `${systemSafeGuardInstructions}
    ${insightsQuestionIssuesMentionedPromptWithoutGuard}`,
  },
  insightsQuestionProvideImprovementTips: {
    text: `${systemSafeGuardInstructions}
    ${insightsQuestionProvideImprovementTipsPromptWithoutGuard}`,
  },
};

/**
 * names list of system prompts
 */
export const availableSysPrompts = Object.keys(systemPromptsObject);
