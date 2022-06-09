import 'dotenv/config'
import { createTransport } from "nodemailer"

// async..await is not allowed in global scope, must use a wrapper
async function mail(mail_info) {
    // create reusable transporter object using the default SMTP transport
    const transporter = createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        authMethod: process.env.SMTP_AUTH_METHOD
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: `"AnestorDev" <${process.env.SMTP_USER}>`, // sender address
        to: mail_info.email, // list of receivers
        subject: mail_info.subject, // Subject line
        text: mail_info.message, // plain text body
        html: `<h3>Hello, user welcome to TODO by anestordev</h3>
                <p>${mail_info.message}</p>`, // html body
    })
    console.log("Message sent: %s", info.messageId)
}

export default mail
