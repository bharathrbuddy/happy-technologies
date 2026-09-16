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

      cb(
        new Error(
          "Only PDF, DOC and DOCX files are allowed."
        )
      );

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
        email,
        phone,
        company,
        experience,
      } = req.body;


      /* =========================
         CLEAN INPUT
      ========================= */

      const cleanJobTitle =
        String(jobTitle || "").trim();

      const cleanName =
        String(name || "").trim();

      const cleanEmail =
        String(email || "").trim();

      const cleanPhone =
        String(phone || "").trim();

      const cleanCompany =
        String(company || "").trim();

      const cleanExperience =
        String(experience || "").trim();


      /* =========================
         REQUIRED FIELD VALIDATION
      ========================= */

      if (
        !cleanJobTitle ||
        !cleanName ||
        !cleanEmail ||
        !cleanPhone ||
        !cleanExperience ||
        !cleanCompany
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Please fill in all required fields.",

        });

      }


      /* =========================
         NAME VALIDATION
      ========================= */

      if (cleanName.length < 2) {

        return res.status(400).json({

          success: false,

          message:
            "Name must contain at least 2 characters.",

        });

      }


      if (cleanName.length > 60) {

        return res.status(400).json({

          success: false,

          message:
            "Name cannot exceed 60 characters.",

        });

      }


      const nameRegex =
        /^[A-Za-zÀ-ÖØ-öø-ÿ.'\-\s]+$/;


      if (!nameRegex.test(cleanName)) {

        return res.status(400).json({

          success: false,

          message:
            "Please enter a valid name.",

        });

      }


      /* =========================
         EMAIL VALIDATION
      ========================= */

      if (cleanEmail.length > 100) {

        return res.status(400).json({

          success: false,

          message:
            "Email address cannot exceed 100 characters.",

        });

      }


      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;


      if (!emailRegex.test(cleanEmail)) {

        return res.status(400).json({

          success: false,

          message:
            "Please enter a valid email address.",

        });

      }


      /* =========================
         PHONE VALIDATION
      ========================= */

      /*
       * Allows:
       *
       * +91 9876543210
       * +919876543210
       * 9876543210
       * +91-9876543210
       * +91 (9876543210)
       */

      const normalizedPhone =
        cleanPhone.replace(
          /[\s()-]/g,
          ""
        );


      const phoneRegex =
        /^\+?[1-9]\d{9,14}$/;


      if (!phoneRegex.test(normalizedPhone)) {

        return res.status(400).json({

          success: false,

          message:
            "Please enter a valid phone number.",

        });

      }


      /* =========================
         COMPANY VALIDATION
      ========================= */

      if (cleanCompany.length > 100) {

        return res.status(400).json({

          success: false,

          message:
            "Company name cannot exceed 100 characters.",

        });

      }


      /* =========================
         EXPERIENCE VALIDATION
      ========================= */

      const experienceRegex =
        /^(?:0|[1-4]?\d|50)(?:\.\d{1,2})?(?:\s*(?:years?|yrs?))?$/i;


      if (
        !experienceRegex.test(
          cleanExperience
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Please enter valid experience, e.g. 5 years.",

        });

      }


      /* =========================
         RESUME VALIDATION
      ========================= */

      if (!req.file) {

        return res.status(400).json({

          success: false,

          message:
            "Please upload your resume.",

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

      const resend =
        new Resend(
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
            `New Job Application - ${cleanJobTitle}`,


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


                  <!-- POSITION -->

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
                      ${escapeHtml(cleanJobTitle)}
                    </td>

                  </tr>


                  <!-- NAME -->

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
                      ${escapeHtml(cleanName)}
                    </td>

                  </tr>


                  <!-- EMAIL -->

                  <tr>

                    <td style="
                      padding: 12px;
                      background: #f8fafc;
                      font-weight: bold;
                    ">
                      Email
                    </td>

                    <td style="
                      padding: 12px;
                    ">
                      ${escapeHtml(cleanEmail)}
                    </td>

                  </tr>


                  <!-- PHONE -->

                  <tr>

                    <td style="
                      padding: 12px;
                      background: #f8fafc;
                      font-weight: bold;
                    ">
                      Phone Number
                    </td>

                    <td style="
                      padding: 12px;
                    ">
                      ${escapeHtml(cleanPhone)}
                    </td>

                  </tr>


                  <!-- COMPANY -->

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
                        cleanCompany || "Not provided"
                      )}
                    </td>

                  </tr>


                  <!-- EXPERIENCE -->

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
                      ${escapeHtml(cleanExperience)}
                    </td>

                  </tr>


                  <!-- RESUME -->

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


          /* =========================
             RESUME ATTACHMENT
          ========================= */

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
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}


export default router;