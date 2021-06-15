const nodemailer = require("nodemailer");

// module.exports = nodemailer.createTransport({
//   pool: true,
//   maxConnections: process.env.NODEMAILER_MAXCONNECTION,
//   maxMessages: process.env.NODEMAILER_MAXMESSAGE,
//   rateLimit: process.env.NODEMAILER_RATELIMIT,
//   logger: true, // temporary for debuging

//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     // type: "OAuth2",
//     // clientId: process.env.GMAIL_CLIENT_ID,
//     // clientSecret: process.env.GMAIL_CLIENT_SECRET,

//     user: process.env.GMAIL_USERNAME,
//     pass: process.env.GMAIL_PASSWORD,
//   },
// });
