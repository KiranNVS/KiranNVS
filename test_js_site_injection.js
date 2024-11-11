(function () {
  // Track whether the content script logic is already injected
  if (!window.isContentScriptInjected) {
    // Initial injection
    injectContentScript();
    window.isContentScriptInjected = true;

  function injectContentScript() {
    // Create a new <script> element and inject it
    const script = document.createElement("script");
    script.src = "https://usc-isi.transcendencelab.org/static/script.js";
    script.onload = () => {
      window.postMessage({ message: "load" }, "*");
    };
    document.head.appendChild(script);
  }
})();
