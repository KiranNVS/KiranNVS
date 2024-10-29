let hasInjectedContentScript = false;

function runContentScript() {
  console.log("Content script logic is running.");
}

function handlePageLoad() {
  if (!hasInjectedContentScript) {
    runContentScript();
    hasInjectedContentScript = true;
  }
}

window.addEventListener("DOMContentLoaded", handlePageLoad);
window.addEventListener("popstate", handlePageLoad);
window.addEventListener("hashchange", handlePageLoad);
