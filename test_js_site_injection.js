let observer = new MutationObserver((mutations) => {
  // mutations.forEach((mutation) => {
  //   let oldValue = mutation.oldValue;
  //   let newValue = mutation.target.textContent;
  //   if (oldValue !== newValue) {
  //       console.log("Testing Biodex js site injection")
  //   }
  // });
  if (mutations.length > 0) {
    console.log("Testing Biodex js site injection")
  }
});

observer.observe(document.body, {
  characterDataOldValue: true,
  childList: true, 
  characterData: true
});
