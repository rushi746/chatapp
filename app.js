

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;


app.use(express.json());
app.use(express.static('public'));


app.post('/login', (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).send('Username is required');
    }
    res.status(200).send('Login successful');
});


app.post('/message', (req, res) => {
    const { username, message } = req.body;
    if (!username || !message) {
        return res.status(400).send('Username and message are required');
    }
    const data = `${username}: ${message}\n`;
    fs.appendFile(path.join(__dirname, 'messages.txt'), data, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).send('Internal server error');
        }
        console.log('Message saved to file');
        res.status(200).send('Message sent');
    });
});


app.get('/messages', (req, res) => {
    fs.readFile(path.join(__dirname, 'messages.txt'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Internal server error');
        }
        const messages = data.split('\n').filter(Boolean);
        res.status(200).json(messages);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
