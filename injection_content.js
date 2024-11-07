window.addEventListener("message", (event) => {
  if (event.origin !== window.location.origin) return;

  // Handle the message
  if (event.data.message === "load") {
    console.log("Test Loaded. Ready to work on things now.");
  }
});
