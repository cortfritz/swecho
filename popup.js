document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        code: 'document.querySelector("body > div#swagger-ui") !== null;',
      },
      (results) => {
        if (results && results[0] && results[0].result) {
          // It's a Swagger page, enable the functionality
          document.getElementById("copyAction").disabled = false;
          document.getElementById("status").textContent =
            "This is a Swagger page.";
        } else {
          // Not a Swagger page, disable the functionality
          document.getElementById("copyAction").disabled = true;
          document.getElementById("status").textContent =
            "This is not a Swagger page.";
        }
      }
    );
  });
});

// ... Rest of your code ...

document
  .getElementById("toggleExtension")
  .addEventListener("change", function () {
    const copyBtn = document.getElementById("copyAction");
    if (this.checked) {
      // Enable the extension
      chrome.storage.local.set({ swechoEnabled: true });
      copyBtn.style.display = "block"; // or copyBtn.disabled = false;
    } else {
      // Disable the extension
      chrome.storage.local.set({ swechoEnabled: false });
      copyBtn.style.display = "none"; // or copyBtn.disabled = true;
    }
  });

document.getElementById("copyAction").addEventListener("click", function () {
  // Logic to perform the copy action
  // This can be sending a message to the content script to execute the copy functionality
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: copyFunction, // This is the function that performs the copy action
    });
  });
});

// Load the current state of the extension when the popup is opened
chrome.storage.local.get("swechoEnabled", function (data) {
  const copyBtn = document.getElementById("copyAction");
  document.getElementById("toggleExtension").checked = data.swechoEnabled;
  if (data.swechoEnabled) {
    copyBtn.style.display = "block"; // or copyBtn.disabled = false;
  } else {
    copyBtn.style.display = "none"; // or copyBtn.disabled = true;
  }
});

function copyFunction() {
  // Get the active input element (the one that was manually changed)
  const activeElement = document.activeElement;

  // Ensure the active element is an input and is inside a table row
  if (activeElement.tagName === "INPUT" && activeElement.closest("tr")) {
    const parentRow = activeElement.closest("tr");
    const parameterNameDiv = parentRow.querySelector(".parameter__name");

    // Ensure the parameter name div exists
    if (parameterNameDiv) {
      const parameterName = parameterNameDiv.textContent.trim();

      // Find all matching parameter names
      const matchingParameterDivs = Array.from(
        document.querySelectorAll(".parameter__name")
      ).filter((div) => div.textContent.trim() === parameterName);

      // Populate all matching input fields with the same value, excluding the active input
      matchingParameterDivs.forEach((div) => {
        const matchingInput = div
          .closest("tr")
          .querySelector('input[type="text"]');
        if (matchingInput && matchingInput !== activeElement) {
          matchingInput.value = activeElement.value;
        }
      });
    }
  }
}
