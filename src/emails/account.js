const sgMail = require('@sendgrid/mail');

const sendgridAPIKey = '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';

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeMail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'rahulnpanchal50@gmail.com',
        subject: 'Welcome to Task Manager API',
        text: `Thanks for Joining In, ${name}. Let me know how you feel about the App`,
    });
};

module.exports = {
    sendWelcomeMail: sendWelcomeMail,
}