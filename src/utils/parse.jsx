// This function is used to decode the HTML entities
// returned by the API call
function decodeHtmlText(text) {
  let textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
}

export { decodeHtmlText };
