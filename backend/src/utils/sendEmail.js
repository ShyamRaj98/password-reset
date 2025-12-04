import axios from "axios";

export default async function sendEmail({ to, subject, html }) {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Support Team",
          email: process.env.SMTP_USER   // must be Brevo-verified email
        },
        to: [{ email: to }],
        subject: subject,
        htmlContent: html,
      },
      {
        headers: {
          "api-key": process.env.SMTP_PASS,   // MUST be Brevo v3 API key
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Brevo response:", response.data);
    return true;

  } catch (error) {
    console.error("Email send error:", error.response?.data || error.message);
    throw new Error("Email sending failed");
  }
}
