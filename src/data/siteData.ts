import {
  Code2,
  Globe,
  Wrench,
  Zap,
  ShieldCheck,
  Smartphone,
  Search,
  Layers3,
  Headphones,
  Megaphone,
  MonitorSmartphone,
} from 'lucide-react';

/* =========================================================
   COMPANY
========================================================= */

export const company = {
  name: 'Happy Technologies',
  shortName: 'HT',
  email: 'happytchn@gmail.com',
  phone: '+91 8050117343',
  location: 'India',
  whatsapp: '918050117343',
};

/* =========================================================
   SERVICES
========================================================= */

export const services = [
  {
    number: '01',
    title: 'Business Website Development',
    description:
      'We create professional, responsive business websites that help customers understand your services, build trust in your brand and get in touch with you easily.',
    icon: Globe,
    image: '/images/business-website.jpg',
  },

  {
    number: '02',
    title: 'Custom Software Development',
    description:
      'We build custom software solutions around your business processes, including internal tools, management systems, automation platforms and tailored business applications.',
    icon: Code2,
    image: '/images/web-app.jpg',
  },

  {
    number: '03',
    title: 'Web Application Development',
    description:
      'We develop modern web applications such as dashboards, customer portals, booking systems and business platforms that work smoothly across devices.',
    icon: MonitorSmartphone,
    image: '/images/hero-dashboard.jpg',
  },

  {
    number: '04',
    title: 'SEO & Digital Visibility',
    description:
      'We improve your website visibility through technical SEO, search-friendly structure, content optimization and best practices that help your business reach relevant customers.',
    icon: Search,
    image: '/images/business-website.jpg',
  },

  {
    number: '05',
    title: 'Digital Marketing',
    description:
      'We help businesses reach the right audience through digital marketing strategies focused on brand awareness, online campaigns, customer engagement and lead generation.',
    icon: Megaphone,
    image: '/images/business-website.jpg',
  },

  {
    number: '06',
    title: 'Website Maintenance & Support',
    description:
      'We continuously maintain and improve websites with content updates, bug fixes, security updates, performance optimization and ongoing technical support.',
    icon: Wrench,
    image: '/images/maintenance.jpg',
  },
];

/* =========================================================
   WHY CHOOSE US
========================================================= */

export const benefits = [
  {
    title: 'Performance',
    description:
      'Fast and responsive digital experiences designed to provide a smooth experience across mobile, tablet and desktop devices.',
    icon: Zap,
  },

  {
    title: 'Reliable Technology',
    description:
      'Clean and maintainable development practices that make your website or application easier to maintain and evolve over time.',
    icon: ShieldCheck,
  },

  {
    title: 'Mobile First',
    description:
      'Every website is designed and developed to work beautifully across smartphones, tablets and desktop devices.',
    icon: Smartphone,
  },

  {
    title: 'SEO Ready',
    description:
      'A strong technical foundation with search-friendly structure, performance and accessibility considerations to support organic visibility.',
    icon: Search,
  },

  {
    title: 'Scalable Solutions',
    description:
      'Flexible architecture that allows your website, software or web application to grow as your business requirements change.',
    icon: Layers3,
  },

  {
    title: 'Ongoing Support',
    description:
      'We can continue supporting your digital products after launch so you always have a technical partner when you need one.',
    icon: Headphones,
  },
];

/* =========================================================
   PORTFOLIO
========================================================= */

export const projects = [
  {
    category: 'INTERIOR DESIGN',
    title: 'Urban Spaces',
    description:
      'A premium business website concept for an interior design studio, focused on showcasing completed projects, services and generating customer enquiries.',
    image: '/images/interior.jpg',
  },

  {
    category: 'REAL ESTATE',
    title: 'Prime Properties',
    description:
      'A modern real-estate website concept designed to present properties clearly, highlight key information and encourage potential buyers to make enquiries.',
    image: '/images/real-estate.jpg',
  },

  {
    category: 'HEALTHCARE',
    title: 'Care Clinic',
    description:
      'A clean healthcare website concept focused on presenting medical services, doctor information, appointment options and easy patient communication.',
    image: '/images/healthcare.jpg',
  },

  {
    category: 'CUSTOM SOFTWARE',
    title: 'Business Operations Suite',
    description:
      'A custom software concept for managing business operations, customers, tasks, reports and internal workflows from a centralized platform.',
    image: '/images/web-app.jpg',
  },

  {
    category: 'SEO & DIGITAL MARKETING',
    title: 'Growth Marketing',
    description:
      'A digital growth concept focused on improving online visibility, search performance, customer engagement and qualified lead generation.',
    image: '/images/business-website.jpg',
  },

  {
    category: 'WEB APPLICATION',
    title: 'Business Dashboard',
    description:
      'A modern web application concept featuring dashboards, business metrics, data visualization and tools designed to help teams make better decisions.',
    image: '/images/hero-dashboard.jpg',
  },
];

/* =========================================================
   DEVELOPMENT PROCESS
========================================================= */

export const processSteps = [
  {
    number: '01',
    title: 'Discover',
    description:
      'We start by understanding your business, customers, competitors, requirements and objectives.',
  },

  {
    number: '02',
    title: 'Plan',
    description:
      'We define the website or application structure, content, functionality and technical approach.',
  },

  {
    number: '03',
    title: 'Design',
    description:
      'We create a clear visual experience that represents your business and communicates your value effectively.',
  },

  {
    number: '04',
    title: 'Develop',
    description:
      'We turn the approved requirements into a responsive, reliable and performant digital product.',
  },

  {
    number: '05',
    title: 'Test',
    description:
      'We test the website or application across devices and browsers before preparing it for launch.',
  },

  {
    number: '06',
    title: 'Launch',
    description:
      'We configure the domain, hosting, SSL, deployment and essential analytics before taking your project live.',
  },
];

/* =========================================================
   WEBSITE PRICING
========================================================= */

export const pricingPlans = [
  {
    name: 'Starter',
    price: '₹30,000',
    description:
      'A professional starting point for small businesses that need a strong and credible online presence.',
  },

  {
    name: 'Business',
    price: '₹50,000',
    description:
      'A complete business website for companies looking for a stronger digital presence and customer lead generation.',
    popular: true,
  },

  {
    name: 'Premium',
    price: '₹75,000+',
    description:
      'For businesses requiring custom functionality, integrations, advanced pages or more complex digital experiences.',
  },
];

/* =========================================================
   MAINTENANCE PLANS
========================================================= */

export const maintenancePlans = [
  {
    name: 'Basic',
    price: '₹5,000',
    description:
      'For businesses that need occasional website updates, content changes and technical assistance.',
  },

  {
    name: 'Professional',
    price: '₹10,000',
    description:
      'For businesses that want regular maintenance, improvements, performance monitoring and priority support.',
  },

  {
    name: 'Premium',
    price: '₹20,000',
    description:
      'For businesses that need continuous development, technical support and ongoing improvements.',
  },
];

/* =========================================================
   FAQ
========================================================= */

export const faqs = [
  {
    question: 'How long does a website take?',
    answer:
      'A typical business website can take around 2–4 weeks depending on the number of pages, content, design requirements and functionality.',
  },

  {
    question: 'Can you redesign an existing website?',
    answer:
      'Yes. We can redesign an existing website and improve its visual design, mobile experience, performance, usability and overall customer experience.',
  },

  {
    question: 'Do you provide domain and hosting setup?',
    answer:
      'Yes. We can help configure your domain, hosting, SSL certificate, deployment and essential website analytics.',
  },

  {
    question: 'Do you provide website maintenance?',
    answer:
      'Yes. We provide ongoing support for content updates, bug fixes, performance improvements, security updates and new requirements.',
  },

  {
    question: 'Can you build custom software?',
    answer:
      'Yes. We can build custom business software including management systems, internal tools, dashboards, automation solutions and other tailored applications.',
  },

  {
    question: 'Can you build custom web applications?',
    answer:
      'Yes. We can develop dashboards, customer portals, booking systems, business platforms and other custom web applications.',
  },

  {
    question: 'Do you provide SEO services?',
    answer:
      'Yes. We can help improve your website visibility through technical SEO, search-friendly structure, content optimization and performance improvements.',
  },

  {
    question: 'Do you provide digital marketing?',
    answer:
      'Yes. We can help businesses with digital marketing strategies focused on online visibility, campaigns, customer engagement and lead generation.',
  },

  {
    question: 'Do you work with clients outside India?',
    answer:
      'Yes. We can work remotely with businesses across India as well as international clients.',
  },
];

/* =========================================================
   CONTACT SERVICE OPTIONS
========================================================= */

export const contactServices = [
  'Business Website Development',
  'Custom Software Development',
  'Web Application Development',
  'SEO & Digital Visibility',
  'Digital Marketing',
  'Website Maintenance & Support',
];