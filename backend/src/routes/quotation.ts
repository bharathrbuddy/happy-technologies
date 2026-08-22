import { Router } from "express";
import PDFDocument from "pdfkit";

const router = Router();

router.post("/", (req, res) => {
  try {
    const { quotation } = req.body;

    if (!quotation) {
      return res.status(400).json({
        message: "Quotation data is required",
      });
    }

    const doc = new PDFDocument({
      margin: 50,
      size: "A4",
    });

    const fileName = `Happy-Technologies-Quotation-${Date.now()}.pdf`;

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileName}"`
    );

    doc.pipe(res);

    // =========================================
    // COMPANY HEADER
    // =========================================

    doc
      .fontSize(24)
      .fillColor("#2563eb")
      .text("Happy Technologies", {
        align: "center",
      });

    doc.moveDown(0.5);

    doc
      .fontSize(11)
      .fillColor("#555555")
      .text(
        "Digital Solutions | Website Development | SEO | Software Development",
        {
          align: "center",
        }
      );

    doc.moveDown(2);

    // =========================================
    // QUOTATION TITLE
    // =========================================

    doc
      .fontSize(20)
      .fillColor("#111111")
      .text("QUOTATION", {
        align: "center",
      });

    doc.moveDown(1);

    // =========================================
    // DATE
    // =========================================

    doc
      .fontSize(11)
      .fillColor("#333333")
      .text(
        `Date: ${new Date().toLocaleDateString(
          "en-IN"
        )}`
      );

    doc.moveDown(1.5);

    // =========================================
    // SERVICE
    // =========================================

    doc
      .fontSize(14)
      .fillColor("#111111")
      .text("Service Details");

    doc.moveDown(0.5);

    doc
      .fontSize(11)
      .fillColor("#333333")
      .text(
        `Service: ${
          quotation.service ||
          quotation.type ||
          "Happy Technologies Service"
        }`
      );

    doc.moveDown(1.5);

    // =========================================
    // PRICE BREAKDOWN
    // =========================================

    doc
      .fontSize(14)
      .fillColor("#111111")
      .text("Quotation Breakdown");

    doc.moveDown(1);

    if (
      quotation.breakdown &&
      Array.isArray(quotation.breakdown)
    ) {
      quotation.breakdown.forEach(
        (item: {
          label: string;
          quantity?: number;
          unitPrice?: number;
          amount: number;
        }) => {
          const quantityText =
            item.quantity !== undefined
              ? ` (${item.quantity}${
                  item.unitPrice
                    ? ` × ₹${item.unitPrice.toLocaleString(
                        "en-IN"
                      )}`
                    : ""
                })`
              : "";

          doc
            .fontSize(11)
            .fillColor("#333333")
            .text(
              `${item.label}${quantityText}: ₹${item.amount.toLocaleString(
                "en-IN"
              )}`
            );

          doc.moveDown(0.5);
        }
      );
    }

    doc.moveDown(1);

    // =========================================
    // TOTAL
    // =========================================

    doc
      .fontSize(16)
      .fillColor("#2563eb")
      .text(
        `Total: ₹${Number(
          quotation.price || 0
        ).toLocaleString("en-IN")}`,
        {
          align: "right",
        }
      );

    if (quotation.billing) {
      doc
        .fontSize(11)
        .fillColor("#555555")
        .text(
          `Billing: ${quotation.billing}`,
          {
            align: "right",
          }
        );
    }

    doc.moveDown(2);

    // =========================================
    // NOTES
    // =========================================

    doc
      .fontSize(12)
      .fillColor("#111111")
      .text("Important Notes");

    doc.moveDown(0.5);

    doc
      .fontSize(10)
      .fillColor("#555555")
      .text(
        "• Final scope and pricing may change based on detailed requirements."
      );

    doc.moveDown(0.3);

    doc.text(
      "• Taxes, third-party services and external subscriptions are not included unless specifically mentioned."
    );

    doc.moveDown(0.3);

    doc.text(
      "• Thank you for choosing Happy Technologies."
    );

    // =========================================
    // FOOTER
    // =========================================

    doc.moveDown(3);

    doc
      .fontSize(10)
      .fillColor("#2563eb")
      .text("Happy Technologies", {
        align: "center",
      });

    doc
      .fontSize(9)
      .fillColor("#777777")
      .text(
        "Professional Digital Solutions for Your Business",
        {
          align: "center",
        }
      );

    doc.end();
  } catch (error) {
    console.error("PDF generation error:", error);

    if (!res.headersSent) {
      return res.status(500).json({
        message:
          "Unable to generate quotation PDF",
      });
    }
  }
});

export default router;