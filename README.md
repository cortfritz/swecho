# Swecho - Swagger Echo

Automatically populate matching fields in Swagger with the magic of `Swecho` Chrome extension. Inspired by our friendly bat mascot, Swecho combines the power of Swagger and Echo to enhance your API documentation experience.

## Current Status

experimental. this is being authored right now and it's my first chrome extension.

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/cortfritz/swecho.git
   ```
2. **Load the Extension in Chrome:**
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" (toggle in the top right corner).
   - Click "Load unpacked" and select the `swecho` directory you just cloned.

## Usage

Navigate to a Swagger page. When you manually change the value of any input field, the extension will automatically find all other input fields with the same `parameter__name` and update them with the value you just entered.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
