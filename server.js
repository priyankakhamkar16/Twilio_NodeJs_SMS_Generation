const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/send-sms', (req, res) => {
    const { to, message } = req.body;
    client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: `+${to}`
    }).then(message => {
        console.log(message.sid);
        res.send('SMS sent successfully!');
    }).catch(error => {
        console.error(error);
        res.send('Failed to send SMS. Please try again.');
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
