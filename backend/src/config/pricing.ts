export type PriceBreakdown = {
  label: string;
  quantity?: number;
  unitPrice?: number;
  amount: number;
};

export type QuotationResult = {
  service: string;
  packageName: string;
  price: number;
  billing?: string;
  timeline?: string;
  breakdown: PriceBreakdown[];
  notes?: string[];
};

export const PRICING = {
  website: {
    basePrice: 75000,
    includedPages: 5,

    extraPagePrice: 10000,

    customDesignPrice: 25000,
    bookingSystemPrice: 30000,
    contactFormPrice: 5000,
    seoSetupPrice: 15000,

    advanced: {
      startingPrice: 200000,
    },
  },

  ecommerce: {
    basePrice: 150000,
    includedPages: 10,
    includedProducts: 50,

    extraPagePrice: 10000,
    extraProductPrice: 1000,

    paymentIntegrationPrice: 25000,
    shippingIntegrationPrice: 25000,
    inventoryManagementPrice: 50000,
    customFeaturePrice: 50000,

    mediumStartingPrice: 250000,
    advancedStartingPrice: 500000,
  },

  seo: {
    basePrice: 15000,

    includedPages: 4,
    includedKeywords: 10,

    extraPagePrice: 2500,
    extraKeywordPrice: 1000,

    billing: "Per Month",
  },

  maintenance: {
    basePrice: 15000,

    includedHours: 10,

    extraHourPrice: 2500,

    prioritySupportPrice: 10000,
    securityMonitoringPrice: 10000,
    performanceOptimisationPrice: 15000,

    billing: "Per Month",
  },

  software: {
    basePrice: 500000,

    includedFeatures: 10,
    extraFeaturePrice: 50000,

    userManagementPrice: 75000,
    adminDashboardPrice: 100000,
    apiIntegrationPrice: 50000,
    paymentIntegrationPrice: 50000,

    customComplexProject: true,
  },
};

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`;
}

export function calculateSeoPrice(
  keywords: number,
  pages: number
): QuotationResult {
  const seo = PRICING.seo;

  const extraPages = Math.max(0, pages - seo.includedPages);
  const extraKeywords = Math.max(
    0,
    keywords - seo.includedKeywords
  );

  const extraPageAmount =
    extraPages * seo.extraPagePrice;

  const extraKeywordAmount =
    extraKeywords * seo.extraKeywordPrice;

  const total =
    seo.basePrice +
    extraPageAmount +
    extraKeywordAmount;

  return {
    service: "SEO",
    packageName: "Custom SEO Package",
    price: total,
    billing: seo.billing,

    breakdown: [
      {
        label: `Base SEO Package (${seo.includedPages} pages and ${seo.includedKeywords} keywords)`,
        amount: seo.basePrice,
      },

      ...(extraPages > 0
        ? [
            {
              label: "Additional SEO Pages",
              quantity: extraPages,
              unitPrice: seo.extraPagePrice,
              amount: extraPageAmount,
            },
          ]
        : []),

      ...(extraKeywords > 0
        ? [
            {
              label: "Additional SEO Keywords",
              quantity: extraKeywords,
              unitPrice: seo.extraKeywordPrice,
              amount: extraKeywordAmount,
            },
          ]
        : []),
    ],
  };
}

export function calculateWebsitePrice(
  pages: number,
  options?: {
    customDesign?: boolean;
    bookingSystem?: boolean;
    contactForm?: boolean;
    seoSetup?: boolean;
  }
): QuotationResult {
  const website = PRICING.website;

  const extraPages = Math.max(
    0,
    pages - website.includedPages
  );

  const extraPageAmount =
    extraPages * website.extraPagePrice;

  let total =
    website.basePrice +
    extraPageAmount;

  const breakdown: PriceBreakdown[] = [
    {
      label: `Base Website Package (up to ${website.includedPages} pages)`,
      amount: website.basePrice,
    },
  ];

  if (extraPages > 0) {
    breakdown.push({
      label: "Additional Website Pages",
      quantity: extraPages,
      unitPrice: website.extraPagePrice,
      amount: extraPageAmount,
    });
  }

  if (options?.customDesign) {
    total += website.customDesignPrice;

    breakdown.push({
      label: "Custom UI/UX Design",
      amount: website.customDesignPrice,
    });
  }

  if (options?.bookingSystem) {
    total += website.bookingSystemPrice;

    breakdown.push({
      label: "Booking System",
      amount: website.bookingSystemPrice,
    });
  }

  if (options?.contactForm) {
    total += website.contactFormPrice;

    breakdown.push({
      label: "Contact Form",
      amount: website.contactFormPrice,
    });
  }

  if (options?.seoSetup) {
    total += website.seoSetupPrice;

    breakdown.push({
      label: "Basic SEO Setup",
      amount: website.seoSetupPrice,
    });
  }

  return {
    service: "Website Development",
    packageName: "Custom Website Package",
    price: total,
    timeline: "3–8 weeks",
    breakdown,
  };
}

export function calculateEcommercePrice(
  pages: number,
  products: number,
  options?: {
    paymentIntegration?: boolean;
    shippingIntegration?: boolean;
    inventoryManagement?: boolean;
    customFeature?: boolean;
  }
): QuotationResult {
  const ecommerce = PRICING.ecommerce;

  const extraPages = Math.max(
    0,
    pages - ecommerce.includedPages
  );

  const extraProducts = Math.max(
    0,
    products - ecommerce.includedProducts
  );

  const extraPageAmount =
    extraPages * ecommerce.extraPagePrice;

  const extraProductAmount =
    extraProducts * ecommerce.extraProductPrice;

  let total =
    ecommerce.basePrice +
    extraPageAmount +
    extraProductAmount;

  const breakdown: PriceBreakdown[] = [
    {
      label: `Base E-commerce Package (up to ${ecommerce.includedPages} pages and ${ecommerce.includedProducts} products)`,
      amount: ecommerce.basePrice,
    },
  ];

  if (extraPages > 0) {
    breakdown.push({
      label: "Additional Website Pages",
      quantity: extraPages,
      unitPrice: ecommerce.extraPagePrice,
      amount: extraPageAmount,
    });
  }

  if (extraProducts > 0) {
    breakdown.push({
      label: "Additional Products",
      quantity: extraProducts,
      unitPrice: ecommerce.extraProductPrice,
      amount: extraProductAmount,
    });
  }

  if (options?.paymentIntegration) {
    total += ecommerce.paymentIntegrationPrice;

    breakdown.push({
      label: "Payment Integration",
      amount: ecommerce.paymentIntegrationPrice,
    });
  }

  if (options?.shippingIntegration) {
    total += ecommerce.shippingIntegrationPrice;

    breakdown.push({
      label: "Shipping Integration",
      amount: ecommerce.shippingIntegrationPrice,
    });
  }

  if (options?.inventoryManagement) {
    total += ecommerce.inventoryManagementPrice;

    breakdown.push({
      label: "Inventory Management",
      amount: ecommerce.inventoryManagementPrice,
    });
  }

  if (options?.customFeature) {
    total += ecommerce.customFeaturePrice;

    breakdown.push({
      label: "Custom Feature Development",
      amount: ecommerce.customFeaturePrice,
    });
  }

  return {
    service: "E-commerce Development",
    packageName: "Custom E-commerce Package",
    price: total,
    timeline: "6–16 weeks",
    breakdown,
  };
}

export function calculateMaintenancePrice(
  hours: number,
  options?: {
    prioritySupport?: boolean;
    securityMonitoring?: boolean;
    performanceOptimisation?: boolean;
  }
): QuotationResult {
  const maintenance = PRICING.maintenance;

  const extraHours = Math.max(
    0,
    hours - maintenance.includedHours
  );

  const extraHourAmount =
    extraHours * maintenance.extraHourPrice;

  let total =
    maintenance.basePrice +
    extraHourAmount;

  const breakdown: PriceBreakdown[] = [
    {
      label: `Base Maintenance Package (${maintenance.includedHours} support hours)`,
      amount: maintenance.basePrice,
    },
  ];

  if (extraHours > 0) {
    breakdown.push({
      label: "Additional Support Hours",
      quantity: extraHours,
      unitPrice: maintenance.extraHourPrice,
      amount: extraHourAmount,
    });
  }

  if (options?.prioritySupport) {
    total += maintenance.prioritySupportPrice;

    breakdown.push({
      label: "Priority Support",
      amount: maintenance.prioritySupportPrice,
    });
  }

  if (options?.securityMonitoring) {
    total += maintenance.securityMonitoringPrice;

    breakdown.push({
      label: "Security Monitoring",
      amount: maintenance.securityMonitoringPrice,
    });
  }

  if (options?.performanceOptimisation) {
    total += maintenance.performanceOptimisationPrice;

    breakdown.push({
      label: "Performance Optimisation",
      amount: maintenance.performanceOptimisationPrice,
    });
  }

  return {
    service: "Website Maintenance",
    packageName: "Custom Maintenance Package",
    price: total,
    billing: maintenance.billing,
    breakdown,
  };
}

export function calculateSoftwarePrice(
  features: number,
  options?: {
    userManagement?: boolean;
    adminDashboard?: boolean;
    apiIntegration?: boolean;
    paymentIntegration?: boolean;
  }
): QuotationResult {
  const software = PRICING.software;

  const extraFeatures = Math.max(
    0,
    features - software.includedFeatures
  );

  const extraFeatureAmount =
    extraFeatures * software.extraFeaturePrice;

  let total =
    software.basePrice +
    extraFeatureAmount;

  const breakdown: PriceBreakdown[] = [
    {
      label: `Base Custom Software Development (up to ${software.includedFeatures} core features)`,
      amount: software.basePrice,
    },
  ];

  if (extraFeatures > 0) {
    breakdown.push({
      label: "Additional Custom Features",
      quantity: extraFeatures,
      unitPrice: software.extraFeaturePrice,
      amount: extraFeatureAmount,
    });
  }

  if (options?.userManagement) {
    total += software.userManagementPrice;

    breakdown.push({
      label: "User Management System",
      amount: software.userManagementPrice,
    });
  }

  if (options?.adminDashboard) {
    total += software.adminDashboardPrice;

    breakdown.push({
      label: "Admin Dashboard",
      amount: software.adminDashboardPrice,
    });
  }

  if (options?.apiIntegration) {
    total += software.apiIntegrationPrice;

    breakdown.push({
      label: "API Integration",
      amount: software.apiIntegrationPrice,
    });
  }

  if (options?.paymentIntegration) {
    total += software.paymentIntegrationPrice;

    breakdown.push({
      label: "Payment Integration",
      amount: software.paymentIntegrationPrice,
    });
  }

  return {
    service: "Custom Software Development",
    packageName: "Custom Software Package",
    price: total,
    timeline: "Based on detailed requirements",
    breakdown,
  };
}