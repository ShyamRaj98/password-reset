import Brevo from "@getbrevo/brevo";

export const sendMail = async (to, subject, text) => {
  try {
    const apiInstance = new Brevo.TransactionalEmailsApi();

    // SET API KEY
    apiInstance.setApiKey(
      Brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    const email = new Brevo.SendSmtpEmail();

    email.sender = {
      name: "Password Reset",
      email: process.env.SMTP_USER, // Verified sender email
    };

    email.to = [{ email: to }];
    email.subject = subject;
    email.htmlContent = `<p>${text}</p>`; // use htmlContent instead of textContent

    await apiInstance.sendTransacEmail(email);

    console.log("📧 Email sent successfully!");
  } catch (error) {
    console.error("❌ Error sending email:", error.response?.body || error);
    throw new Error("Email could not be sent");
  }
};
