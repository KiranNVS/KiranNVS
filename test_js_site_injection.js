// Detect when the page is fully loaded
window.addEventListener("load", () => {
  if (!window.isContentScriptInjected) {
    injectContentScript();
    window.isContentScriptInjected = true;
  }
});

function injectContentScript() {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/gh/KiranNVS/KiranNVS.github.io@latest/injection_content.js";
  script.onload = () => {
    window.postMessage(
      { message: "load" },
      "*"
    );
  };
  document.head.appendChild(script);
}
