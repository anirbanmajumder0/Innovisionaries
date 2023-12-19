const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


const mrchntId = ["10001","100002","10003"];
const pincodes = ["700015","70001","700020","70023"];
app.post('/search', (req, res) => {
    const pin = req.body.pin;
    if(pincodes.includes(pin)) {
        res.json({ merchantIds: mrchntId });
    } else {
        res.json({ merchantIds: [] });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));