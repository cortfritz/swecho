const isSwaggerPage = document.querySelector("body > div#swagger-ui");

if (!isSwaggerPage) {
  // Exit the script if it's not a Swagger page
  return;
}

document.addEventListener("input", function (event) {
  // Fetch the 'swechoEnabled' value from Chrome storage
  chrome.storage.local.get("swechoEnabled", function (data) {
    if (
      event.target.tagName === "INPUT" &&
      event.target.closest("tr[data-param-name]") &&
      data.swechoEnabled
    ) {
      const paramName = event.target
        .closest("tr[data-param-name]")
        .getAttribute("data-param-name");
      const value = event.target.value;

      // Find all input fields with the same parameter name and update them
      const matchingInputs = document.querySelectorAll(
        `tr[data-param-name="${paramName}"] input[type="text"]`
      );
      matchingInputs.forEach((input) => {
        if (input !== event.target) {
          // Exclude the input that triggered the event
          input.value = value;
        }
      });
    }
  });
});

// Initialize a MutationObserver to watch for changes in the DOM
const observer = new MutationObserver((mutationsList) => {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList" || mutation.type === "attributes") {
      const inputs = document.querySelectorAll('input[type="text"]');
      inputs.forEach((input) => {
        if (!input.disabled && !input.value) {
          const paramName = input
            .closest("tr[data-param-name]")
            .getAttribute("data-param-name");
          const matchingInputs = document.querySelectorAll(
            `tr[data-param-name="${paramName}"] input[type="text"]`
          );
          for (let match of matchingInputs) {
            if (match.value) {
              input.value = match.value;
              break;
            }
          }
        }
      });
    }
  }
});

// Start observing the document with the configured parameters
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ["disabled"],
});
