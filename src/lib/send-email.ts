import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
})

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html?: string
}) => {
  const mailOptions = {
    from: 'tarboun.awm@gmail.com',
    to,
    subject,
    html,
  }
  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
