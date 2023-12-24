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
//list all the documents in the collection that has mid lenght more than 0

Serviceability.find({ mID: { $exists: true, $not: { $size: 0 } } })
  .then(docs => console.log(docs))
  .catch(err => console.log(err));
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

app.post('/upload', (req, res) => {
  const data = req.body;
  console.log('Received data:', data); // Log the received data

  // Get all the merchant IDs from the data
  const mIDs = Object.keys(data);
  console.log('Merchant IDs:', mIDs); // Log the merchant IDs

  // For each merchant ID, process the associated pincodes
  Promise.all(mIDs.map(mID => {
    const pincodes = data[mID];
    console.log(`Processing pincodes for merchant ID ${mID}:`, pincodes); // Log the pincodes for each merchant ID

    return Promise.all(pincodes.map(pincode => {
      console.log(`Updating document for pincode ${pincode} and merchant ID ${mID}`); // Log the pincode and merchant ID being processed

      // For each pincode, find the associated document and update it, or create a new one if it doesn't exist
      return Serviceability.updateOne(
        { _id: pincode },
        { $addToSet: { mIDs: 'M000000004' } },
        { upsert: true }
      )
      //.then(res => console.log('Response from server:', res))
      .catch(err => console.log('Error updating document:', err)); 
    }));
  }))
  .then(() => {
    console.log('Data received and stored', mIDs);
    res.json({ message: 'Data received and stored' });
  })
  .catch(err => {
    console.log('Error processing data:', err); // Log any errors that occur during processing
    res.status(500).json({ message: 'An error occurred' });
  });
});
 
// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));