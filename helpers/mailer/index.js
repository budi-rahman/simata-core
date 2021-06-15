const mailer = require("./mailer");
const { userTemplate, invoiceTemplate } = require("./template/template");

const templateMapper = {
  forgotPassword: userTemplate.templateForgotPassword,
  "user.resetPassword": userTemplate.resetPassword,
  "invoice.sentInvoice": invoiceTemplate.invoiceTemplate,
};

module.exports = (to, payload) => {
  return mailer
    .sendMail({
      to,
      from: process.env.EMAIL_FROM,
      subject: `${process.env.EMAIL_TITLE_PREFIX} ${payload.subject}`,
      auth: {
        user: "admin@rapindo.co.id",
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: process.env.GMAIL_ACCESS_TOKEN,
      },
      html: templateMapper[payload.template](payload),
      attachments: payload.attachments,
      replyTo: payload.replyTo || process.env.REPLYTO_SUPPORT,
    })
    .catch((err) => console.error("SENT_EMAIL_FAILED", err));
};
