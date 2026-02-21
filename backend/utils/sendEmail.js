// Email sending helper — uses SendGrid to deliver transactional emails
// (order confirmations, password resets, etc.)

const sgMail = require("@sendgrid/mail");

const sendEmail = async ({ email, subject, templateId, data }) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const mailPayload = {
        to: email,
        from: process.env.SENDGRID_MAIL,
        templateId: templateId,
        dynamic_template_data: data,
    };

    // If no template is provided, fall back to a plain subject line
    if (!templateId) {
        mailPayload.subject = subject;
        mailPayload.text = subject;
    }

    await sgMail.send(mailPayload);
};

module.exports = sendEmail;