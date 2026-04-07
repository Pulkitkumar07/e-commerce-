import nodemailer from "nodemailer";

// 🔥 transporter ek hi baar create karo
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: `"E-Commerce" <${process.env.EMAIL_USER}>`,
      to,
      subject:  "🎉 Order Confirmed - Thank you for your purchase",
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent:", info.response);
  } catch (error) {
    console.log("❌ EMAIL ERROR:", error.message);
  }
};