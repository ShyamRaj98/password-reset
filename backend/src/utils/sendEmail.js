import nodemailer from "nodemailer";

const createTransport = (host, port, user, pass) => {
  return nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: { user, pass }
  });
};

export default async function sendEmail({ to, subject, html, env }) {
  const transporter = createTransport(
    env.SMTP_HOST,
    Number(env.SMTP_PORT),
    env.SMTP_USER,
    env.SMTP_PASS
  );

  const info = await transporter.sendMail({
    from: `"Support" <${env.SMTP_USER}>`,
    to,
    subject,
    html
  });

  console.log("Email sent:", info.messageId);
  return info;
}
