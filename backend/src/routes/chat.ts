import "dotenv/config";

import { Router } from "express";
import { GoogleGenAI } from "@google/genai";
import { COMPANY_PROMPT } from "../promts/companyPrompt";

import {
  calculateSeoPrice,
  calculateWebsitePrice,
  calculateEcommercePrice,
  calculateMaintenancePrice,
  calculateSoftwarePrice,
  formatPrice,
} from "../config/pricing";

const router = Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

// =========================================
// EXTRACT NUMBER BEFORE WORD
// Example:
// "20 pages" -> 20
// "100 keywords" -> 100
// =========================================

function getNumberBeforeWord(
  text: string,
  words: string[]
): number | null {
  const lowerText = text.toLowerCase();

  for (const word of words) {
    const regex = new RegExp(`(\\d+)\\s*${word}`, "i");

    const match = lowerText.match(regex);

    if (match) {
      return Number(match[1]);
    }
  }

  return null;
}

// =========================================
// CHECK IF USER WANTS PRICING / QUOTATION
// =========================================

function isPricingRequest(message: string): boolean {
  const text = message.toLowerCase();

  const pricingWords = [
    "quotation",
    "quote",
    "price",
    "pricing",
    "cost",
    "estimate",
    "how much",
    "charges",
    "charge",
  ];

  return pricingWords.some((word) =>
    text.includes(word)
  );
}

// =========================================
// FORMAT QUOTATION BREAKDOWN
// =========================================

function formatQuotationBreakdown(
  quotation: any
): string {
  return quotation.breakdown
    .map((item: any) => {
      const quantity =
        item.quantity !== undefined &&
        item.unitPrice !== undefined
          ? ` (${item.quantity} × ${formatPrice(
              item.unitPrice
            )})`
          : "";

      return `${item.label}${quantity}: ${formatPrice(
        item.amount
      )}`;
    })
    .join("\n");
}

// =========================================
// CHAT API
// =========================================

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        reply: "Please enter a message.",
      });
    }

    const text = message.toLowerCase();

    // =========================================
    // 1. SEO QUOTATION
    // =========================================

    if (
      text.includes("seo") &&
      isPricingRequest(message)
    ) {
      const keywords = getNumberBeforeWord(text, [
        "keywords",
        "keyword",
      ]);

      const pages = getNumberBeforeWord(text, [
        "pages",
        "page",
      ]);

      if (keywords !== null && pages !== null) {
        const quotation = calculateSeoPrice(
          keywords,
          pages
        );

        const breakdown =
          formatQuotationBreakdown(quotation);

        return res.json({
          reply: `SEO Quotation

${breakdown}

Total: ${formatPrice(
            quotation.price
          )}/${quotation.billing}`,

          quotation,
        });
      }

      if (keywords === null && pages === null) {
        return res.json({
          reply:
            "Sure! 😊 Approximately how many website pages and keywords would you like us to optimise?",
        });
      }

      if (keywords === null) {
        return res.json({
          reply:
            "Sure! 😊 Approximately how many keywords would you like us to optimise?",
        });
      }

      return res.json({
        reply:
          "Sure! 😊 Approximately how many website pages would you like us to optimise?",
      });
    }

    // =========================================
    // 2. WEBSITE MAINTENANCE QUOTATION
    // IMPORTANT: BEFORE WEBSITE CHECK
    // =========================================

    if (
      (
        text.includes("maintenance") ||
        text.includes("maintain") ||
        text.includes("support")
      ) &&
      isPricingRequest(message)
    ) {
      const hours = getNumberBeforeWord(text, [
        "hours",
        "hour",
      ]);

      if (hours !== null) {
        const quotation =
          calculateMaintenancePrice(hours);

        const breakdown =
          formatQuotationBreakdown(quotation);

        return res.json({
          reply: `Website Maintenance Quotation

${breakdown}

Total: ${formatPrice(
            quotation.price
          )}/${quotation.billing}`,

          quotation,
        });
      }

      return res.json({
        reply:
          "Sure! 😊 Approximately how many support hours do you need per month?",
      });
    }

    // =========================================
    // 3. E-COMMERCE QUOTATION
    // IMPORTANT: BEFORE WEBSITE CHECK
    // =========================================

    if (
      (
        text.includes("ecommerce") ||
        text.includes("e-commerce") ||
        text.includes("e commerce") ||
        text.includes("online store") ||
        text.includes("online shop")
      ) &&
      isPricingRequest(message)
    ) {
      const pages =
        getNumberBeforeWord(text, [
          "pages",
          "page",
        ]) ?? 10;

      const products =
        getNumberBeforeWord(text, [
          "products",
          "product",
        ]);

      if (products !== null) {
        const quotation =
          calculateEcommercePrice(
            pages,
            products
          );

        const breakdown =
          formatQuotationBreakdown(quotation);

        return res.json({
          reply: `E-commerce Website Quotation

${breakdown}

Total: ${formatPrice(
            quotation.price
          )}`,

          quotation,
        });
      }

      return res.json({
        reply:
          "Sure! 😊 Approximately how many products would you like to sell online?",
      });
    }

    // =========================================
    // 4. CUSTOM SOFTWARE QUOTATION
    // =========================================

    if (
      (
        text.includes("software") ||
        text.includes("web application") ||
        text.includes("web app") ||
        text.includes("saas") ||
        text.includes("application")
      ) &&
      isPricingRequest(message)
    ) {
      const features = getNumberBeforeWord(text, [
        "features",
        "feature",
      ]);

      if (features !== null) {
        const quotation =
          calculateSoftwarePrice(features);

        const breakdown =
          formatQuotationBreakdown(quotation);

        return res.json({
          reply: `Custom Software Quotation

${breakdown}

Estimated Total: ${formatPrice(
            quotation.price
          )}`,

          quotation,
        });
      }

      return res.json({
        reply:
          "Sure! 😊 Approximately how many main features do you need for the software?",
      });
    }

    // =========================================
    // 5. WEBSITE QUOTATION
    // MUST BE AFTER MAINTENANCE + E-COMMERCE
    // =========================================

    if (
      (
        text.includes("website") ||
        text.includes("web site") ||
        text.includes("business site") ||
        text.includes("corporate site")
      ) &&
      isPricingRequest(message)
    ) {
      const pages = getNumberBeforeWord(text, [
        "pages",
        "page",
      ]);

      if (pages !== null) {
        const quotation =
          calculateWebsitePrice(pages);

        const breakdown =
          formatQuotationBreakdown(quotation);

        return res.json({
          reply: `Website Development Quotation

${breakdown}

Total: ${formatPrice(
            quotation.price
          )}`,

          quotation,
        });
      }

      return res.json({
        reply:
          "Sure! 😊 Approximately how many pages do you need for the website?",
      });
    }

    // =========================================
    // 6. NORMAL GEMINI CHAT
    // =========================================

    const response =
      await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",

        contents: `${COMPANY_PROMPT}

User message:
${message}`,
      });

    return res.json({
      reply:
        response.text ||
        "Sorry, I couldn't generate a response.",
    });
  } catch (error) {
    console.error("Gemini chat error:", error);

    return res.status(500).json({
      reply:
        "Sorry, I'm unable to respond right now. Please try again later.",
    });
  }
});

export default router;