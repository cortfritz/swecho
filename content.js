document.addEventListener("input", (event) => {
  // Check if the event target is an input field within a Swagger parameter row
  if (
    event.target.tagName === "INPUT" &&
    event.target.closest("tr[data-param-name]")
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
