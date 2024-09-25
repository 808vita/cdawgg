import { systemSafeGuardInstructions, identifyProductsPromptWithoutGuard, identifyIssuesPromptWithoutGuard, identifyGoodHighlightsPromptWithoutGuard } from "./prompts";

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
};

/**
 * names list of system prompts
 */
export const availableSysPrompts = Object.keys(systemPromptsObject);
