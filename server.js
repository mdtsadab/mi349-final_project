const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Add this line

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Add this line
app.use(cors()); // Add this line

app.post('/send-email', (req, res) => {
    const { name, email, reason, comments } = req.body;

    // Create a transporter using your email provider's SMTP settings
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'towsifq89@gmail.com', // Replace with your Gmail address
            pass: 'Fitz2850', // Replace with your Gmail password
        },
    });

    const mailOptions = {
        from: 'towsifq89@gmail.com', // Replace with your Gmail address
        to: 'towsifq@gmail.com', // Replace with the actual email address where you want to receive the form submissions
        subject: 'New Contact Form Submission',
        text: `
            Name: ${name}
            Email: ${email}
            Reason for contact: ${reason}
            Comments: ${comments}
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
