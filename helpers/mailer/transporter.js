const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
})

// Options
const VERIFY_EMAIL = 1
const RESET_PASSWORD = 2

const createSubject = (option) => {
    if (option == VERIFY_EMAIL) {
        return 'Confirm register for email:'
    }

    if (option == RESET_PASSWORD) {
        return 'Reset password for account:'
    }
}

const createContent = (email, option, authKey) => {
    if (option == VERIFY_EMAIL) {
        return `
            <h3>Welcome ${email}! You have just created a new account for our website!</h3>
            <br>
            <p>Click here to verify your email and start using our services:</p> 
            <a href='${process.env.WEB_URL}/api/auth/verify-email/${email}/${authKey}'>Verify your email</a>
            <p>Please also check cho spam section for this email</p>
            <br>
            <p>Do not share this link or email to anyone!</p>
            <p>If you not doing this, you can just ignore this message!</p>
            <br>
            <p>Thank you,</p>
            <p>--- VeXeDienTuBKDN - AwesomeDevTeam ---</p>
            `
    }

    if (option == RESET_PASSWORD) {
        return `
            <h3>Hi ${email}! You have just reset your password for our website!</h3>
            <br>
            <p>Click here to confirm and get your new password:</p> 
            <a href='${process.env.WEB_URL}/api/auth/reset-password/${email}/${authKey}'>Get new password</a>
            <p>Please also check cho spam section for this email</p>
            <br>
            <p>Do not share this link or email to anyone!</p>
            <p>If you not doing this, you can just ignore this message!</p>
            <br>
            <p>Thank you,</p>
            <p>--- VeXeDienTuBKDN - AwesomeDevTeam ---</p>
            `
    }
}

const mailConfig = (email, option, authKey) => {
    return {
        from: process.env.GMAIL_USER,
        to: email,
        subject: `${createSubject(option)} ${email}`,
        html: createContent(email, option, authKey),
    }
}

module.exports = {
    transporter: transporter,
    mailConfig: mailConfig,
}
