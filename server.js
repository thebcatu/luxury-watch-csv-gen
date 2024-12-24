const express = require('express');
const fs = require('fs');
const path = require('path');
const { parse } = require('json2csv');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const CSV_FILE_PATH = path.join(__dirname, 'products.csv');

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Utility functions
const getRandomElement = (arr, count = 1) => {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return count === 1 ? shuffled[0] : shuffled.slice(0, count);
};

const generateRandomMeta = () => ({
  '_botiga_page_builder_mode': '',
  '_botiga_sidebar_layout': 'customizer',
  '_wxr_import_user_slug': '',
  '_athemes_sites_imported_post': '',
  '_botiga_disable_header_transparent': 1,
});

const generateRandomAttributes = () => ({
  'Attribute 1 name': 'Weight',
  'Attribute 1 value(s)': `${Math.floor(Math.random() * 300 + 100)}gm`,
  'Attribute 1 visible': 1,
  'Attribute 1 global': 0,
});

const generateProduct = (id, data, startImageIndex) => {
  const categories = ['New Arrivals', "Men's Watches", "Children's Watches", "Women's Watches", 'Luxury Watches', 'Others'];
  const tags = [
    'Casual Watches',
    'Leather Strap Watches',
    'Luxury Watches',
    'Metal Strap',
    'Minimalist Watches',
    'Sport Watches',
  ];

  return {
    ID: id,
    Type: data.Type || 'simple',
    SKU: data.SKU || '',
    'GTIN, UPC, EAN, or ISBN': data['GTIN, UPC, EAN, or ISBN'] || '',
    Name: data.Name,
    Published: data.Published || 1,
    'Is featured?': data['Is featured?'] || 0,
    'Visibility in catalog': data['Visibility in catalog'] || 'visible',
    'Short description': data['Short description'],
    Description: data.Description,
    'Date sale price starts': data['Date sale price starts'] || '',
    'Date sale price ends': data['Date sale price ends'] || '',
    'Tax class': data['Tax class'] || 'taxable',
    'In stock?': data['In stock?'] || 1,
    Stock: data.Stock || Math.floor(Math.random() * 91 + 10), // 10–100
    'Low stock amount': data['Low stock amount'] || '',
    'Backorders allowed?': data['Backorders allowed?'] || 0,
    'Sold individually?': data['Sold individually?'] || 0,
    'Weight (kg)': data['Weight (kg)'] || (Math.random() * 0.3 + 0.2).toFixed(2),
    'Length (cm)': data['Length (cm)'] || (Math.random() * 5 + 10).toFixed(1),
    'Width (cm)': data['Width (cm)'] || (Math.random() * 3 + 5).toFixed(1),
    'Height (cm)': data['Height (cm)'] || (Math.random() * 2 + 1).toFixed(1),
    'Allow customer reviews?': data['Allow customer reviews?'] || 1,
    'Purchase note': data['Purchase note'] || '',
    'Sale price': data['Sale price'],
    'Regular price': data['Regular price'],
    Categories: data.Categories || getRandomElement(categories, 2).join(', '),
    Tags: data.Tags || getRandomElement(tags, 2).join(', '),
    'Shipping class': data['Shipping class'] || '',
    Images: [
      `http://localhost/5th-project/wp-content/uploads/2024/12/${startImageIndex}.jpg`,
      ...Array.from({ length: 4 }, (_, i) => `http://localhost/5th-project/wp-content/uploads/2024/12/${startImageIndex + i + 1}.jpg`),
    ].join(', '),
    'Download limit': data['Download limit'] || '',
    'Download expiry days': data['Download expiry days'] || '',
    Parent: data.Parent || '',
    'Grouped products': data['Grouped products'] || '',
    Upsells: data.Upsells || '',
    'Cross-sells': data['Cross-sells'] || '',
    'External URL': data['External URL'] || '',
    'Button text': data['Button text'] || '',
    Position: id,
    ...generateRandomMeta(),
    ...generateRandomAttributes(),
  };
};

// POST endpoint
app.post('/add-product', (req, res) => {
  const { startImageIndex, ...productData } = req.body;

  if (!startImageIndex || typeof startImageIndex !== 'number') {
    return res.status(400).json({ error: 'Invalid or missing startImageIndex' });
  }

  let id = 1;

  if (fs.existsSync(CSV_FILE_PATH)) {
    const existingData = fs.readFileSync(CSV_FILE_PATH, 'utf8').trim();
    if (existingData) {
      id = existingData.split('\n').length; // Increment ID based on lines
    }
  }

  const product = generateProduct(id, productData, startImageIndex);

  try {
    const csv = parse([product], { header: !fs.existsSync(CSV_FILE_PATH), quote: '' });
    fs.appendFileSync(CSV_FILE_PATH, `${csv}\n`);
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    console.error('Error writing to CSV:', error);
    res.status(500).json({ error: 'Failed to write to CSV file' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
