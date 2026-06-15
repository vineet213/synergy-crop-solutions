export const productCategories = [
  "All",
  "Seed Kits",
  "Nutrition",
  "Protection",
  "Irrigation",
  "Digital Tools",
];

export const productCatalog = [
  {
    id: "seed-kit-pro",
    name: "Seed Kit Pro",
    category: "Seed Kits",
    tagline: "Precision seeding packages for modern row crops.",
    price: "$249/acre",
    lead: "Balanced seed blends and planting guidance for resilient emergence.",
    highlights: [
      "Region-specific seed varieties",
      "Starter nutrition included",
      "Planting and emergence support",
    ],
    features: [
      "High germination performance",
      "Optimized seed spacing profiles",
      "Climate-adaptive formulation",
    ],
    specs: [
      { label: "Crop type", value: "Corn / Soy / Wheat" },
      { label: "Coverage", value: "1-5 acres" },
      { label: "Application", value: "Spring planting" },
    ],
  },
  {
    id: "field-nutrition-360",
    name: "Field Nutrition 360",
    category: "Nutrition",
    tagline: "Complete nutrient programs for healthier canopies and stronger yields.",
    price: "$180/acre",
    lead: "Adaptive soil and foliar nutrition plans calibrated for your field.",
    highlights: [
      "Soil health monitoring",
      "Balanced NPK delivery",
      "Stress-reduction formulas",
    ],
    features: [
      "Slow-release nutrition",
      "Improved nutrient uptake",
      "Compatibility with precision rigs",
    ],
    specs: [
      { label: "Application season", value: "Early season / Mid season" },
      { label: "Delivery", value: "Liquid / Granular" },
      { label: "Support", value: "Field agronomy team" },
    ],
  },
  {
    id: "disease-shield-guard",
    name: "Disease Shield Guard",
    category: "Protection",
    tagline: "Crop protection solutions to prevent fungal and bacterial loss.",
    price: "$95/acre",
    lead: "Effective control with lower resistance risk and safer crop health.",
    highlights: [
      "Broad spectrum disease control",
      "Crop-friendly formulation",
      "Integrated resistance strategy",
    ],
    features: [
      "Rainfast performance",
      "Tank mix ready",
      "Predictable coverage window",
    ],
    specs: [
      { label: "Target crops", value: "Corn, Soy, Vegetables" },
      { label: "Package size", value: "5L / 10L" },
      { label: "Application", value: "Foliar spray" },
    ],
  },
  {
    id: "smart-irrigate-connect",
    name: "Smart Irrigate Connect",
    category: "Irrigation",
    tagline: "Automated water control for field efficiency and healthier roots.",
    price: "$320/system",
    lead: "Smart irrigation hardware and scheduling tools built for variable fields.",
    highlights: [
      "Remote scheduling",
      "Soil moisture feedback",
      "Water usage reporting",
    ],
    features: [
      "Multi-zone control",
      "Low-pressure compatibility",
      "Mobile app monitoring",
    ],
    specs: [
      { label: "System type", value: "Pivot / Drip / Sprinkler" },
      { label: "Connectivity", value: "Cellular / Wi-Fi" },
      { label: "Deployment", value: "30-90 days" },
    ],
  },
  {
    id: "field-vision-analytics",
    name: "Field Vision Analytics",
    category: "Digital Tools",
    tagline: "Actionable field intelligence from satellite and sensor data.",
    price: "$120/month",
    lead: "Crop performance insights, disease flags, and nutrient recommendations in one dashboard.",
    highlights: [
      "Weekly health scoring",
      "Disease risk alerts",
      "Yield trend forecasting",
    ],
    features: [
      "Interactive field maps",
      "Historical performance data",
      "Exportable agronomy reports",
    ],
    specs: [
      { label: "Data sources", value: "Satellite + Sensors" },
      { label: "Reporting", value: "Weekly" },
      { label: "Support", value: "Ag data team" },
    ],
  },
];
