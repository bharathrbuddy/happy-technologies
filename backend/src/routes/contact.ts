import "dotenv/config";
import { Router } from "express";
import { Resend } from "resend";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      company,
      service,
      message,
    } = req.body;

    if (!name || !email || !service || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    // Check API key
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error("RESEND_API_KEY is missing");

      return res.status(500).json({
        success: false,
        message: "Email service is not configured.",
      });
    }

    // Create Resend only after environment variables are loaded
    const resend = new Resend(resendApiKey);

    const { data, error } = await resend.emails.send({
      from:
        process.env.EMAIL_FROM ||
        "Happy Technologies <onboarding@resend.dev>",

      to: [
        process.env.EMAIL_USER || "",
      ],

      replyTo: email,

      subject: `New Enquiry from ${name} - Happy Technologies`,

      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 650px;
          margin: auto;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          overflow: hidden;
        ">

          <div style="
            background: linear-gradient(
              135deg,
              #2563eb,
              #1d4ed8
            );
            color: white;
            padding: 30px;
          ">
            <h1 style="
              margin: 0;
              font-size: 26px;
            ">
              Happy Technologies 🚀
            </h1>

            <p style="
              margin: 8px 0 0;
            ">
              New website enquiry received
            </p>
          </div>

          <div style="
            padding: 30px;
          ">

            <h2 style="
              color: #1f2937;
              margin-top: 0;
            ">
              Customer Details
            </h2>

            <table style="
              width: 100%;
              border-collapse: collapse;
            ">

              <tr>
                <td style="
                  padding: 12px;
                  background: #f8fafc;
                  font-weight: bold;
                  width: 160px;
                ">
                  Name
                </td>

                <td style="padding: 12px;">
                  ${name}
                </td>
              </tr>

              <tr>
                <td style="
                  padding: 12px;
                  background: #f8fafc;
                  font-weight: bold;
                ">
                  Email
                </td>

                <td style="padding: 12px;">
                  <a href="mailto:${email}">
                    ${email}
                  </a>
                </td>
              </tr>

              <tr>
                <td style="
                  padding: 12px;
                  background: #f8fafc;
                  font-weight: bold;
                ">
                  Company
                </td>

                <td style="padding: 12px;">
                  ${company || "Not provided"}
                </td>
              </tr>

              <tr>
                <td style="
                  padding: 12px;
                  background: #f8fafc;
                  font-weight: bold;
                ">
                  Service
                </td>

                <td style="padding: 12px;">
                  ${service}
                </td>
              </tr>

            </table>

            <h2 style="
              color: #1f2937;
              margin-top: 30px;
            ">
              Project Details
            </h2>

            <div style="
              background: #f8fafc;
              padding: 20px;
              border-left: 4px solid #2563eb;
              border-radius: 6px;
              white-space: pre-line;
              color: #374151;
              line-height: 1.6;
            ">
              ${message}
            </div>

          </div>

          <div style="
            background: #f8fafc;
            padding: 16px;
            text-align: center;
            color: #6b7280;
            font-size: 13px;
          ">
            Sent from Happy Technologies Website
          </div>

        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to send enquiry.",
      });
    }

    console.log(
      "Enquiry email sent successfully:",
      data?.id
    );

    return res.status(200).json({
      success: true,
      message: "Enquiry sent successfully.",
    });
  } catch (error) {
    console.error("Contact email error:", error);

    return res.status(500).json({
      message:
        "Unable to send your enquiry. Please try again later.",
    });
  }
});

export default router;