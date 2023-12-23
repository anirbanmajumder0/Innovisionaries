require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const app = express();


const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err)); 

// Define a Mongoose schema for the 'Serviceability' collection
const ServiceabilitySchema = new mongoose.Schema({
  _id: Number, // Pincode (used as the document ID)
  mID: [String] // Array of merchant IDs
});

// Create a Mongoose model from the schema
const Serviceability = mongoose.model('Serviceability', ServiceabilitySchema);


// Define a POST route for '/search'
app.post('/search', (req, res) => {
  const pin = req.body.pin; // Get the pin code from the request body
  // Find the document with the specified pin code
  Serviceability.findById(pin)
    .then(doc => {
      if (doc) {
        // If a document is found, return the merchant IDs
        res.json({ merchantIds: doc.mID });
      } else {
        // If no document is found, return an empty array
        res.json({ merchantIds: [] });
      }
    })
    .catch(err => console.log(err)); // Log on error
});


// Define a GET route for '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define a GET route for '/admin'
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));