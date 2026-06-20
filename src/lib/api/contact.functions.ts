import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import nodemailer from "nodemailer";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator(contactSchema)
  .handler(async ({ data }) => {
    const host = process.env.EMAIL_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.EMAIL_PORT || "465");
    const secure = process.env.EMAIL_SECURE !== "false"; // default to true for port 465
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const receiver = process.env.EMAIL_RECEIVER || "rushikeshpote2005@gmail.com";

    // If credentials are not configured, log a warning and return mock success for local development
    if (!user || !pass) {
      console.warn(
        "Nodemailer credentials (EMAIL_USER & EMAIL_PASS) are not configured. Mocking success response."
      );
      // We can simulate a network delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      return {
        success: true,
        message: "Message received (mock mode - configure EMAIL_USER and EMAIL_PASS to send real emails)",
      };
    }

    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
          user,
          pass,
        },
      });

      const mailOptions = {
        from: `"${data.name}" <${user}>`, // Nodemailer recommends setting the 'from' header as the authenticated user email to avoid spam filters
        replyTo: data.email, // set replyTo as the sender's email so replying goes to them
        to: receiver,
        subject: `New Portfolio Message from ${data.name}`,
        text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #f9f9f9;">
            <h2 style="color: #7c3aed; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">New Message from Portfolio</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            <div style="margin-top: 20px; padding: 15px; background-color: #ffffff; border-left: 4px solid #7c3aed; border-radius: 4px;">
              <p style="margin: 0; white-space: pre-wrap;"><strong>Message:</strong><br/>${data.message}</p>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      return { success: true, message: "Email sent successfully!" };
    } catch (error: any) {
      console.error("Nodemailer failed to send email:", error);
      throw new Error(error.message || "Failed to send email. Please try again later.");
    }
  });
