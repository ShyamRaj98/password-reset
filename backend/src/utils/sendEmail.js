import nodemailer from "nodemailer";

const createTransport = (host, port, user, pass) => {
  return nodemailer.createTransport({
    host,
    port,
    auth: { user, pass },
    secure: false
  });
};

/**
 * sendEmail(to, subject, html)
 */
export default async function sendEmail({ to, subject, html, env }) {
  const transporter = createTransport(
    env.SMTP_HOST,
    Number(env.SMTP_PORT || 587),
    env.SMTP_USER,
    env.SMTP_PASS
  );

  const info = await transporter.sendMail({
    from: `"NoReply" <no-reply@example.com>`,
    to,
    subject,
    html
  });

  console.log("Email sent:", info.messageId);
  return info;
}
