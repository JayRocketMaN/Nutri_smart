import nodemailer from "nodemailer";

// --- Create transporter ---
const transporter = nodemailer.createTransport({
service: "gmail",
auth: {
user: process.env.SMTP_USER,
pass: process.env.SMTP_PASS,
},
});

// --- General function to send plain text emails ---
export async function sendEmail(to, subject, textContent) {
const message = {
from: "Nutri Smart [noreply@nutrismart.com](mailto:noreply@nutrismart.com)",
to,
subject,
text: textContent,
};

try {
await transporter.sendMail(message);
console.log(`Email sent to ${to}: ${subject}`);
} catch (error) {
console.error("Error sending email:", error);
}
}

// --- OTP Email ---
export async function sendOtp(userEmail, otpCode) {
const textContent = `Your Nutri Smart OTP Code: ${otpCode}\nUse this code to verify your account. It expires in 10 minutes.`;
await sendEmail(userEmail, "Nutri Smart - OTP Verification", textContent);
}

// --- Welcome Email ---
export async function sendWelcomeEmail(userEmail, userName) {
const textContent = `Welcome to Nutri Smart, ${userName}!\nWe’re excited to have you with us. Nutri Smart helps you manage your nutrition and wellness effectively.`;
await sendEmail(userEmail, "Welcome to Nutri Smart!", textContent);
}

// --- Recommendation Meal Email ---
export async function sendRecommendationEmail(userEmail, userName, mealPlan) {
const textContent = `Hello ${userName},\nHere’s your personalized meal recommendation for today:\n${mealPlan}\nStay healthy with Nutri Smart!`;
await sendEmail(userEmail, "Your Nutri Smart Meal Recommendation", textContent);
}

// --- Password Recovery Email ---
export async function sendPasswordRecoveryEmail(userEmail, resetLink) {
const textContent = `We received a password reset request for your Nutri Smart account.\nClick this link to reset your password: ${resetLink}\nIf you didn’t request this, please ignore this email.`;
await sendEmail(userEmail, "Nutri Smart - Password Recovery", textContent);
}

// --- Export all functions ---
export default {
sendEmail,
sendOtp,
sendWelcomeEmail,
sendRecommendationEmail,
sendPasswordRecoveryEmail,
};
