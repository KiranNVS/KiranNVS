console.log("Hello from script")
if (typeof ENGINE_URL === "undefined" || ENGINE_URL === null) {
  var ENGINE_URL = new URLSearchParams(window.location.search).getAll(
    "isiTesting"
  )[0];
}

function sendEventToEngine(url, eventData) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: encodeURI(JSON.stringify(eventData)),
  });
  console.log(`sent event to engine at ${ENGINE_URL}`);
}

sendEventToEngine(ENGINE_URL, {notebookName: `bioddex_iframe_test`})
