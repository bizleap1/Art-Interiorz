// Google Analytics (GA4) Configuration
// Replace G-XXXXXXXXXX with your actual GA4 Measurement ID
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "G-XXXXXXXXXX";

// Initialize Google Analytics
export const initGA = () => {
  // Return early if GA ID is not configured
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === "G-XXXXXXXXXX") {
    console.warn("Google Analytics Measurement ID not configured. Set VITE_GA_MEASUREMENT_ID in .env.local");
    return;
  }

  // Load gtag.js script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track page view
export const trackPageView = (path: string, title?: string) => {
  if (typeof window.gtag !== "function") return;

  window.gtag("event", "page_view", {
    page_title: title || document.title,
    page_location: window.location.href,
    page_path: path,
  });
};

// Track custom events
export const trackEvent = (
  eventName: string,
  parameters?: {
    [key: string]: string | number | boolean;
  }
) => {
  if (typeof window.gtag !== "function") return;

  window.gtag("event", eventName, parameters);
};

// Business-specific event tracking functions
export const trackContactFormSubmission = (formData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) => {
  trackEvent("contact_form_submission", {
    form_type: "contact",
    has_phone: !!formData.phone,
    message_length: formData.message.length,
  });
};

export const trackCallButtonClick = (phoneNumber: string) => {
  trackEvent("call_button_click", {
    phone_number: phoneNumber,
  });
};

export const trackWhatsAppClick = (phoneNumber: string) => {
  trackEvent("whatsapp_click", {
    phone_number: phoneNumber,
  });
};

export const trackServiceInquiry = (serviceName: string) => {
  trackEvent("service_inquiry", {
    service_name: serviceName,
  });
};

export const trackPortfolioItemClick = (projectName: string) => {
  trackEvent("portfolio_item_click", {
    project_name: projectName,
  });
};

export const trackBlogPostClick = (postTitle: string) => {
  trackEvent("blog_post_click", {
    post_title: postTitle,
  });
};

export const trackNavigationClick = (destination: string) => {
  trackEvent("navigation_click", {
    destination: destination,
  });
};

// TypeScript declarations for gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
