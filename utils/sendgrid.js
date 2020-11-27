const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function sendEmail(to, from, subject, text, html) {
    return sgMail.send({
        to,
        from,
        subject,
        text,
        html
    })
}

module.exports = {
    sendEmail
}