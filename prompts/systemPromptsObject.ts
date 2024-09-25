import { systemSafeGuardInstructions, identifyProductsPromptWithoutGuard, identifyIssuesPromptWithoutGuard, identifyGoodHighlightsPromptWithoutGuard } from "./prompts";

export const systemPromptsObject = {
  identifyProductsPrompt: {
    text: `${systemSafeGuardInstructions}
    ${identifyProductsPromptWithoutGuard}`,
  },

  identifyIssuesPromptWithoutGuard: {
    text: `${systemSafeGuardInstructions}
    ${identifyIssuesPromptWithoutGuard}`,
  },

  identifyGoodHighlightsPromptWithoutGuard: {
    text: `${systemSafeGuardInstructions}
    ${identifyGoodHighlightsPromptWithoutGuard}`,
  },
};

/**
 * names list of system prompts
 */
export const availableSysPrompts = Object.keys(systemPromptsObject);
