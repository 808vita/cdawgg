/**
 *
 * @param text
 * @returns string text
 *
 * takes in stringed text data
 * properly inserts escape characters
 * this is to avoid gemini api call errors about text
 */
export const escapeSpecialChars = function (text: string) {
  return text
    .replace(/\\n/g, "\\n")
    .replace(/\\'/g, "\\'")
    .replace(/\\"/g, '\\"')
    .replace(/\\&/g, "\\&")
    .replace(/\\r/g, "\\r")
    .replace(/\\t/g, "\\t")
    .replace(/\\b/g, "\\b")
    .replace(/\\f/g, "\\f");
};
