// server.js
const express = require('express');
const nodemailer = require('nodemailer'); // For sending emails
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure CORS if your frontend is on a different domain
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Adjust this in production
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use any email service
    auth: {
        user: 'munyaobryan6@gmail.com', // Replace with your email
        pass: 'alphamale23' // Use app-specific password if using Gmail
    }
});

// Contact form endpoint
app.post('/send-message', async (req, res) => {
    try {
        // Extract form data
        const { name, email, message } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all required fields'
            });
        }

        // Email options
        const mailOptions = {
            from: email,
            to: 'munyaobryan6@gmail.com', // Where you want to receive the messages
            subject: New Contact Form Submission from ${name},
            text: `
                Name: ${name}
                Email: ${email}
                Message: ${message}
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Message sent successfully! I’ll get back to you soon.'
        });

    } catch (error) {
        console.error('Error processing message:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later.'
        });
    }
});

// Start server
app.listen(port, () => {
    console.log(Server running on port ${port});
});