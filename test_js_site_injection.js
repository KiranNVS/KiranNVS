(function () {
  // Track whether the content script logic is already injected
  if (!window.isContentScriptInjected) {
    // Initial injection
    injectContentScript();
    window.isContentScriptInjected = true;

    // Override pushState and replaceState
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
      originalPushState.apply(this, args);
      window.dispatchEvent(new Event("spa-navigation"));
    };

    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      window.dispatchEvent(new Event("spa-navigation"));
    };

    // Listen for SPA navigation (popstate and custom events)
    window.addEventListener("popstate", () => {
      window.dispatchEvent(new Event("spa-navigation"));
    });
    window.addEventListener("spa-navigation", onSPAnavigation);
  }

  function injectContentScript() {
    // Create a new <script> element and inject it
    const script = document.createElement("script");
    script.src = "https://usc-isi.transcendencelab.org/static/script.js";
    script.onload = () => {
      window.postMessage({ message: "load" }, "*");
    };
    document.head.appendChild(script);
  }

  function onSPAnavigation() {
    // Re-inject or notify content script
    if (!window.isContentScriptInjected) {
      injectContentScript();
      window.isContentScriptInjected = true;
    } else {
      window.postMessage({ message: "pageUpdated" }, "*");
    }
  }
})();
