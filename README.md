# WooCommerce Product Bulk Uploader

This project simplifies the process of creating multiple WooCommerce product posts by generating an ultimate CSV file with all the necessary WordPress WooCommerce requirements. The project uses Node.js to allow users to easily create multiple products via Postman by submitting product details in JSON format. Additionally, the project supports automatic media file handling, assigning `1.jpg` as the main image and `2.jpg`, `3.jpg`, etc., as featured images.

## Features

- Bulk product creation for WooCommerce.
- JSON input through Postman for flexible and efficient product setup.
- Automatic media file assignment for product images.
- Generates a WooCommerce-compatible CSV file for import/export.

## Installation

1. Clone this repository.
   ```bash
   git clone https://github.com/your-repo/woocommerce-bulk-uploader.git
   ```
2. Navigate to the project directory.
   ```bash
   cd woocommerce-bulk-uploader
   ```
3. Install the dependencies.
   ```bash
   npm install
   ```
4. Create a `.env` file in the project root and specify the port.
   ```dotenv
   PORT=4900
   ```

## Usage

1. Start the server.
   ```bash
   npm start
   ```
2. Use Postman to send a POST request to the following URL:
   ```
   http://localhost:4900/add-product
   ```
3. Include the product details in the request body as raw JSON. Example:
   ```json
   {
     "startImageIndex": 11,
     "name": "Elegant Watch",
     "short_description": "A sophisticated and timeless watch designed for elegance.",
     "description": "The Elegant Watch is crafted with precision, featuring a stainless steel case, scratch-resistant glass, and a stylish leather strap. Perfect for both formal and casual occasions, this watch combines functionality and class. It’s powered by a reliable quartz movement, ensuring accuracy and long-lasting performance.",
     "regular_price": "1500",
     "sale_price": "1200"
   }
   ```

## How It Works

- The `startImageIndex` specifies the starting point for media files (`1.jpg`, `2.jpg`, etc.).
  - `1.jpg` will be used as the main image.
  - `2.jpg`, `3.jpg`, and so on will be used as featured images.
- Product data such as name, description, and prices are extracted from the JSON payload.
- The project generates a CSV file compatible with WooCommerce requirements, making it easy to upload to your WordPress WooCommerce store.

## Example .env File

Create an `.env` file in the project root with the following content:
```dotenv
PORT=4900
```

## Dependencies

- Node.js
- Express.js

## Contributing

Feel free to contribute to this project by submitting issues or pull requests.

## License

This project is open-source and available under the [MIT License](LICENSE).