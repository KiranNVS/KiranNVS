// content.js
window.addEventListener("message", (event) => {
  if (event.origin !== window.location.origin) return;

  if (event.data.message === "load") {
    console.log("Content script loaded.");
  } else if (event.data.message === "pageUpdated") {
    console.log("Content script detected page update in SPA.");
  }
});
