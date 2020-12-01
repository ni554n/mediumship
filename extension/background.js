chrome.webRequest.onBeforeSendHeaders.addListener(
  modifyReferer,
  { urls: chrome.runtime.getManifest().permissions.slice(2) },
  [
    "blocking",
    "requestHeaders",
    "extraHeaders"
  ]
);

function modifyReferer(details) {
  const requestHeaders = details.requestHeaders.filter(({ name }) => name.toLowerCase() !== "referer");
  requestHeaders.push({ name: "Referer", value: randomTwitterReferrer() });

  return { requestHeaders };
}

// Looks like the specific Referrer header value: https://t.co/JV5396gd2O is blocked
// In order to bypass this, generate "random" header values
// Pick a random number between 1 and 2
// Convert to Base 36 (so it should be alphanumeric)
// Get first 10 characters after decimal
function randomTwitterReferrer() {
  const linkId = (1 + Math.random()).toString(36).substring(2, 12);
  return `https://t.co/${linkId}`;
}
