import nodemailer from "nodemailer";

/**
 * CREATE A TRANSPORTER and pass the mailtrap configuration
 *
 * Mailtrap is a fake SMTP server for development teams to test,
 * view and share emails sent from the development and staging environments without spamming real customers.
 */
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST as string,
  port: parseInt(process.env.MAILTRAP_PORT as string),
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

/**
 * Send email to the user
 */

export const sendEmail = async (
  email: string,
  subject: string,
  message: string
): Promise<{ success: boolean; message: string }> => {
  const mailOptions = {
    from: '"Getachew Muhabaw" <getachewmuhabaw@gmail.com>',
    to: email,
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${email}`);
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
