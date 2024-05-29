const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express(); 

app.use(express.urlencoded( { extended: true } ));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/send-email', (req,res) => {
    const { to, subject, message } = req.body;

    // const transporter = nodemailer.createTransport({
    //     host: "smtp.gmail.com",
    //     port: 587,
    //     secure: false, // Use `true` for port 465, `false` for all other ports
    //     auth: {
    //       user: "education1325@gmail.com",
    //       pass: process.env.PASSWORD,
    //     },
    // });

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'lucious.satterfield@ethereal.email',
            pass: 'S12VJvZ6M2XeZthu5a'
        }
    });

    let mailOptions = {
        from: 'education1325@gmail.com', // Sender address
        to: to, // List of receivers
        subject: subject, // Subject line
        text: message // Plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error: ' + error.message);
        }
        res.send('Email sent: ' + info.response);
    });
    
})

app.listen(8080, () => {
    console.log(`Server is up and running on PORT 8080`);
})
