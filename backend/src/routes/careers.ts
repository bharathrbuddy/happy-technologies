import "dotenv/config";

import { Router } from "express";
import multer from "multer";
import { Resend } from "resend";

const router = Router();

/* =========================
   MULTER CONFIG
========================= */

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },

  fileFilter: (_req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, DOC and DOCX files are allowed."));
    }
  },
});


/* =========================
   CAREER APPLICATION
========================= */

router.post(
  "/",
  upload.single("resume"),
  async (req, res) => {
    try {
      const {
        jobTitle,
        name,
        company,
        experience,
      } = req.body;


      /* =========================
         VALIDATION
      ========================= */

      if (!jobTitle || !name || !experience) {
        return res.status(400).json({
          success: false,
          message: "Please fill in all required fields.",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Please upload your resume.",
        });
      }


      /* =========================
         RESEND CONFIG
      ========================= */

      const resendApiKey =
        process.env.RESEND_API_KEY;

      if (!resendApiKey) {
        console.error(
          "RESEND_API_KEY is missing"
        );

        return res.status(500).json({
          success: false,
          message:
            "Email service is not configured.",
        });
      }


      const recipientEmail =
        process.env.EMAIL_TO;

      if (!recipientEmail) {
        console.error(
          "EMAIL_TO is missing"
        );

        return res.status(500).json({
          success: false,
          message:
            "Recipient email is not configured.",
        });
      }


      /* =========================
         RESEND
      ========================= */

      const resend = new Resend(
        resendApiKey
      );


      /* =========================
         SEND EMAIL
      ========================= */

      const { data, error } =
        await resend.emails.send({

          from:
            process.env.EMAIL_FROM ||
            "Happy Technologies <onboarding@resend.dev>",

          to: [
            recipientEmail.trim(),
          ],

          subject:
            `New Job Application - ${jobTitle}`,

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

              <!-- HEADER -->

              <div style="
                background: #2563eb;
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
                  New career application received
                </p>

              </div>


              <!-- CONTENT -->

              <div style="
                padding: 30px;
              ">

                <h2 style="
                  color: #1f2937;
                  margin-top: 0;
                ">
                  Candidate Details
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
                      width: 180px;
                    ">
                      Position
                    </td>

                    <td style="
                      padding: 12px;
                    ">
                      ${escapeHtml(jobTitle)}
                    </td>

                  </tr>


                  <tr>

                    <td style="
                      padding: 12px;
                      background: #f8fafc;
                      font-weight: bold;
                    ">
                      Name
                    </td>

                    <td style="
                      padding: 12px;
                    ">
                      ${escapeHtml(name)}
                    </td>

                  </tr>


                  <tr>

                    <td style="
                      padding: 12px;
                      background: #f8fafc;
                      font-weight: bold;
                    ">
                      Current Company
                    </td>

                    <td style="
                      padding: 12px;
                    ">
                      ${escapeHtml(
                        company || "Not provided"
                      )}
                    </td>

                  </tr>


                  <tr>

                    <td style="
                      padding: 12px;
                      background: #f8fafc;
                      font-weight: bold;
                    ">
                      Experience
                    </td>

                    <td style="
                      padding: 12px;
                    ">
                      ${escapeHtml(experience)}
                    </td>

                  </tr>


                  <tr>

                    <td style="
                      padding: 12px;
                      background: #f8fafc;
                      font-weight: bold;
                    ">
                      Resume
                    </td>

                    <td style="
                      padding: 12px;
                    ">
                      ${escapeHtml(
                        req.file.originalname
                      )}
                    </td>

                  </tr>

                </table>


                <!-- RESUME -->

                <div style="
                  margin-top: 30px;
                  padding: 20px;
                  background: #f8fafc;
                  border-left: 4px solid #2563eb;
                  border-radius: 6px;
                ">

                  <strong>
                    Resume attached
                  </strong>

                  <p style="
                    margin: 8px 0 0;
                    color: #6b7280;
                  ">
                    ${escapeHtml(
                      req.file.originalname
                    )}
                  </p>

                </div>

              </div>


              <!-- FOOTER -->

              <div style="
                background: #f8fafc;
                padding: 16px;
                text-align: center;
                color: #6b7280;
                font-size: 13px;
              ">

                Sent from Happy Technologies Careers

              </div>

            </div>
          `,

          attachments: [
            {
              filename:
                req.file.originalname,

              content:
                req.file.buffer,
            },
          ],
        });


      /* =========================
         RESEND ERROR
      ========================= */

      if (error) {

        console.error(
          "Resend career error:",
          error
        );

        return res.status(500).json({
          success: false,
          message:
            "Unable to send application.",
        });
      }


      /* =========================
         SUCCESS
      ========================= */

      console.log(
        "Career application sent successfully:",
        data?.id
      );

      return res.status(200).json({
        success: true,
        message:
          "Application submitted successfully.",
      });

    } catch (error) {

      console.error(
        "Career application error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to submit your application. Please try again later.",
      });
    }
  }
);


/* =========================
   HTML ESCAPE
========================= */

function escapeHtml(
  value: string = ""
): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


export default router;