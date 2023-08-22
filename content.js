(function () {
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

  document.addEventListener("keydown", function (event) {
    chrome.storage.local.get("swechoHotkey", function (data) {
      const hotkey = (data.swechoHotkey || "C").toUpperCase();
      if (event.ctrlKey && event.shiftKey && event.code === `Key${hotkey}`) {
        const activeElement = document.activeElement;
        if (
          activeElement.tagName === "INPUT" &&
          activeElement.closest("tr[data-param-name]")
        ) {
          const paramName = activeElement
            .closest("tr[data-param-name]")
            .getAttribute("data-param-name");
          const matchingInputs = document.querySelectorAll(
            `tr[data-param-name="${paramName}"] input[type="text"]`
          );
          for (let match of matchingInputs) {
            if (match.value && match !== activeElement) {
              activeElement.value = match.value;
              break;
            }
          }
        }
      }
    });
  });
})();
