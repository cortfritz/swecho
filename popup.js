document.getElementById("save").addEventListener("click", function () {
  const hotkey = document.getElementById("hotkey").value.toUpperCase();
  chrome.storage.local.set({ swechoHotkey: hotkey }, function () {
    alert("Hotkey saved!");
  });
});

// Load the saved hotkey when the popup is opened
chrome.storage.local.get("swechoHotkey", function (data) {
  if (data.swechoHotkey) {
    document.getElementById("hotkey").value = data.swechoHotkey;
  }
});
