require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const app = express();


const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));
// Define a function to fetch and log all documents from a collection

const ServiceabilitySchema = new mongoose.Schema({
  _id: Number,
  mID: [String]
});

const Serviceability = mongoose.model('Serviceability', ServiceabilitySchema);

app.post('/search', (req, res) => {
  const pin = req.body.pin;
  Serviceability.findById(pin)
    .then(doc => {
      if (doc) {
        res.json({ merchantIds: doc.mID });
      } else {
        res.json({ merchantIds: [] });
      }
    })
    .catch(err => console.log(err));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));