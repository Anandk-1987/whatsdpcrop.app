const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "WhatsApp DP Optimizer",
  "description": "Free online tool to create perfect WhatsApp profile pictures. Resize, blur background, or add solid colors. No registration required. Works on all devices.",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "1500",
    "bestRating": "5",
    "worstRating": "1"
  },
  "featureList": [
    "Instant WhatsApp DP resizing",
    "Background blur effect",
    "Custom background colors",
    "No registration required",
    "Free to use",
    "Works on all devices"
  ],
  "screenshot": "https://whatsappdpoptimizer.com/screenshot.jpg",
  "image": "https://whatsappdpoptimizer.com/logo.png",
  "url": "https://whatsappdpoptimizer.com",
  "author": {
    "@type": "Organization",
    "name": "WhatsApp DP Optimizer",
    "url": "https://whatsappdpoptimizer.com"
  },
  "datePublished": "2024-03-14",
  "dateModified": "2024-03-14",
  "browserRequirements": "Requires JavaScript. Works in all modern browsers.",
  "permissions": "No special permissions required",
  "softwareVersion": "2.0",
  "keywords": "whatsapp dp maker, whatsapp dp size converter, whatsapp profile picture maker, whatsapp dp editor, whatsapp dp resize tool"
};

// Add this to window for easy access
window.structuredData = structuredData;

// Insert structured data into the page
document.addEventListener('DOMContentLoaded', () => {
  const scriptTag = document.getElementById('structured-data');
  if (scriptTag) {
    scriptTag.textContent = JSON.stringify(structuredData);
  }
});
