window.addEventListener("message", (event) => {
  if (event.origin !== window.location.origin) {
    console.log("Something else is happening");
    return;}

  // Handle the message
  if (event.data.message === "load") {
    console.log("Test Loaded. Ready to work on things now.");
  }
});
