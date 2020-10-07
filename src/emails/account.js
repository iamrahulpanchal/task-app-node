const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeMail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'rahulnpanchal50@gmail.com',
        subject: 'Welcome to Task Manager API',
        text: `Thanks for Joining In, ${name}. Let me know how you feel about the App`,
    });
};

const sendCancelMail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'rahulnpanchal50@gmail.com',
        subject: 'Sorry to See You Go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon`,
    });
};

module.exports = {
    sendWelcomeMail: sendWelcomeMail,
    sendCancelMail: sendCancelMail,
}