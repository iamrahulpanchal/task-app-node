const sgMail = require('@sendgrid/mail');

const sendgridAPIKey = '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';

sgMail.setApiKey(sendgridAPIKey);
sgMail.send({
    to: 'rahulnpanchal50@gmail.com',
    from: 'rahulnpanchal50@gmail.com',
    subject: 'Testing Send Grid',
    text: 'I hope this thing works!'
}).then(() => {
    console.log(`Email Sent`);
}).catch(() => {
    console.log(`Something Went Wrong`);
})