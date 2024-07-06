import nodemailer from "nodemailer";

export const sendEmail = async (
  email: string,
  subject: string,
  message: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.eu",
      port: 465,
      secure: true, // use SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: message,
    });
  } catch (error) {
    console.error(
      "Email not sent. Try again later or contact support if problem persists"
    );
    console.error(error);
    return error;
  }
};
