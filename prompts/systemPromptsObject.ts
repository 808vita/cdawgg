import { systemSafeGuardInstructions, testPromptWithoutGuard } from "./prompts";

export const systemPromptsObject = {
  testPrompt: {
    text: `${systemSafeGuardInstructions}
    ${testPromptWithoutGuard}`,
  },
};

/**
 * names list of system prompts
 */
export const availableSysPrompts = Object.keys(systemPromptsObject);
