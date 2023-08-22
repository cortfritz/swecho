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
