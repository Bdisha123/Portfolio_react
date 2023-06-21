// const express = require("express");
// const router = express.Router();
// const cors = require("cors");
// const nodemailer = require("nodemailer");

// // server used to send email
// const app = express();
// app.use(cors());
// app.use(express.json())
// app.use("/", router);
// app.listen(5000, () => console.log("Server Running"));
// console.log(process.env.EMAIL_USER);
// console.log(process.env.EMAIL_PASS);

// const contactEmail = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user :"*******@gmail.com",
//         pass: ""
//     },
// });


// contactEmail.verify((error)=>{
//     if(error){
//         console.log(error);
//     }
//     else{
//         console.log("ready to send");
//     }
// });

// router.post("./contact",(req,res)=>{
//     const name = req.body.firstName + req.body.lastName;
//     const email = req.body.email;
//     const message = req.body.phone;
//     const mail ={
//         from: name,
//         to:"********@gmail.com",
//         subject:"Contact form submission-Portfolio",
//         html: `<p>Name: ${name}</p>
//             <p>Email: ${email}</p>
//             <p>Phone: ${phone}</p>
//             <p>Message: ${message}</p>`,
//     };

//     contactEmail.sendMail(mail,(error)=>{
//         if (error) {
//             res.json(error);
//         } else {
//             res.json({ code: 200, status: "Message Sent" });
//         }
//     });

// });

// const path= require('path');
// const express = require("express");
// const router = express.Router();
// const cors = require("cors");
// const nodemailer = require("nodemailer");

// // server used to send send emails
// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({extended:true}))
// app.use("/", router);
// app.listen(5000, () => console.log("Server Running"));
// console.log(process.env.EMAIL_USER);
// console.log(process.env.EMAIL_PASS);

// const contactEmail = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: "********@gmail.com",
//         pass: ""
//     },
// });

// contactEmail.verify((error) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Ready to Send");
//     }
// });

// router.post("/contact", (req, res) => {
//     const name = req.body.firstName + req.body.lastName;
//     const email = req.body.email;
//     const message = req.body.message;
//     const phone = req.body.phone;
//     const mail = {
//         from: name,
//         to: "********@gmail.com",
//         subject: "Contact Form Submission - Portfolio",
//         html: `<p>Name: ${name}</p>
//            <p>Email: ${email}</p>
//            <p>Phone: ${phone}</p>
//            <p>Message: ${message}</p>`,
//     };
//     contactEmail.sendMail(mail, (error) => {
//         if (error) {
//             res.json(error);
//         } else {
//             res.json({ code: 200, status: "Message Sent" });
//         }
//     });
// });

const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser');
const { error } = require('console');
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/api/contact", (req, res) => {
    res.json({ message: "Hello from the server!" })
})

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS
    }
});

contactEmail.verify((error) => {
    if (error) {
        console.log(error)
    }
    else {
        console.log("ready to send")
    }
})

app.post("/api/contact",bodyParser.urlencoded({extended:false}),(req,res)=>{
    const name = req.body.firstName + req.body.lastName;
    const email = req.body.email;
    const message = req.body.message;
    const phone = req.body.phone;
    const mail = {
        from: name,
        to: process.env.EMAIL_ADDRESS,
        subject: "Contact Form Submission - Portfolio",
        html: `<p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Phone: ${phone}</p>
            <p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
        if (error) {
            res.json(error);
        } else {
            res.json({ code: 200, status: "Message Sent" });
        }
    });
});


app.use(express.static(path.join(__dirname,'./client/build')));
app.get('*', function (req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is online on port : ${PORT}`)
})


