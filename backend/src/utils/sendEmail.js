import nodemailer from "nodemailer";

export default async function sendEmail({ to, subject, html }) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,   // smtp-relay.brevo.com
      port: Number(process.env.SMTP_PORT), // 587
      secure: false, // STARTTLS
      auth: {
        user: process.env.SMTP_USER, // your smtp user
        pass: process.env.SMTP_PASS  // your smtp key
      }
    });

    const info = await transporter.sendMail({
      from: `"Support" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html
    });

    console.log("Email sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("Email error:", err);
    throw err;
  }
}
