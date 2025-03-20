// server.js
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Enable CORS for local testing
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    next();
});

// Endpoint to fetch results
app.get('/results', (req, res) => {
    fs.readFile('clicks.json', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error reading data' });
        res.json(JSON.parse(data));
    });
});

// Endpoint to handle votes
app.post('/vote/:gender', (req, res) => {
    const gender = req.params.gender;
    fs.readFile('clicks.json', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error reading data' });
        const counts = JSON.parse(data);

        if (gender === 'boy' || gender === 'girl') {
            counts[gender] += 1;

            fs.writeFile('clicks.json', JSON.stringify(counts), (err) => {
                if (err) return res.status(500).json({ error: 'Error writing data' });
                res.json({ message: 'Vote recorded!' });
            });
        } else {
            res.status(400).json({ error: 'Invalid gender' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
