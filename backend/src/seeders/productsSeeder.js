import { connectDB, disconnectDB } from "../config/db.js";
import Product from "../models/Product.js";
import logger from "../utils/logger.js";

const products = [
  {
    "name": "Aceto",
    "slug": "aceto",
    "category": "biofertilizers",
    "productType": "Gluconacetobacter diazotrophicus Biofertilizer",
    "scientificName": "Gluconacetobacter diazotrophicus",
    "composition": "Gluconacetobacter diazotrophicus 1 × 10⁸ CFU/gm minimum.\nCarrier based lyophilized formulation.",
    "shortDescription": "Aceto is a premium nitrogen fixing biofertilizer containing Gluconacetobacter diazotrophicus that improves nitrogen availability, root development and crop productivity.",
    "longDescription": "Aceto contains highly efficient Gluconacetobacter diazotrophicus capable of fixing atmospheric nitrogen in association with plant roots. Regular application improves nitrogen availability, stimulates root development, enhances vegetative growth and reduces dependence on chemical nitrogen fertilizers.",
    "benefits": [
      "Fixes atmospheric nitrogen biologically.",
      "Improves nitrogen availability in the root zone.",
      "Stimulates root development and growth.",
      "Enhances vegetative growth and crop vigour.",
      "Promotes auxin production for plant development.",
      "Increases tillering and branching.",
      "Improves nutrient uptake efficiency.",
      "Reduces dependence on chemical nitrogen fertilizers.",
      "Supports higher yield potential.",
      "Enhances overall crop productivity."
    ],
    "dosage": "4 kg per acre.\nApply during basal dose through soil application.",
    "applicationMethod": "Soil application.\nBroadcast uniformly and incorporate into soil.",
    "targetCrops": [
      "Sugarcane",
      "Paddy",
      "Cotton",
      "Banana",
      "Maize",
      "Wheat",
      "Vegetables",
      "Fruit crops"
    ],
    "packSize": ["4 Kg"],
    "storage": "Store in a cool and dry place.\nProtect from direct sunlight.",
    "shelfLife": "24 months under recommended storage conditions.",
    "compatibility": "Compatible with biofertilizers and organic inputs.\nAvoid direct mixing with chemical bactericides.",
    "images": [
      "client-assets/products/biofertilizers/aceto.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "Nitrogen Fixing Biofertilizer",
      "technology": "Japanese Lyophilization Technology",
      "certifications": [],
      "usp": [
        "Nitrogen Fixing Technology",
        "Japanese Lyophilization",
        "Improves Crop Vigour",
        "Reduces Chemical Nitrogen Requirement"
      ],
      "seo": {
        "title": "Aceto Gluconacetobacter diazotrophicus Biofertilizer | Synergy Crop Solutions",
        "description": "Premium nitrogen fixing biofertilizer containing Gluconacetobacter diazotrophicus for improved nitrogen availability, root development and crop productivity.",
        "keywords": [
          "nitrogen fixing biofertilizer",
          "gluconacetobacter diazotrophicus",
          "aceto",
          "biological nitrogen fixation",
          "root development",
          "crop productivity",
          "synergy crop solutions"
        ]
      },
      "faqs": [
        {
          "question": "What is Aceto and how does it work?",
          "answer": "Aceto is a premium nitrogen fixing biofertilizer containing Gluconacetobacter diazotrophicus. This bacterium fixes atmospheric nitrogen in association with plant roots, improving nitrogen availability, stimulating root development, enhancing vegetative growth and reducing dependence on chemical nitrogen fertilizers."
        },
        {
          "question": "Which crops benefit from Aceto?",
          "answer": "Aceto is suitable for sugarcane, paddy, cotton, banana, maize, wheat, vegetables and fruit crops."
        },
        {
          "question": "Can Aceto be mixed with other inputs?",
          "answer": "Yes. Aceto is compatible with organic inputs and biofertilizers. Avoid mixing directly with chemical bactericides."
        },
        {
          "question": "How should Aceto be stored?",
          "answer": "Store in a cool and dry place away from direct sunlight. Shelf life is 24 months under recommended storage conditions."
        }
      ]
    }
  },
  {
    "name": "Azospi",
    "slug": "azospi",
    "category": "biofertilizers",
    "productType": "Azospirillum Biofertilizer",
    "scientificName": "Azospirillum",
    "composition": "Azospirillum 1 × 10⁸ CFU/gm minimum.\nCarrier based lyophilized formulation.",
    "shortDescription": "Azospi is a premium Azospirillum based biofertilizer that fixes atmospheric nitrogen, stimulates root growth and improves nutrient uptake for healthy crop development.",
    "longDescription": "Azospi contains highly efficient Azospirillum bacteria that colonize plant roots and enhance biological nitrogen fixation. The product promotes vigorous root development, improves nutrient absorption, enhances vegetative growth and supports sustainable crop production while reducing dependence on chemical nitrogen fertilizers.",
    "benefits": [
      "Fixes atmospheric nitrogen biologically.",
      "Stimulates root proliferation and growth.",
      "Promotes auxin production for plant development.",
      "Improves nutrient uptake and absorption.",
      "Enhances seedling vigour and establishment.",
      "Promotes vigorous vegetative growth.",
      "Increases tillering and branching.",
      "Supports higher yield potential.",
      "Reduces dependence on chemical nitrogen fertilizers.",
      "Enhances overall crop productivity."
    ],
    "dosage": "4 kg per acre.\nApply during basal dose through soil application.",
    "applicationMethod": "Soil application.\nBroadcast uniformly and incorporate into soil.",
    "targetCrops": [
      "Paddy",
      "Wheat",
      "Maize",
      "Sorghum",
      "Pearl Millet",
      "Sugarcane",
      "Cotton",
      "Vegetables",
      "Fruit crops"
    ],
    "packSize": ["4 Kg"],
    "storage": "Store in a cool and dry place.\nProtect from direct sunlight.",
    "shelfLife": "24 months under recommended storage conditions.",
    "compatibility": "Compatible with most biofertilizers and organic inputs.\nAvoid direct mixing with chemical bactericides.",
    "images": [
      "client-assets/products/biofertilizers/azospi.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "Nitrogen Fixing Biofertilizer",
      "technology": "Japanese Lyophilization Technology",
      "certifications": [],
      "usp": [
        "Nitrogen Fixing Technology",
        "Japanese Lyophilization",
        "Stimulates Root Growth",
        "Reduces Chemical Nitrogen Requirement"
      ],
      "seo": {
        "title": "Azospi Azospirillum Biofertilizer | Synergy Crop Solutions",
        "description": "Premium Azospirillum based biofertilizer that fixes atmospheric nitrogen, stimulates root growth and improves nutrient uptake for healthy crop development.",
        "keywords": [
          "azospirillum biofertilizer",
          "nitrogen fixing bacteria",
          "azospi",
          "root growth",
          "nutrient uptake",
          "crop development",
          "synergy crop solutions"
        ]
      },
      "faqs": [
        {
          "question": "What is Azospi and how does it work?",
          "answer": "Azospi is a premium Azospirillum based biofertilizer. Azospirillum bacteria colonize plant roots and fix atmospheric nitrogen, stimulate root proliferation, improve nutrient absorption and enhance vegetative growth while reducing dependence on chemical nitrogen fertilizers."
        },
        {
          "question": "Which crops benefit from Azospi?",
          "answer": "Azospi is suitable for paddy, wheat, maize, sorghum, pearl millet, sugarcane, cotton, vegetables and fruit crops."
        },
        {
          "question": "Can Azospi be mixed with other biofertilizers?",
          "answer": "Yes. Azospi is compatible with most biofertilizers and organic inputs. Avoid direct mixing with chemical bactericides."
        },
        {
          "question": "How should Azospi be stored?",
          "answer": "Store in a cool and dry place, protected from direct sunlight. Shelf life is 24 months under recommended storage conditions."
        }
      ]
    }
  },
  {
    "name": "Azoto",
    "slug": "azoto",
    "category": "biofertilizers",
    "productType": "Azotobacter Biofertilizer",
    "scientificName": "Azotobacter",
    "composition": "Azotobacter 1 × 10⁸ CFU/gm minimum.\nCarrier based lyophilized formulation.",
    "shortDescription": "Azoto is a premium Azotobacter based biofertilizer developed to fix atmospheric nitrogen, improve soil fertility and enhance healthy crop growth.",
    "longDescription": "Azoto contains highly efficient Azotobacter capable of fixing atmospheric nitrogen and producing plant growth promoting substances. It improves soil microbial activity, promotes root development, enhances nutrient uptake and helps reduce dependence on chemical nitrogen fertilizers.",
    "benefits": [
      "Fixes atmospheric nitrogen biologically.",
      "Produces auxin, gibberellin and cytokinin for plant growth.",
      "Improves soil microbial activity.",
      "Promotes root development and growth.",
      "Enhances nutrient uptake efficiency.",
      "Promotes vigorous vegetative growth.",
      "Improves soil fertility and health.",
      "Reduces dependence on chemical nitrogen fertilizers.",
      "Supports higher yield potential.",
      "Enhances overall crop productivity."
    ],
    "dosage": "4 kg per acre.\nApply during basal dose through soil application.",
    "applicationMethod": "Soil application.\nBroadcast uniformly and incorporate into soil.",
    "targetCrops": [
      "Cotton",
      "Wheat",
      "Maize",
      "Sorghum",
      "Pearl Millet",
      "Vegetables",
      "Fruit crops",
      "Oilseeds",
      "Pulses"
    ],
    "packSize": ["4 Kg"],
    "storage": "Store in a cool and dry place.\nProtect from direct sunlight.",
    "shelfLife": "24 months under recommended storage conditions.",
    "compatibility": "Compatible with most biofertilizers and organic inputs.\nAvoid direct mixing with chemical bactericides.",
    "images": [
      "client-assets/products/biofertilizers/azoto.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "Nitrogen Fixing Biofertilizer",
      "technology": "Japanese Lyophilization Technology",
      "certifications": [],
      "usp": [
        "Nitrogen Fixing Technology",
        "Japanese Lyophilization",
        "Improves Soil Fertility",
        "Reduces Chemical Nitrogen Requirement"
      ],
      "seo": {
        "title": "Azoto Azotobacter Biofertilizer | Synergy Crop Solutions",
        "description": "Premium Azotobacter based biofertilizer developed to fix atmospheric nitrogen, improve soil fertility and enhance healthy crop growth.",
        "keywords": [
          "azotobacter biofertilizer",
          "nitrogen fixing bacteria",
          "azoto",
          "soil fertility",
          "crop growth",
          "root development",
          "synergy crop solutions"
        ]
      },
      "faqs": [
        {
          "question": "What is Azoto and how does it work?",
          "answer": "Azoto is a premium Azotobacter based biofertilizer. Azotobacter fixes atmospheric nitrogen and produces plant growth promoting substances including auxin, gibberellin and cytokinin. It improves soil microbial activity, promotes root development, enhances nutrient uptake and reduces dependence on chemical nitrogen fertilizers."
        },
        {
          "question": "Which crops benefit from Azoto?",
          "answer": "Azoto is suitable for cotton, wheat, maize, sorghum, pearl millet, vegetables, fruit crops, oilseeds and pulses."
        },
        {
          "question": "Can Azoto be mixed with other biofertilizers?",
          "answer": "Yes. Azoto is compatible with most biofertilizers and organic inputs. Avoid direct mixing with chemical bactericides."
        },
        {
          "question": "How should Azoto be stored?",
          "answer": "Store in a cool and dry place, protected from direct sunlight. Shelf life is 24 months under recommended storage conditions."
        }
      ]
    }
  },
  {
    "name": "Basu",
    "slug": "basu",
    "category": "biofertilizers",
    "productType": "Bacillus subtilis Biofertilizer",
    "scientificName": "Bacillus subtilis",
    "composition": "Bacillus subtilis 1 × 10⁸ CFU/gm minimum.\nCarrier based lyophilized formulation.",
    "shortDescription": "Basu is a premium Bacillus subtilis based biofertilizer developed to improve soil microbial activity, nutrient availability and healthy crop growth.",
    "longDescription": "Basu contains beneficial Bacillus subtilis that colonizes the rhizosphere, promotes root development and enhances nutrient availability. The product improves soil biological activity, stimulates healthy plant growth and supports sustainable crop production.",
    "benefits": [
      "Improves soil microbial activity.",
      "Promotes root development and growth.",
      "Enhances nutrient availability in the rhizosphere.",
      "Stimulates plant growth and vigour.",
      "Improves nutrient uptake efficiency.",
      "Enhances soil biological health.",
      "Supports stronger crop establishment.",
      "Promotes sustainable crop production.",
      "Improves overall soil fertility.",
      "Supports higher yield potential."
    ],
    "dosage": "4 kg per acre.\nApply during basal dose through soil application.",
    "applicationMethod": "Soil application.\nBroadcast uniformly and incorporate into soil.",
    "targetCrops": [
      "Cereals",
      "Pulses",
      "Oilseeds",
      "Cotton",
      "Sugarcane",
      "Vegetables",
      "Fruit crops"
    ],
    "packSize": ["4 Kg"],
    "storage": "Store in a cool and dry place.\nProtect from direct sunlight.",
    "shelfLife": "24 months under recommended storage conditions.",
    "compatibility": "Compatible with biofertilizers and organic inputs.\nAvoid direct mixing with chemical bactericides.",
    "images": [
      "client-assets/products/biofertilizers/basu.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "PGPR Biofertilizer",
      "technology": "Japanese Lyophilization Technology",
      "certifications": [],
      "usp": [
        "PGPR Technology",
        "Japanese Lyophilization",
        "Improves Soil Microbial Activity",
        "Enhances Nutrient Availability"
      ],
      "seo": {
        "title": "Basu Bacillus subtilis Biofertilizer | Synergy Crop Solutions",
        "description": "Premium Bacillus subtilis based biofertilizer developed to improve soil microbial activity, nutrient availability and healthy crop growth.",
        "keywords": [
          "bacillus subtilis biofertilizer",
          "PGPR biofertilizer",
          "basu",
          "soil microbial activity",
          "nutrient availability",
          "crop growth",
          "synergy crop solutions"
        ]
      },
      "faqs": [
        {
          "question": "What is Basu and how does it work?",
          "answer": "Basu is a premium Bacillus subtilis based biofertilizer. Bacillus subtilis colonizes the rhizosphere, promotes root development, enhances nutrient availability and improves soil biological activity while stimulating healthy plant growth and supporting sustainable crop production."
        },
        {
          "question": "Which crops benefit from Basu?",
          "answer": "Basu is suitable for cereals, pulses, oilseeds, cotton, sugarcane, vegetables and fruit crops."
        },
        {
          "question": "Can Basu be mixed with other biofertilizers?",
          "answer": "Yes. Basu is compatible with biofertilizers and organic inputs. Avoid direct mixing with chemical bactericides."
        },
        {
          "question": "How should Basu be stored?",
          "answer": "Store in a cool and dry place, protected from direct sunlight. Shelf life is 24 months under recommended storage conditions."
        }
      ]
    }
  },
  {
    "name": "Phosphate",
    "slug": "phosphate",
    "category": "biofertilizers",
    "productType": "Phosphate Solubilizing Bacteria (PSB)",
    "scientificName": "Phosphate Solubilizing Bacteria (PSB)",
    "composition": "Phosphate Solubilizing Bacteria 1 × 10⁸ CFU/gm minimum.\nCarrier based lyophilized formulation.",
    "shortDescription": "Phosphate is a premium phosphate solubilizing biofertilizer that converts unavailable soil phosphorus into plant available form, improving nutrient uptake and crop productivity.",
    "longDescription": "Phosphate contains highly efficient phosphate solubilizing microorganisms that release fixed phosphorus from the soil. Regular application improves root development, flowering, nutrient efficiency and overall crop performance while reducing dependence on chemical phosphorus fertilizers.",
    "benefits": [
      "Solubilizes fixed phosphorus in the soil.",
      "Improves phosphorus availability to plants.",
      "Promotes root development and growth.",
      "Enhances flowering and fruit setting.",
      "Improves nutrient uptake efficiency.",
      "Increases fertilizer use efficiency.",
      "Improves crop vigour and establishment.",
      "Supports higher yield potential.",
      "Reduces dependence on chemical phosphorus fertilizers.",
      "Enhances overall crop productivity."
    ],
    "dosage": "4 kg per acre.\nApply during basal dose through soil application.",
    "applicationMethod": "Soil application.\nBroadcast uniformly and incorporate into soil.",
    "targetCrops": [
      "Cereals",
      "Pulses",
      "Oilseeds",
      "Cotton",
      "Sugarcane",
      "Vegetables",
      "Fruit crops"
    ],
    "packSize": ["4 Kg"],
    "storage": "Store in a cool and dry place.\nProtect from direct sunlight.",
    "shelfLife": "24 months under recommended storage conditions.",
    "compatibility": "Compatible with biofertilizers and organic inputs.\nAvoid direct mixing with chemical bactericides.",
    "images": [
      "client-assets/products/biofertilizers/phosphate.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "Phosphate Solubilizing Biofertilizer",
      "technology": "Japanese Lyophilization Technology",
      "certifications": [],
      "usp": [
        "Phosphate Solubilizing Technology",
        "Japanese Lyophilization",
        "Improves Phosphorus Availability",
        "Reduces Chemical Phosphorus Requirement"
      ],
      "seo": {
        "title": "Phosphate Solubilizing Biofertilizer | Synergy Crop Solutions",
        "description": "Premium phosphate solubilizing biofertilizer that converts unavailable soil phosphorus into plant available form, improving nutrient uptake and crop productivity.",
        "keywords": [
          "phosphate solubilizing biofertilizer",
          "PSB",
          "phosphorus availability",
          "root development",
          "crop productivity",
          "synergy crop solutions"
        ]
      },
      "faqs": [
        {
          "question": "What is Phosphate and how does it work?",
          "answer": "Phosphate is a premium phosphate solubilizing biofertilizer containing efficient PSB microorganisms. These bacteria convert unavailable soil phosphorus into plant available form, improving root development, flowering, nutrient efficiency and overall crop performance."
        },
        {
          "question": "Which crops benefit from Phosphate?",
          "answer": "Phosphate is suitable for cereals, pulses, oilseeds, cotton, sugarcane, vegetables and fruit crops."
        },
        {
          "question": "Can Phosphate be mixed with other biofertilizers?",
          "answer": "Yes. Phosphate is compatible with biofertilizers and organic inputs. Avoid direct mixing with chemical bactericides."
        },
        {
          "question": "How should Phosphate be stored?",
          "answer": "Store in a cool and dry place, protected from direct sunlight. Shelf life is 24 months under recommended storage conditions."
        }
      ]
    }
  },
  {
    "name": "Potash",
    "slug": "potash",
    "category": "biofertilizers",
    "productType": "Potash Mobilizing Bacteria (KMB)",
    "scientificName": "Potash Mobilizing Bacteria (KMB)",
    "composition": "Potash Mobilizing Bacteria 1 × 10⁸ CFU/gm minimum.\nCarrier based lyophilized formulation.",
    "shortDescription": "Potash is a premium potash mobilizing biofertilizer that converts unavailable potassium into plant available form for improved crop growth, quality and productivity.",
    "longDescription": "Potash contains highly efficient potassium mobilizing microorganisms that release fixed potassium from soil minerals. Regular application improves nutrient uptake, crop vigour, fruit quality, drought tolerance and fertilizer use efficiency while reducing dependence on chemical potash fertilizers.",
    "benefits": [
      "Mobilizes unavailable potassium in the soil.",
      "Improves potassium availability to plants.",
      "Enhances nutrient uptake efficiency.",
      "Improves stem strength and plant structure.",
      "Enhances fruit quality and size.",
      "Promotes better colour development.",
      "Improves drought tolerance and stress resistance.",
      "Improves crop vigour and establishment.",
      "Supports higher yield potential.",
      "Reduces dependence on chemical potash fertilizers."
    ],
    "dosage": "4 kg per acre.\nApply during basal dose through soil application.",
    "applicationMethod": "Soil application.\nBroadcast uniformly and incorporate into soil.",
    "targetCrops": [
      "Cereals",
      "Pulses",
      "Oilseeds",
      "Cotton",
      "Sugarcane",
      "Vegetables",
      "Fruit crops"
    ],
    "packSize": ["4 Kg"],
    "storage": "Store in a cool and dry place.\nProtect from direct sunlight.",
    "shelfLife": "24 months under recommended storage conditions.",
    "compatibility": "Compatible with biofertilizers and organic inputs.\nAvoid direct mixing with chemical bactericides.",
    "images": [
      "client-assets/products/biofertilizers/potash.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "Potash Mobilizing Biofertilizer",
      "technology": "Japanese Lyophilization Technology",
      "certifications": [],
      "usp": [
        "Potash Mobilizing Technology",
        "Japanese Lyophilization",
        "Improves Potassium Availability",
        "Reduces Chemical Potash Requirement"
      ],
      "seo": {
        "title": "Potash Mobilizing Biofertilizer | Synergy Crop Solutions",
        "description": "Premium potash mobilizing biofertilizer that converts unavailable potassium into plant available form for improved crop growth, quality and productivity.",
        "keywords": [
          "potash mobilizing biofertilizer",
          "KMB",
          "potassium availability",
          "crop quality",
          "drought tolerance",
          "crop productivity",
          "synergy crop solutions"
        ]
      },
      "faqs": [
        {
          "question": "What is Potash and how does it work?",
          "answer": "Potash is a premium potash mobilizing biofertilizer containing efficient KMB microorganisms. These bacteria convert unavailable potassium from soil minerals into plant available form, improving nutrient uptake, crop vigour, fruit quality, drought tolerance and fertilizer use efficiency."
        },
        {
          "question": "Which crops benefit from Potash?",
          "answer": "Potash is suitable for cereals, pulses, oilseeds, cotton, sugarcane, vegetables and fruit crops."
        },
        {
          "question": "Can Potash be mixed with other biofertilizers?",
          "answer": "Yes. Potash is compatible with biofertilizers and organic inputs. Avoid direct mixing with chemical bactericides."
        },
        {
          "question": "How should Potash be stored?",
          "answer": "Store in a cool and dry place, protected from direct sunlight. Shelf life is 24 months under recommended storage conditions."
        }
      ]
    }
  },
  {
    "name": "Rhizo",
    "slug": "rhizo",
    "category": "biofertilizers",
    "productType": "Rhizobium Nitrogen Fixing Biofertilizer",
    "scientificName": "Rhizobium",
    "composition": "Rhizobium 1 × 10⁸ CFU/gm minimum.\nCarrier based lyophilized formulation.",
    "shortDescription": "Rhizo is a premium nitrogen fixing biofertilizer containing Rhizobium that colonizes root nodules of leguminous crops, improving nitrogen availability and crop productivity.",
    "longDescription": "Rhizo contains highly efficient Rhizobium bacteria that colonize root nodules of leguminous crops and fix atmospheric nitrogen into plant usable form. The biological nitrogen fixation improves soil fertility, promotes vigorous plant growth, enhances protein content in grains and reduces dependence on chemical nitrogen fertilizers. Regular application ensures better nodulation, increased biomass production and higher crop yields in legume-based cropping systems.",
    "benefits": [
      "Colonizes legume root nodules effectively.",
      "Fixes atmospheric nitrogen biologically.",
      "Improves soil nitrogen content naturally.",
      "Promotes vigorous plant growth and biomass.",
      "Enhances protein content in legume grains.",
      "Improves nodulation and root development.",
      "Reduces dependence on chemical nitrogen fertilizers.",
      "Supports higher crop yields in legume crops.",
      "Improves soil fertility for subsequent crops.",
      "Environmentally sustainable nitrogen management."
    ],
    "dosage": "4 kg per acre.\nApply during basal dose through soil application.",
    "applicationMethod": "Soil application.\nBroadcast uniformly and incorporate into soil.",
    "targetCrops": [
      "Pigeon Pea",
      "Chickpea",
      "Green Gram",
      "Black Gram",
      "Soybean",
      "Groundnut",
      "Pea",
      "Lentil",
      "Cowpea",
      "Bean"
    ],
    "packSize": ["4 Kg"],
    "storage": "Store in a cool and dry place.\nProtect from direct sunlight.",
    "shelfLife": "24 months under recommended storage conditions.",
    "compatibility": "Compatible with biofertilizers and organic inputs.\nAvoid direct mixing with chemical bactericides.",
    "images": [
      "client-assets/products/biofertilizers/rhizo.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "Nitrogen Fixing Biofertilizer",
      "technology": "Japanese Lyophilization Technology",
      "certifications": [],
      "usp": ["Nitrogen Fixing Technology","Japanese Lyophilization","Improves Root Nodulation","Reduces Chemical Nitrogen Requirement"],
      "seo": {
        "title": "Rhizo Rhizobium Nitrogen Fixing Biofertilizer | Synergy Crop Solutions",
        "description": "Lyophilized Rhizobium - Nitrogen Fixing Bacteria",
        "keywords": [
          "rhizo",
          "bio fertilizer",
          "synergy crop solutions"
        ]
      },
      "faqs": [
        {
          "question": "What is Rhizo and how does it work?",
          "answer": "Lyophilized Rhizobium - Nitrogen Fixing Bacteria"
        },
        {
          "question": "Which crops benefit from Rhizo?",
          "answer": "Rhizo is suitable for Pigeon Pea, Chickpea, Green Gram, Black Gram, Soybean, Groundnut, Pea, Lentil, Cowpea and Bean."
        },
        {
          "question": "Can Rhizo be mixed with other inputs?",
          "answer": "Compatible with biofertilizers and organic inputs."
        },
        {
          "question": "How should Rhizo be stored?",
          "answer": "Store in a cool and dry place away from direct sunlight. Shelf life is 24 months under recommended storage conditions."
        }
      ]
    }
  },
  {
    "name": "Secure-P",
    "slug": "secure-p",
    "category": "biofertilizers",
    "productType": "Lyophilized Phosphate Solubilizing Biofertilizer",
    "scientificName": "Phosphate Solubilizing Microbes",
    "composition": "Phosphate Solubilizing Microbes 1 × 10⁸ CFU/gm minimum.\nJapanese lyophilized carrier based formulation.",
    "shortDescription": "Secure-P is a Japanese lyophilized phosphate solubilizing biofertilizer designed to convert insoluble phosphorus present in soil into plant available form for improved crop growth and nutrient uptake.",
    "longDescription": "Secure-P contains highly efficient phosphate solubilizing microorganisms that release bound phosphorus from the soil and make it available to crops. Improved phosphorus availability promotes stronger root development, better flowering, improved nutrient utilization and higher crop productivity.",
    "benefits": [
      "Improves phosphorus availability.",
      "Solubilizes fixed phosphorus.",
      "Improves root growth.",
      "Enhances flowering.",
      "Improves nutrient uptake.",
      "Improves crop vigour.",
      "Promotes healthy plant development.",
      "Supports better yield formation.",
      "Improves fertilizer efficiency.",
      "Reduces phosphorus fertilizer wastage."
    ],
    "dosage": "4 kg per acre.\nApply during basal dose through soil application.",
    "applicationMethod": "Soil application.\nBroadcast uniformly and incorporate into soil.",
    "targetCrops": [
      "All field crops",
      "Sugarcane",
      "Cotton",
      "Soybean",
      "Groundnut",
      "Maize",
      "Wheat",
      "Rice",
      "Vegetables",
      "Fruit crops",
      "Banana",
      "Pomegranate",
      "Grapes",
      "Citrus"
    ],
    "packSize": ["4 Kg"],
    "storage": "Store in a cool and dry place.\nProtect from direct sunlight.",
    "shelfLife": "24 months under recommended storage conditions.",
    "compatibility": "Compatible with biofertilizers and organic inputs.\nAvoid direct mixing with chemical bactericides.",
    "images": [
      "client-assets/products/biofertilizers/secure-p.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "Phosphate Solubilizing Biofertilizer",
      "technology": "Japanese Lyophilization Technology",
      "certifications": [],
      "usp": ["Japanese Lyophilization","Phosphate Solubilizing Technology","Improves Phosphorus Uptake","Enhances Root Development"],
      "seo": {
        "title": "Secure-P Phosphate Solubilizing Biofertilizer | Synergy Crop Solutions",
        "description": "Japanese lyophilized phosphate solubilizing biofertilizer that converts insoluble soil phosphorus into plant available form for improved crop growth and nutrient uptake.",
        "keywords": [
          "phosphate solubilizing biofertilizer",
          "secure-p",
          "phosphorus fertilizer",
          "root growth",
          "crop yield",
          "synergy crop solutions",
          "japanese lyophilization",
          "soil health",
          "nutrient uptake"
        ]
      },
      "faqs": [
        {
          "question": "What is Secure-P and how does it work?",
          "answer": "Secure-P is a Japanese lyophilized phosphate solubilizing biofertilizer containing highly efficient microorganisms that release bound phosphorus from the soil and convert it into a plant available form. This improved phosphorus availability promotes stronger root development, better flowering and higher crop productivity."
        },
        {
          "question": "Which crops can use Secure-P?",
          "answer": "Secure-P is suitable for all field crops including sugarcane, cotton, soybean, groundnut, maize, wheat, rice, vegetables and fruit crops such as banana, pomegranate, grapes and citrus."
        },
        {
          "question": "How does Secure-P help reduce phosphorus fertilizer wastage?",
          "answer": "Secure-P contains phosphate solubilizing microorganisms that convert fixed, insoluble phosphorus in the soil into plant available form. This makes previously locked phosphorus accessible to crops, reducing the need for additional phosphorus fertilizer application and minimizing wastage."
        },
        {
          "question": "Can Secure-P be used with other biofertilizers?",
          "answer": "Yes. Secure-P is compatible with organic inputs and other biofertilizers. Avoid mixing directly with chemical bactericides or fungicides."
        }
      ]
    }
  },
  {
    "name": "Tri Immune",
    "slug": "tri-immune",
    "category": "biofertilizers",
    "productType": "Triple Consortium Biofertilizer",
    "scientificName": "Trichoderma + Pseudomonas + Bacillus Consortium",
    "composition": "Trichoderma viride + Pseudomonas fluorescens + Bacillus subtilis consortium.\nLyophilized carrier based formulation.",
    "shortDescription": "Tri Immune is a powerful triple-action consortium biofertilizer containing Trichoderma viride, Pseudomonas fluorescens and Bacillus subtilis for comprehensive plant protection and growth promotion.",
    "longDescription": "Tri Immune is a powerful triple-action consortium containing Trichoderma viride, Pseudomonas fluorescens and Bacillus subtilis — three beneficial microorganisms that work synergistically to suppress soil borne diseases, enhance nutrient availability and promote vigorous plant growth. Trichoderma viride controls fungal pathogens through mycoparasitism and competition. Pseudomonas fluorescens produces antimicrobial compounds and induces systemic resistance. Bacillus subtilis colonizes the rhizosphere, improves nutrient cycling and supports root health. This unique combination provides comprehensive plant protection and growth promotion in a single formulation.",
    "benefits": [
      "Triple microbial consortium for comprehensive protection.",
      "Suppresses soil borne fungal pathogens.",
      "Produces antimicrobial compounds against pathogens.",
      "Induces systemic resistance in plants.",
      "Colonizes the rhizosphere effectively.",
      "Improves nutrient availability and cycling.",
      "Promotes healthy root development.",
      "Enhances plant growth and vigour.",
      "Reduces dependence on chemical fungicides.",
      "Supports sustainable crop production."
    ],
    "dosage": "4 kg per acre.\nApply during basal dose through soil application.",
    "applicationMethod": "Soil application.\nBroadcast uniformly and incorporate into soil.",
    "targetCrops": [
      "Cotton",
      "Sugarcane",
      "Cereals",
      "Pulses",
      "Oilseeds",
      "Vegetables",
      "Fruit crops",
      "Plantation crops"
    ],
    "packSize": ["4 Kg"],
    "storage": "Store in a cool and dry place.\nProtect from direct sunlight.",
    "shelfLife": "24 months under recommended storage conditions.",
    "compatibility": "Compatible with biofertilizers and organic inputs.\nAvoid direct mixing with chemical bactericides.",
    "images": [
      "client-assets/products/biofertilizers/tri-immune.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "Triple Consortium Biofertilizer",
      "technology": "Japanese Lyophilization Technology",
      "certifications": [],
      "usp": ["Triple Consortium Technology","Japanese Lyophilization","Biocontrol + Nutrition","Improves Soil Health"],
      "seo": {
        "title": "Tri Immune Triple Consortium Biofertilizer | Synergy Crop Solutions",
        "description": "Triple consortium biofertilizer containing Trichoderma viride, Pseudomonas fluorescens and Bacillus subtilis for comprehensive plant protection and growth promotion.",
        "keywords": [
          "tri immune",
          "bio fertilizer",
          "synergy crop solutions"
        ]
      },
      "faqs": [
        {
          "question": "What is Tri Immune and how does it work?",
          "answer": "Lyophilized Phosphate Solubilizing Fungal Bio Fertilizer"
        },
        {
          "question": "Which crops benefit from Tri Immune?",
          "answer": "Tri Immune is suitable for Cotton, Sugarcane, Cereals, Pulses, Oilseeds, Vegetables, Fruit crops and Plantation crops."
        },
        {
          "question": "Can Tri Immune be mixed with other inputs?",
          "answer": "Compatible with biofertilizers and organic inputs."
        },
        {
          "question": "How should Tri Immune be stored?",
          "answer": "Store in a cool and dry place away from direct sunlight. Shelf life is 24 months under recommended storage conditions."
        }
      ]
    }
  },
  {
    "name": "VAM",
    "slug": "vam",
    "category": "biofertilizers",
    "productType": "Mycorrhizal Biofertilizer",
    "scientificName": "Vesicular Arbuscular Mycorrhizal Fungi",
    "composition": "Vesicular Arbuscular Mycorrhizal fungi.\nCarrier based formulation.",
    "shortDescription": "VAM is a mycorrhizal biofertilizer containing endomycorrhizal fungi that extend the root absorption zone, improving phosphorus uptake, water absorption and plant tolerance to drought.",
    "longDescription": "VAM contains highly infective endomycorrhizal fungi (Vesicular Arbuscular Mycorrhiza) that form a symbiotic association with plant roots, extending the root absorption zone by up to 100 times. The mycorrhizal network improves phosphorus and micronutrient uptake, enhances water absorption and increases plant tolerance to drought and salinity stress. VAM also improves soil aggregation, enhances beneficial rhizosphere microbial activity and supports healthier, more resilient crop production.",
    "benefits": [
      "Extends root absorption zone significantly.",
      "Improves phosphorus and micronutrient uptake.",
      "Enhances water absorption and drought tolerance.",
      "Improves plant tolerance to salinity stress.",
      "Promotes better soil aggregation and structure.",
      "Increases beneficial rhizosphere microbial activity.",
      "Improves nutrient use efficiency.",
      "Supports healthier and more resilient crops.",
      "Reduces requirement for chemical phosphorus fertilizers.",
      "Promotes sustainable soil health management."
    ],
    "dosage": "4 kg per acre.\nApply during basal dose near root zone.",
    "applicationMethod": "Soil application.\nApply near root zone and incorporate into soil.",
    "targetCrops": [
      "Cereals",
      "Pulses",
      "Oilseeds",
      "Cotton",
      "Sugarcane",
      "Vegetables",
      "Fruit crops",
      "Onion",
      "Tomato",
      "Chilli",
      "Citrus",
      "Grapes",
      "Banana",
      "Floriculture crops"
    ],
    "packSize": ["4 Kg"],
    "storage": "Store in a cool and dry place.\nProtect from direct sunlight.",
    "shelfLife": "24 months under recommended storage conditions.",
    "compatibility": "Compatible with biofertilizers and organic inputs.\nAvoid direct mixing with chemical bactericides.",
    "images": [
      "client-assets/products/biofertilizers/vam.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "Mycorrhizal Biofertilizer",
      "technology": "Japanese Lyophilization Technology",
      "certifications": [],
      "usp": ["Mycorrhizal Technology","Improves Root Colonization","Enhances Phosphorus Uptake","Promotes Plant Vigour"],
      "seo": {
        "title": "VAM Mycorrhizal Biofertilizer | Synergy Crop Solutions",
        "description": "Mycorrhizal Bio-Fertilizer - Endosymbiotic Endomycorrhizae",
        "keywords": [
          "vam",
          "bio fertilizer",
          "synergy crop solutions"
        ]
      },
      "faqs": [
        {
          "question": "What is VAM and how does it work?",
          "answer": "Mycorrhizal Bio-Fertilizer - Endosymbiotic Endomycorrhizae"
        },
        {
          "question": "Which crops benefit from VAM?",
          "answer": "VAM is suitable for Cereals, Pulses, Oilseeds, Cotton, Sugarcane, Vegetables, Fruit crops, Onion, Tomato, Chilli, Citrus, Grapes, Banana and Floriculture crops."
        },
        {
          "question": "Can VAM be mixed with other inputs?",
          "answer": "Compatible with biofertilizers and organic inputs."
        },
        {
          "question": "How should VAM be stored?",
          "answer": "Store in a cool and dry place away from direct sunlight. Shelf life is 24 months under recommended storage conditions."
        }
      ]
    }
  },
  {
    "name": "Zinc",
    "slug": "zinc",
    "category": "biofertilizers",
    "productType": "Zn, Fe, Si, S based Consortium Biofertilizer",
    "scientificName": "",
    "composition": "Microbial consortium for:\n• Zinc (Zn)\n• Iron (Fe)\n• Silicon (Si)\n• Sulphur (S)",
    "shortDescription": "Zinc is a speciality consortium biofertilizer formulated to improve the availability of Zinc, Iron, Silicon and Sulphur through beneficial microorganisms.",
    "longDescription": "Zinc is a speciality consortium biofertilizer formulated with beneficial microorganisms that mobilize and improve the availability of Zinc, Iron, Silicon and Sulphur in the soil. These essential micronutrients are often locked in unavailable forms in agricultural soils. The microbial consortium in Zinc produces organic acids, siderophores and enzymes that solubilize and chelate these nutrients, making them readily available for plant uptake. Regular application corrects micronutrient deficiencies, improves crop quality and vigour, enhances photosynthetic efficiency and reduces the requirement for chemical micronutrient fertilizers by approximately 30–40%.",
    "benefits": [
      "Improves Zinc availability.",
      "Improves Iron availability.",
      "Improves Silicon availability.",
      "Improves Sulphur availability.",
      "Produces Auxins.",
      "Promotes root development.",
      "Improves plant growth.",
      "Improves crop vigour.",
      "Improves nutrient uptake.",
      "Helps improve crop quality.",
      "Helps reduce chemical fertilizer requirement by approximately 30–40%."
    ],
    "dosage": "Apply 4 kg per acre.",
    "applicationMethod": "Soil application.\nBroadcast uniformly and incorporate into soil.",
    "targetCrops": [
      "Cereals",
      "Pulses",
      "Oilseeds",
      "Cotton",
      "Sugarcane",
      "Vegetables",
      "Fruit crops",
      "Soybean",
      "Groundnut",
      "Tomato",
      "Chilli",
      "Onion"
    ],
    "packSize": ["4 Kg"],
    "storage": "Store in a cool and dry place.\nProtect from direct sunlight.",
    "shelfLife": "24 months under recommended storage conditions.",
    "compatibility": "Compatible with biofertilizers and organic inputs.\nAvoid direct mixing with chemical bactericides.",
    "images": [
      "client-assets/products/biofertilizers/zinc.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "Speciality Biofertilizer",
      "technology": "Japanese Lyophilization Technology",
      "certifications": [
        "Ecocert Inputs",
        "100% Organic",
        "FCO Approved",
        "ISO 9001:2008 Company"
      ],
      "usp": [
        "Speciality Consortium Technology",
        "Japanese Lyophilization",
        "Multi-Micronutrient Mobilization",
        "Reduces Chemical Micronutrient Requirement"
      ],
      "seo": {
        "title": "Zinc Speciality Biofertilizer | Synergy Crop Solutions",
        "description": "Speciality consortium biofertilizer for improving Zinc, Iron, Silicon and Sulphur availability for healthy crop growth.",
        "keywords": [
          "zinc biofertilizer",
          "Zn Fe Si S consortium",
          "zinc availability",
          "micronutrient biofertilizer",
          "crop quality",
          "synergy crop solutions"
        ]
      },
      "faqs": [
        {
          "question": "What is Zinc and how does it work?",
          "answer": "Zinc is a speciality consortium biofertilizer containing beneficial microorganisms that improve the availability of Zinc, Iron, Silicon and Sulphur. The microbial activity mobilizes these micronutrients making them accessible to plants."
        },
        {
          "question": "Which crops benefit from Zinc?",
          "answer": "Zinc is suitable for cereals, pulses, oilseeds, cotton, sugarcane, vegetables and fruit crops."
        },
        {
          "question": "Can Zinc be mixed with other biofertilizers?",
          "answer": "Yes. Zinc is compatible with biofertilizers and organic inputs. Avoid direct mixing with chemical bactericides."
        },
        {
          "question": "How should Zinc be stored?",
          "answer": "Store in a cool and dry place, protected from direct sunlight. Shelf life is 24 months under recommended storage conditions."
        }
      ]
    }
  },
  {
    "name": "Meta",
    "slug": "meta",
    "category": "biopesticides",
    "productType": "Metarhizium anisopliae 1.0% WP",
    "scientificName": "Metarhizium anisopliae",
    "composition": "Metarhizium anisopliae 1% W.P. (1X10⁹ CFU/gm min.)",
    "shortDescription": "Meta is a biological insecticide based on Metarhizium anisopliae that naturally infects and controls a wide range of soil and foliage insect pests without chemical residues.",
    "longDescription": "Meta is a potent biological insecticide based on Metarhizium anisopliae 1% WP, an entomopathogenic fungus that naturally infects and controls a wide range of soil and foliage insect pests. The fungal spores germinate on the insect cuticle, penetrate the body cavity and proliferate internally, causing death through nutrient depletion and toxin production. Meta is an ideal tool for integrated pest management programs, providing effective biological control without chemical residues.",
    "benefits": [
      "Naturally infects and controls insect pests.",
      "Effective against soil and foliage pests.",
      "No chemical residues in produce or environment.",
      "Safe for natural enemies and beneficial insects.",
      "Compatible with integrated pest management.",
      "Targets multiple insect life stages.",
      "Reduces reliance on chemical insecticides.",
      "Supports sustainable pest management.",
      "Can be used in organic farming systems.",
      "Long residual activity in soil environment."
    ],
    "dosage": "2.5 kg per acre through soil application.\nMix with fine sand or farmyard manure for uniform broadcast.",
    "applicationMethod": "Soil application.\nMix with fine sand or farmyard manure and broadcast uniformly.",
    "targetCrops": [
      "Sugarcane",
      "Cotton",
      "Paddy",
      "Maize",
      "Vegetables",
      "Fruit crops",
      "Plantation crops",
      "Pulses",
      "Oilseeds"
    ],
    "packSize": [
      "1 Kg"
    ],
    "storage": "Store in a cool and dry place.\nProtect from direct sunlight.",
    "shelfLife": "24 months under recommended storage conditions.",
    "compatibility": "Compatible with most bio-inputs.\nAvoid direct mixing with chemical fungicides.",
    "images": [
      "client-assets/products/biopesticides/meta.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "Bio Insecticide",
      "technology": "Wettable Powder (WP) Formulation",
      "certifications": [],
      "usp": ["Entomopathogenic Fungi","No Chemical Residues","Broad Spectrum Control","Safe for Beneficial Insects"],
      "seo": {
        "title": "Metarhizium anisopliae Bio Insecticide | Synergy Crop Solutions",
        "description": "Biological insecticide based on Metarhizium anisopliae for effective management of soil and foliage insect pests through natural fungal infection.",
        "keywords": [
          "Metarhizium anisopliae",
          "bio insecticide",
          "bio pesticide",
          "entomopathogenic fungus",
          "soil pest control",
          "IPM",
          "synergy crop solutions"
        ]
      },
      "faqs": [
        {
          "question": "What is Meta and how does it work?",
          "answer": "Meta is a biological insecticide based on Metarhizium anisopliae 1% WP. The entomopathogenic fungus infects insects through the cuticle, proliferates inside the host and causes death through nutrient depletion and toxin production, providing effective management of soil and foliage insect pests."
        },
        {
          "question": "Which pests does Meta control?",
          "answer": "Meta is effective against a wide range of insect pests including white grubs, root weevils, termites, thrips, aphids, leafhoppers, mealybugs, fruit borers and caterpillars."
        },
        {
          "question": "Which crops is Meta suitable for?",
          "answer": "Meta is suitable for sugarcane, cotton, paddy, maize, vegetables, fruit crops, plantation crops, pulses and oilseeds."
        },
        {
          "question": "Can Meta be mixed with chemical pesticides?",
          "answer": "Meta is compatible with most organic inputs and biopesticides. Avoid direct mixing with chemical fungicides as they may reduce spore viability."
        }
      ]
    }
  },
  {
    "name": "Pseudo",
    "slug": "pseudo",
    "category": "biopesticides",
    "productType": "Pseudomonas fluorescens 1.0% WP",
    "scientificName": "Pseudomonas fluorescens",
    "composition": "Pseudomonas fluorescens 1.0% WP (CFU Count: 1 x 10⁹/gm minimum)",
    "shortDescription": "Pseudo is a biological fungicide based on Pseudomonas fluorescens that suppresses plant diseases, promotes root growth and improves nutrient availability through phosphate solubilization.",
    "longDescription": "Pseudo is a highly effective biological fungicide based on Pseudomonas fluorescens 1% WP that naturally suppresses soil-borne and foliar plant diseases while actively promoting plant growth. The beneficial bacteria colonize the rhizosphere and produce antibiotics, siderophores and hydrolytic enzymes that inhibit pathogen growth. Pseudo also induces systemic resistance in plants, strengthens natural defence mechanisms and improves nutrient availability through phosphate solubilization and iron chelation. Regular application ensures healthier root systems, reduced disease pressure and improved crop productivity.",
    "benefits": [
      "Suppresses soil and foliar plant diseases.",
      "Produces antibiotics against fungal pathogens.",
      "Produces siderophores for iron competition.",
      "Induces systemic resistance in plants.",
      "Colonizes the rhizosphere effectively.",
      "Solubilizes phosphorus for plant uptake.",
      "Improves root health and development.",
      "Strengthens natural plant defence mechanisms.",
      "Promotes overall plant growth and vigour.",
      "Compatible with integrated disease management."
    ],
    "dosage": "2.5 kg per acre through soil application.\nFor foliar spray: 5 gm per litre of water.",
    "applicationMethod": "Soil application or foliar spray.\nMix with fine sand for soil broadcast. Dissolve in water for foliar spray.",
    "targetCrops": [
      "Vegetables",
      "Fruit crops",
      "Cotton",
      "Sugarcane",
      "Paddy",
      "Pulses",
      "Oilseeds",
      "Plantation crops"
    ],
    "packSize": [
      "250 gm"
    ],
    "storage": "Store in a cool and dry place.\nProtect from direct sunlight.",
    "shelfLife": "24 months under recommended storage conditions.",
    "compatibility": "Compatible with most bio-inputs.\nAvoid direct mixing with chemical fungicides.",
    "images": [
      "client-assets/products/biopesticides/pseudo.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "Bio Fungicide",
      "technology": "Wettable Powder (WP) Formulation",
      "certifications": [],
      "usp": ["Bio-Fungicide + Bio-Insecticide","Dual Mode of Action","No Chemical Residues","Safe for Beneficial Microbes"],
      "seo": {
        "title": "Pseudomonas fluorescens Bio Fungicide | Synergy Crop Solutions",
        "description": "Biological fungicide based on Pseudomonas fluorescens for suppression of soil and foliar plant diseases while promoting healthy crop growth.",
        "keywords": [
          "Pseudomonas fluorescens",
          "bio fungicide",
          "bio pesticide",
          "disease suppression",
          "rhizosphere colonization",
          "plant growth promotion",
          "synergy crop solutions"
        ]
      },
      "faqs": [
        {
          "question": "What is Pseudo and how does it work?",
          "answer": "Pseudo is a biological fungicide based on Pseudomonas fluorescens 1% WP. The beneficial bacteria colonize the rhizosphere, suppress plant pathogenic fungi through antibiosis, siderophore production and induced systemic resistance, and promote healthy plant growth."
        },
        {
          "question": "Which diseases does Pseudo control?",
          "answer": "Pseudo is effective against damping off, root rot, wilt diseases, leaf blight, bacterial leaf spot and post-harvest rots caused by fungal and bacterial pathogens."
        },
        {
          "question": "Which crops is Pseudo suitable for?",
          "answer": "Pseudo is suitable for vegetables, fruit crops, cotton, sugarcane, paddy, pulses, oilseeds and plantation crops."
        },
        {
          "question": "Can Pseudo be mixed with chemical fungicides?",
          "answer": "Pseudo is compatible with most bio-inputs. Avoid direct mixing with chemical fungicides as they may adversely affect the beneficial bacterial population."
        }
      ]
    }
  },
  {
    "name": "Tricho",
    "slug": "tricho",
    "category": "biopesticides",
    "productType": "Trichoderma viride 1.5% WP",
    "scientificName": "Trichoderma viride",
    "composition": "Trichoderma viride 1.5% WP (CFU Count: 2 x 10⁹/gm minimum)",
    "shortDescription": "Tricho is a high-potency biological fungicide based on Trichoderma viride that controls soil-borne fungal diseases through mycoparasitism and induces systemic resistance in plants.",
    "longDescription": "Tricho is a high-potency biological fungicide based on Trichoderma viride 1.5% WP (2 × 10⁹ CFU/gm) that effectively controls soil-borne fungal diseases through multiple mechanisms of action. The fungal spores colonize the root zone aggressively, competing with pathogens for space and nutrients. Trichoderma viride parasitizes fungal pathogens directly through mycoparasitism, secreting cell wall degrading enzymes that break down pathogen structures. It also produces antifungal metabolites that inhibit pathogen growth and induces systemic resistance in the plant. Regular application improves root health, enhances nutrient uptake and supports vigorous crop growth.",
    "benefits": [
      "Controls soil borne fungal diseases effectively.",
      "Colonizes root zone aggressively.",
      "Parasitizes fungal pathogens through mycoparasitism.",
      "Produces cell wall degrading enzymes.",
      "Secretes antifungal metabolites.",
      "Induces systemic resistance in plants.",
      "Improves root health and development.",
      "Enhances nutrient uptake efficiency.",
      "Promotes vigorous crop growth.",
      "Compatible with integrated disease management."
    ],
    "dosage": "2.5 kg per acre through soil application.\nMix with fine sand or farmyard manure.",
    "applicationMethod": "Soil application.\nMix with fine sand or farmyard manure and broadcast uniformly.",
    "targetCrops": [
      "Cotton",
      "Sugarcane",
      "Vegetables",
      "Fruit crops",
      "Pulses",
      "Oilseeds",
      "Plantation crops"
    ],
    "packSize": [
      "1 Kg"
    ],
    "storage": "Store in a cool and dry place.\nProtect from direct sunlight.",
    "shelfLife": "24 months under recommended storage conditions.",
    "compatibility": "Compatible with most bio-inputs.\nAvoid direct mixing with chemical fungicides.",
    "images": [
      "client-assets/products/biopesticides/tricho.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "Bio Fungicide",
      "technology": "Wettable Powder (WP) Formulation",
      "certifications": [],
      "usp": ["Broad Spectrum Bio-Fungicide","Soil Born Disease Management","No Chemical Residues","Enhances Root Health"],
      "seo": {
        "title": "Trichoderma viride Bio Fungicide | Synergy Crop Solutions",
        "description": "Biological fungicide based on Trichoderma viride for suppression of soil borne fungal diseases while improving root health and crop vigour.",
        "keywords": [
          "Trichoderma viride",
          "bio fungicide",
          "bio pesticide",
          "soil borne disease",
          "root health",
          "fungal suppression",
          "synergy crop solutions"
        ]
      },
      "faqs": [
        {
          "question": "What is Tricho and how does it work?",
          "answer": "Tricho is a biological fungicide based on Trichoderma viride 1.5% WP. The fungal spores colonize the root zone and suppress plant pathogenic fungi through competition, mycoparasitism and production of antifungal metabolites, improving root health and crop vigour."
        },
        {
          "question": "Which diseases does Tricho control?",
          "answer": "Tricho is effective against damping off, root rot, collar rot, Fusarium wilt, Rhizoctonia, Pythium and Sclerotium."
        },
        {
          "question": "Which crops is Tricho suitable for?",
          "answer": "Tricho is suitable for cotton, sugarcane, vegetables, fruit crops, pulses, oilseeds and plantation crops."
        },
        {
          "question": "Can Tricho be mixed with chemical fungicides?",
          "answer": "Tricho is compatible with most bio-inputs. Avoid direct mixing with chemical fungicides as they may harm the viable fungal spores."
        }
      ]
    }
  },
  {
    "name": "Tricho-H",
    "slug": "tricho-h",
    "category": "biopesticides",
    "productType": "Trichoderma harzianum 1.0% WP",
    "scientificName": "Trichoderma harzianum",
    "composition": "Trichoderma harzianum 1.0% W.P. (2X10⁹ CFU/gm min.)",
    "shortDescription": "Tricho-H is a biological fungicide based on Trichoderma harzianum for effective management of soil borne fungal diseases while improving root health and crop vigour.",
    "longDescription": "Tricho-H contains viable spores of Trichoderma harzianum that colonize the root zone and suppress plant pathogenic fungi through competition, mycoparasitism and production of antifungal metabolites. It promotes healthy root systems, improves nutrient uptake and supports sustainable crop production.",
    "benefits": [
      "Suppresses soil borne fungal pathogens.",
      "Improves root establishment.",
      "Improves nutrient uptake.",
      "Better seedling vigour.",
      "Improves soil microbial balance.",
      "Promotes healthy plant growth.",
      "Improves crop vigour.",
      "Supports sustainable disease management."
    ],
    "dosage": "2.5 kg per acre through soil application.\nMix with fine sand or farmyard manure.",
    "applicationMethod": "Soil application.\nMix with fine sand or farmyard manure and broadcast uniformly.",
    "targetCrops": [
      "Cotton",
      "Sugarcane",
      "Vegetables",
      "Fruit crops",
      "Pulses",
      "Oilseeds",
      "Plantation crops"
    ],
    "targetDiseases": [
      "Damping off",
      "Root rot",
      "Collar rot",
      "Fusarium wilt",
      "Rhizoctonia",
      "Pythium",
      "Sclerotium"
    ],
    "packSize": ["1 Kg"],
    "storage": "Store in a cool and dry place.\nProtect from direct sunlight.",
    "shelfLife": "24 months under recommended storage conditions.",
    "compatibility": "Compatible with most bio-inputs.\nAvoid direct mixing with chemical fungicides.",
    "images": [
      "client-assets/products/biopesticides/tricho-h.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "Bio Fungicide",
      "technology": "Wettable Powder (WP) Formulation",
      "certifications": [],
      "usp": ["Biological Fungicide","Soil Born Disease Control","No Chemical Residues","Improves Soil Microbial Flora"],
      "seo": {
        "title": "Trichoderma harzianum Bio Fungicide | Synergy Crop Solutions",
        "description": "Tricho-H is a biological fungicide based on Trichoderma harzianum for effective management of soil borne fungal diseases while improving root health and crop vigour.",
        "keywords": [
          "Trichoderma harzianum",
          "bio fungicide",
          "bio pesticide",
          "soil borne disease",
          "root health",
          "fungal pathogen suppression",
          "synergy crop solutions"
        ]
      },
      "faqs": [
        {
          "question": "What is Tricho-H and how does it work?",
          "answer": "Tricho-H is a biological fungicide based on Trichoderma harzianum 1.0% WP. The viable spores colonize the root zone and suppress plant pathogenic fungi through competition, mycoparasitism and production of antifungal metabolites."
        },
        {
          "question": "Which diseases does Tricho-H control?",
          "answer": "Tricho-H is effective against damping off, root rot, collar rot, Fusarium wilt, Rhizoctonia, Pythium and Sclerotium."
        },
        {
          "question": "Which crops is Tricho-H suitable for?",
          "answer": "Tricho-H is suitable for cotton, sugarcane, vegetables, fruit crops, pulses, oilseeds and plantation crops."
        },
        {
          "question": "Can Tricho-H be mixed with chemical fungicides?",
          "answer": "Tricho-H is compatible with most bio-inputs. Avoid direct mixing with chemical fungicides as they may harm the viable fungal spores."
        }
      ]
    }
  },
  {
    "name": "Verti-C",
    "slug": "verti-c",
    "category": "biopesticides",
    "productType": "Verticillium chlamydosporium 1.0% WP",
    "scientificName": "Verticillium chlamydosporium",
    "composition": "Verticillium chlamydosporium 1.0% WP (Pochonia chlamydosporia) (CFU Count: 2x10⁹/gm minimum)",
    "shortDescription": "Verti-C is a biological nematicide based on Verticillium chlamydosporium for effective management of plant parasitic nematodes while promoting healthy root development.",
    "longDescription": "Verti-C contains viable spores of Verticillium chlamydosporium that naturally parasitize nematode eggs and reduce nematode populations in the rhizosphere. Regular application improves root health, enhances nutrient uptake and supports sustainable crop production through biological nematode management.",
    "benefits": [
      "Controls plant parasitic nematodes.",
      "Reduces nematode egg population.",
      "Improves root health.",
      "Improves nutrient uptake.",
      "Better root development.",
      "Better crop vigour.",
      "Sustainable biological nematode management."
    ],
    "dosage": "2.5 kg per acre through soil application.\nApply near root zone for nematode management.",
    "applicationMethod": "Soil application.\nApply near root zone and incorporate into soil.",
    "targetCrops": [
      "Vegetables",
      "Fruit crops",
      "Cotton",
      "Sugarcane",
      "Banana",
      "Grapes",
      "Pomegranate",
      "Tomato",
      "Chilli"
    ],
    "targetPests": [
      "Root-knot nematodes",
      "Cyst nematodes",
      "Reniform nematodes",
      "Lesion nematodes"
    ],
    "packSize": ["1 Kg"],
    "storage": "Store in a cool and dry place.\nProtect from direct sunlight.",
    "shelfLife": "24 months under recommended storage conditions.",
    "compatibility": "Compatible with most bio-inputs.\nAvoid direct mixing with chemical fungicides.",
    "images": [
      "client-assets/products/biopesticides/verti-c.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "Bio Nematicide",
      "technology": "Wettable Powder (WP) Formulation",
      "certifications": [],
      "usp": ["Biological Nematicide","Nematode Management","No Chemical Residues","Safe for Beneficial Organisms"],
      "seo": {
        "title": "Verticillium chlamydosporium Bio Nematicide | Synergy Crop Solutions",
        "description": "Verti-C is a biological nematicide based on Verticillium chlamydosporium for effective management of plant parasitic nematodes while promoting healthy root development.",
        "keywords": [
          "Verticillium chlamydosporium",
          "bio nematicide",
          "bio pesticide",
          "nematode control",
          "root health",
          "plant parasitic nematodes",
          "synergy crop solutions"
        ]
      },
      "faqs": [
        {
          "question": "What is Verti-C and how does it work?",
          "answer": "Verti-C is a biological nematicide based on Verticillium chlamydosporium 1.0% WP. The viable spores naturally parasitize nematode eggs and reduce nematode populations in the rhizosphere, improving root health and nutrient uptake."
        },
        {
          "question": "Which nematodes does Verti-C control?",
          "answer": "Verti-C is effective against root-knot nematodes, cyst nematodes, reniform nematodes and lesion nematodes."
        },
        {
          "question": "Which crops is Verti-C suitable for?",
          "answer": "Verti-C is suitable for vegetables, fruit crops, cotton, sugarcane, banana, grapes, pomegranate, tomato and chilli."
        },
        {
          "question": "Can Verti-C be mixed with chemical fungicides?",
          "answer": "Verti-C is compatible with most bio-inputs. Avoid direct mixing with chemical fungicides as they may harm the viable fungal spores."
        }
      ]
    }
  },
  {
    "name": "Fusion",
    "slug": "fusion",
    "category": "biofertilizers",
    "productType": "Carrier Based Consortium Biofertilizer",
    "scientificName": "Consortium of Gluconacetobacter diazotrophicus, Phosphate Solubilizing Bacteria and Potash Mobilizing Bacteria.",
    "composition": "• Gluconacetobacter diazotrophicus\n• Phosphate Solubilizing Bacteria (PSB)\n• Potash Mobilizing Bacteria (KMB)",
    "shortDescription": "Fusion is a speciality carrier based consortium biofertilizer containing Gluconacetobacter diazotrophicus, phosphate solubilizing bacteria (PSB) and potash mobilizing bacteria (KMB) for improving nutrient availability, crop growth and yield.",
    "longDescription": "Fusion is a multi-strain consortium biofertilizer developed to improve nitrogen fixation, phosphorus solubilization and potassium mobilization in agricultural soils. The product enhances nutrient uptake, strengthens root development, promotes vigorous vegetative growth and supports higher yield while reducing dependence on chemical fertilizers.",
    "benefits": [
      "Fixes atmospheric nitrogen.",
      "Improves phosphorus availability.",
      "Mobilizes potassium.",
      "Improves root development.",
      "Produces Auxins (IAA).",
      "Encourages tillering.",
      "Improves cane thickness.",
      "Improves crop vigour.",
      "Enhances nutrient uptake.",
      "Improves crop shine.",
      "Increases yield.",
      "Helps reduce chemical fertilizer requirement by approximately 30–40%."
    ],
    "dosage": "4 kg per acre.\nRecommended during basal dose and major earthing-up as indicated in the brochure.",
    "applicationMethod": "Soil application.\nBroadcast uniformly or apply through field incorporation.",
    "targetCrops": [
      "Sugarcane",
      "Cotton",
      "Rice",
      "Wheat",
      "Maize",
      "Soybean",
      "Groundnut",
      "Pulses",
      "Vegetables",
      "Banana",
      "Grapes",
      "Pomegranate",
      "Citrus"
    ],
    "packSize": [
      "4 kg"
    ],
    "storage": "Store in a cool and dry place.\nProtect from direct sunlight.\nKeep bag tightly sealed.",
    "shelfLife": "24 months under recommended storage conditions.",
    "compatibility": "Compatible with organic manures and biofertilizers.\nAvoid mixing directly with chemical bactericides or fungicides.",
    "images": [
      "client-assets/products/consortia/fusion.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "Speciality Consortium Biofertilizer",
      "technology": "Multi-Strain Carrier Based Technology",
      "certifications": [],
      "usp": [
        "Carrier Based Consortium Technology",
        "Triple Nutrient Mobilization",
        "Improves Sugarcane Productivity",
        "Reduces Chemical Fertilizer Requirement"
      ],
      "seo": {
        "title": "Fusion Consortium Biofertilizer | Synergy Crop Solutions",
        "description": "Speciality carrier based consortium biofertilizer with Gluconacetobacter diazotrophicus, PSB and KMB for nitrogen fixation, phosphorus solubilization and potassium mobilization.",
        "keywords": [
          "consortium biofertilizer",
          "fusion",
          "nitrogen fixing",
          "phosphate solubilizing",
          "potash mobilizing",
          "Gluconacetobacter diazotrophicus",
          "sugarcane biofertilizer",
          "synergy crop solutions"
        ]
      },
      "faqs": [
        {
          "question": "What is Fusion and what makes it different?",
          "answer": "Fusion is a speciality carrier based consortium biofertilizer containing three beneficial microorganisms: Gluconacetobacter diazotrophicus (nitrogen fixer), Phosphate Solubilizing Bacteria (PSB) and Potash Mobilizing Bacteria (KMB). It provides triple nutrient mobilization — nitrogen, phosphorus and potassium — in a single formulation."
        },
        {
          "question": "How should Fusion be applied?",
          "answer": "Apply 4 kg per acre through soil application. Broadcast uniformly or apply through field incorporation during basal dose and major earthing-up. It can also be applied through drip irrigation by dissolving 4 kg in water overnight."
        },
        {
          "question": "Which crops benefit from Fusion?",
          "answer": "Fusion is suitable for sugarcane, cotton, rice, wheat, maize, soybean, groundnut, pulses, vegetables, banana, grapes, pomegranate and citrus."
        },
        {
          "question": "Can Fusion reduce chemical fertilizer use?",
          "answer": "Yes. Fusion helps reduce chemical fertilizer requirement by approximately 30–40% by improving nitrogen fixation, phosphorus solubilization and potassium mobilization through biological activity."
        }
      ]
    }
  },
  {
    "name": "Life",
    "slug": "life",
    "category": "consortia",
    "productType": "Phyllospheric Microbe Consortium Biofertilizer",
    "scientificName": "Consortium of Phyllospheric Microbes",
    "composition": "Consortium of Phyllospheric Microbes.\nLyophilized carrier based formulation.",
    "shortDescription": "Life is a Japanese lyophilized consortium of phyllospheric and rhizospheric microorganisms that promotes comprehensive plant growth through nutrient mobilization and pathogen suppression.",
    "longDescription": "Life is a Japanese lyophilized carrier based consortium containing a synergistic blend of phyllospheric and rhizospheric microorganisms that colonize the plant surface and root zone to promote comprehensive plant growth and protection. The microbial consortium produces plant growth promoting substances including auxins, gibberellins and cytokinins, enhances nutrient availability through phosphate solubilization and nitrogen fixation, and suppresses harmful pathogens through competitive exclusion and antimicrobial metabolite production. Regular application improves plant vigour, enhances stress tolerance and supports sustainable crop production.",
    "benefits": [
      "Synergistic blend of beneficial microorganisms.",
      "Colonizes phyllosphere and rhizosphere.",
      "Produces plant growth promoting substances.",
      "Enhances nutrient availability in soil.",
      "Suppresses harmful pathogens naturally.",
      "Improves plant vigour and growth.",
      "Enhances stress tolerance in crops.",
      "Promotes sustainable crop production.",
      "Compatible with integrated nutrient management.",
      "Supports overall crop health and productivity."
    ],
    "dosage": "4 kg per acre.\nApply during basal dose through soil application.",
    "applicationMethod": "Soil application.\nBroadcast uniformly and incorporate into soil.",
    "targetCrops": [
      "Sugarcane",
      "Cotton",
      "Rice",
      "Wheat",
      "Maize",
      "Soybean",
      "Groundnut",
      "Pulses",
      "Vegetables",
      "Fruit crops",
      "Banana",
      "Grapes",
      "Pomegranate",
      "Citrus"
    ],
    "packSize": ["4 Kg"],
    "storage": "Store in a cool and dry place.\nProtect from direct sunlight.",
    "shelfLife": "24 months under recommended storage conditions.",
    "compatibility": "Compatible with biofertilizers and biopesticides.\nAvoid direct mixing with chemical inputs.",
    "images": [
      "client-assets/products/consortia/life.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "Consortium Biofertilizer",
      "technology": "Japanese Lyophilization Technology",
      "certifications": [],
      "usp": ["Phyllospheric Microbe Technology","Japanese Lyophilization","Improves Nutrient Cycling","Enhances Crop Vigour"],
      "seo": {
        "title": "Life Consortium Biofertilizer | Synergy Crop Solutions",
        "description": "Lyophilized Carrier Based Consortia - Consortium of Phyllospheric Microbes",
        "keywords": [
          "life",
          "consortium",
          "synergy crop solutions"
        ]
      },
      "faqs": [
        {
          "question": "What is Life and how does it work?",
          "answer": "Lyophilized Carrier Based Consortia - Consortium of Phyllospheric Microbes"
        },
        {
          "question": "Which crops benefit from Life?",
          "answer": "Life is suitable for Sugarcane, Cotton, Rice, Wheat, Maize, Soybean, Groundnut, Pulses, Vegetables, Fruit crops, Banana, Grapes, Pomegranate and Citrus."
        },
        {
          "question": "Can Life be mixed with other inputs?",
          "answer": "Compatible with biofertilizers and biopesticides."
        },
        {
          "question": "How should Life be stored?",
          "answer": "Store in a cool and dry place away from direct sunlight. Shelf life is 24 months under recommended storage conditions."
        }
      ]
    }
  },
  {
    "name": "Plant Bliss",
    "slug": "plant-bliss",
    "category": "biofertilizers",
    "productType": "Japanese Lyophilized Consortium Biofertilizer",
    "scientificName": "Multi-strain Consortium Biofertilizer",
    "composition": "• Azotobacter\n• Azospirillum\n• Bacillus megaterium\n• Bacillus polymyxa\n• Frateuria aurantia\n• Bacillus amyloliquefaciens\n• Thiobacillus thiooxidans\n• Thiobacillus ferrooxidans\n• Pseudomonas spp.\n• Endomycorrhiza (VAM)",
    "shortDescription": "Plant Bliss is a premium Japanese lyophilized consortium biofertilizer containing multiple beneficial microorganisms that improve nutrient availability, stimulate root development and promote vigorous crop growth while reducing dependence on chemical fertilizers.",
    "longDescription": "Plant Bliss is an advanced multi-strain consortium biofertilizer developed using Japanese Lyophilization Technology. It combines nitrogen fixing, phosphate solubilizing, potash mobilizing and micronutrient mobilizing microorganisms into one formulation. The product improves soil biological activity, enhances nutrient uptake, promotes healthy root development and supports higher crop productivity across a wide range of agricultural and horticultural crops.",
    "benefits": [
      "Improves nitrogen fixation.",
      "Solubilizes phosphorus.",
      "Mobilizes potassium.",
      "Improves Zinc availability.",
      "Improves Iron availability.",
      "Improves Sulphur availability.",
      "Improves Silicon availability.",
      "Promotes vigorous root development.",
      "Enhances vegetative growth.",
      "Improves tillering.",
      "Encourages flowering.",
      "Improves fruit setting.",
      "Enhances crop shine and quality.",
      "Improves nutrient uptake.",
      "Improves soil microbial activity.",
      "Produces Auxins and Cytokinins.",
      "Produces beneficial organic acids.",
      "Helps reduce chemical fertilizer requirement by approximately 30–40%.",
      "Suitable for integrated nutrient management."
    ],
    "dosage": "500 gm per acre.\nMix with 10 litres of water.\nAdd any ONE:\n• 500 gm organic jaggery\nOR\n• 100 ml milk\nOR\n• 500 ml buttermilk.\nKeep for 4 hours or overnight before application.",
    "applicationMethod": "Suitable for:\n• Soil application\n• Drip irrigation\n• Drenching",
    "targetCrops": [
      "Sugarcane",
      "Cotton",
      "Soybean",
      "Maize",
      "Wheat",
      "Rice",
      "Pulses",
      "Groundnut",
      "Vegetables",
      "Fruits",
      "Banana",
      "Pomegranate",
      "Grapes",
      "Citrus",
      "Tomato",
      "Chilli",
      "Onion",
      "Turmeric",
      "Ginger"
    ],
    "packSize": [
      "500 gm"
    ],
    "storage": "Store in a cool and dry place away from direct sunlight.\nKeep container tightly closed.\nAvoid excessive heat and moisture.",
    "shelfLife": "24 months from the date of manufacture under recommended storage conditions.",
    "compatibility": "Compatible with most biofertilizers and organic inputs.\nAvoid mixing directly with chemical bactericides or fungicides.",
    "images": [
      "client-assets/products/consortia/plant-bliss.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "Consortium Biofertilizer",
      "technology": "Japanese Lyophilization Technology",
      "certifications": [],
      "seo": {
        "title": "Plant Bliss Consortium Biofertilizer | Synergy Crop Solutions",
        "description": "Plant Bliss is a premium Japanese lyophilized consortium biofertilizer with 10 beneficial microorganisms for improved nutrient availability, root development and vigorous crop growth.",
        "keywords": [
          "biofertilizer",
          "consortium biofertilizer",
          "plant bliss",
          "japanese lyophilization",
          "nitrogen fixing",
          "phosphate solubilizing",
          "potash mobilizing",
          "root development",
          "crop growth",
          "synergy crop solutions"
        ]
      },
      "faqs": [
        {
          "question": "What is Plant Bliss and how does it work?",
          "answer": "Plant Bliss is a Japanese lyophilized consortium biofertilizer containing 10 beneficial microorganisms including Azotobacter, Azospirillum, Bacillus megaterium, Bacillus polymyxa, Frateuria aurantia, Bacillus amyloliquefaciens, Thiobacillus thiooxidans, Thiobacillus ferrooxidans, Pseudomonas spp. and Endomycorrhiza (VAM). It improves nitrogen fixation, phosphorus solubilization, potassium mobilization and micronutrient availability in the soil, promoting healthy root development and vigorous crop growth."
        },
        {
          "question": "How should Plant Bliss be applied?",
          "answer": "Mix 500 gm of Plant Bliss per acre with 10 litres of water. Add 500 gm organic jaggery, or 100 ml milk, or 500 ml buttermilk. Keep the solution for 4 hours or overnight before application. It is suitable for soil application, drip irrigation and drenching."
        },
        {
          "question": "Can Plant Bliss reduce the use of chemical fertilizers?",
          "answer": "Yes. Plant Bliss helps reduce chemical fertilizer requirement by approximately 30–40% by improving nutrient availability through biological activity. It is suitable for integrated nutrient management programs."
        },
        {
          "question": "Which crops can benefit from Plant Bliss?",
          "answer": "Plant Bliss is suitable for a wide range of crops including sugarcane, cotton, soybean, maize, wheat, rice, pulses, groundnut, vegetables, fruits, banana, pomegranate, grapes, citrus, tomato, chilli, onion, turmeric and ginger."
        }
      ]
    }
  },
  {
    "name": "Plant Cure",
    "slug": "plant-cure",
    "category": "consortia",
    "productType": "Phyllospheric Microbe Consortium Biofertilizer",
    "scientificName": "Consortium of Phyllospheric Microbes",
    "composition": "Consortium of Phyllospheric Microbes.\nLyophilized carrier based formulation.",
    "shortDescription": "Plant Cure is a Japanese lyophilized consortium of Trichoderma viride and Pseudomonas fluorescens that provides dual-action disease protection and promotes healthy plant growth.",
    "longDescription": "Plant Cure is a Japanese lyophilized consortium of Trichoderma viride and Pseudomonas fluorescens, two powerful biocontrol agents that work in synergy to suppress plant diseases and promote healthy growth. Trichoderma viride parasitizes fungal pathogens through mycoparasitism, while Pseudomonas fluorescens produces antimicrobial compounds and induces systemic resistance in plants. This dual-action consortium provides comprehensive disease protection in the root zone and on the plant surface. Regular application reduces disease incidence, improves root health and supports sustainable crop production without chemical fungicides.",
    "benefits": [
      "Dual-action consortium for disease suppression.",
      "Combines mycoparasitic and antimicrobial activity.",
      "Induces systemic resistance in plants.",
      "Suppresses soil and foliar diseases.",
      "Improves root health and development.",
      "Enhances plant growth and vigour.",
      "Reduces dependence on chemical fungicides.",
      "Colonizes root zone and phyllosphere.",
      "Supports sustainable disease management.",
      "Safe for beneficial organisms and environment."
    ],
    "dosage": "4 kg per acre.\nApply during basal dose through soil application.",
    "applicationMethod": "Soil application.\nBroadcast uniformly and incorporate into soil.",
    "targetCrops": [
      "Cotton",
      "Sugarcane",
      "Vegetables",
      "Fruit crops",
      "Pulses",
      "Oilseeds",
      "Cereals",
      "Plantation crops"
    ],
    "packSize": ["4 Kg"],
    "storage": "Store in a cool and dry place.\nProtect from direct sunlight.",
    "shelfLife": "24 months under recommended storage conditions.",
    "compatibility": "Compatible with biofertilizers and biopesticides.\nAvoid direct mixing with chemical inputs.",
    "images": [
      "client-assets/products/consortia/plant-cure.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "Consortium Biofertilizer",
      "technology": "Japanese Lyophilization Technology",
      "certifications": [],
      "usp": ["Phyllospheric Microbe Technology","Japanese Lyophilization","Improves Plant Health","Enhances Disease Resistance"],
      "seo": {
        "title": "Plant Cure Trichoderma Pseudomonas Consortium | Synergy Crop Solutions",
        "description": "Lyophilized Carrier Based Consortia - Consortium Phyllospheric Microbes",
        "keywords": [
          "plant cure",
          "consortium",
          "synergy crop solutions"
        ]
      },
      "faqs": [
        {
          "question": "What is Plant Cure and how does it work?",
          "answer": "Lyophilized Carrier Based Consortia - Consortium Phyllospheric Microbes"
        },
        {
          "question": "Which crops benefit from Plant Cure?",
          "answer": "Plant Cure is suitable for Cotton, Sugarcane, Vegetables, Fruit crops, Pulses, Oilseeds, Cereals and Plantation crops."
        },
        {
          "question": "Can Plant Cure be mixed with other inputs?",
          "answer": "Compatible with biofertilizers and biopesticides."
        },
        {
          "question": "How should Plant Cure be stored?",
          "answer": "Store in a cool and dry place away from direct sunlight. Shelf life is 24 months under recommended storage conditions."
        }
      ]
    }
  },
  {
    "name": "Plant Cure+",
    "slug": "plant-cure-plus",
    "category": "biopesticides",
    "productType": "Bacillus thuringiensis Bioinsecticide",
    "scientificName": "",
    "composition": "Marine Isolated Bacillus thuringiensis (B.T.)",
    "shortDescription": "Japanese lyophilization technology based consortium bioinsecticide containing marine isolated Bacillus thuringiensis (B.T.) for effective control of caterpillar pests.",
    "longDescription": "Plant Cure+ is a Japanese lyophilized Bacillus thuringiensis (B.T.) consortium bioinsecticide formulated with marine isolated B.T. for effective biological control of lepidopteran caterpillar pests. The product produces Cry protein (Cry endotoxin) that specifically targets the gut of caterpillar pests, causing feeding cessation and death within 24–48 hours. Being a biological insecticide, it is safe for natural enemies, beneficial insects and the environment. Regular application effectively manages fruit borer, shoot borer, pod borer, stem borer, leaf eating caterpillars, tobacco caterpillar and armyworm across a wide range of crops.",
    "benefits": [
      "Marine isolated Bacillus thuringiensis (B.T.).",
      "Effective against Lepidoptera group insects.",
      "Produces Cry protein (Cry endotoxin).",
      "Controls caterpillars by biological action.",
      "Effective against:",
      "Fruit borer",
      "Shoot borer",
      "Pod borer",
      "Stem borer",
      "Leaf eating caterpillars",
      "Tobacco caterpillar",
      "Armyworm"
    ],
    "dosage": "Plant Cure+ : 500 gm/acre\nMix with:\n• Water : 10 litres\n• Organic jaggery : 500 gm\nOR\n• Milk : 100 ml\nOR\n• Buttermilk : 500 ml\nKeep the solution for 4 hours or overnight before spraying.",
    "applicationMethod": "Foliar spray after fermentation for 4 hours or overnight.",
    "targetCrops": [
      "Cotton",
      "Vegetables",
      "Fruit crops",
      "Sugarcane",
      "Rice",
      "Maize"
    ],
    "packSize": [],
    "storage": "Store in a cool and dry place.\nProtect from direct sunlight.",
    "shelfLife": "24 months under recommended storage conditions.",
    "compatibility": "Compatible with most bio-inputs.\nAvoid direct mixing with chemical fungicides.",
    "images": [
      "client-assets/products/consortia/plant-cure-plus.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "Consortium Bioinsecticide",
      "technology": "Japanese Lyophilization Technology",
      "certifications": [],
      "seo": {
        "title": "Plant Cure+ Bio Insecticide | Synergy Crop Solutions",
        "description": "Japanese lyophilized Bacillus thuringiensis (B.T.) consortium bioinsecticide for biological control of caterpillar pests.",
        "keywords": [
          "Bacillus thuringiensis",
          "bio insecticide",
          "bio pesticide",
          "caterpillar control",
          "B.T.",
          "bioinsecticide",
          "synergy crop solutions"
        ]
      },
      "faqs": [
        {
          "question": "What is Plant Cure+ and how does it work?",
          "answer": "Plant Cure+ is a Japanese lyophilized Bacillus thuringiensis (B.T.) consortium bioinsecticide. It produces Cry protein (Cry endotoxin) that is effective against Lepidoptera group insects including caterpillars."
        },
        {
          "question": "Which pests does Plant Cure+ control?",
          "answer": "Plant Cure+ is effective against fruit borer, shoot borer, pod borer, stem borer, leaf eating caterpillars, tobacco caterpillar and armyworm."
        },
        {
          "question": "Which crops is Plant Cure+ suitable for?",
          "answer": "Plant Cure+ is suitable for cotton, vegetables, fruit crops, sugarcane, rice and maize."
        },
        {
          "question": "How should Plant Cure+ be stored?",
          "answer": "Store in a cool and dry place, protected from direct sunlight. Shelf life is 24 months under recommended storage conditions."
        }
      ]
    }
  },
  {
    "name": "Root Cure",
    "slug": "root-cure",
    "category": "consortia",
    "productType": "Lyophilized Consortium Biofertilizer",
    "scientificName": "",
    "composition": "",
    "shortDescription": "Root Cure is a Japanese Lyophilized consortium biofertilizer developed for healthy root development, improved nutrient uptake and vigorous plant growth through beneficial microorganisms.",
    "longDescription": "Root Cure is a Japanese lyophilized consortium biofertilizer specifically formulated to promote healthy root development, improve nutrient uptake and stimulate vigorous plant growth. The beneficial microorganisms in Root Cure colonize the rhizosphere, produce plant growth promoting substances including auxins and cytokinins, enhance nutrient availability through solubilization and mobilization, and improve soil microbial activity. Stronger root systems enable plants to access more water and nutrients, resulting in better establishment, improved stress tolerance and higher crop yields.",
    "benefits": [
      "Promotes healthy and vigorous root development.",
      "Improves nutrient and water uptake efficiency.",
      "Produces auxins and cytokinins for root growth.",
      "Colonizes the rhizosphere effectively.",
      "Enhances soil microbial activity.",
      "Improves nutrient availability in soil.",
      "Strengthens crop establishment.",
      "Increases tolerance to environmental stress.",
      "Supports higher crop yields.",
      "Compatible with sustainable farming practices."
    ],
    "dosage": "",
    "applicationMethod": "",
    "targetCrops": [
      "Sugarcane",
      "Cotton",
      "Rice",
      "Wheat",
      "Maize",
      "Vegetables",
      "Fruit crops",
      "Banana",
      "Grapes",
      "Pomegranate",
      "Citrus",
      "Onion",
      "Tomato",
      "Chilli"
    ],
    "packSize": [],
    "storage": "Store in a cool and dry place.\nProtect from direct sunlight.",
    "shelfLife": "24 months under recommended storage conditions.",
    "compatibility": "Compatible with biofertilizers and biopesticides.\nAvoid direct mixing with chemical inputs.",
    "images": [
      "client-assets/products/consortia/root-cure.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "Consortium Biofertilizer",
      "technology": "Japanese Lyophilization Technology",
      "certifications": [],
      "seo": {
        "title": "Root Cure Biofertilizer | Synergy Crop Solutions",
        "description": "Root Cure is a Japanese Lyophilized consortium biofertilizer developed for healthy root development, improved nutrient uptake and vigorous plant growth through beneficial microorganisms.",
        "keywords": [
          "root cure biofertilizer",
          "root development",
          "consortium biofertilizer",
          "rhizosphere colonization",
          "nutrient uptake",
          "plant growth promotion",
          "synergy crop solutions"
        ]
      },
      "faqs": [
        {
          "question": "What is Root Cure and how does it work?",
          "answer": "Root Cure is a Japanese Lyophilized consortium biofertilizer developed for healthy root development, improved nutrient uptake and vigorous plant growth through beneficial microorganisms."
        },
        {
          "question": "Which crops benefit from Root Cure?",
          "answer": "Root Cure is suitable for Sugarcane, Cotton, Rice, Wheat, Maize, Vegetables, Fruit crops, Banana, Grapes, Pomegranate, Citrus, Onion, Tomato and Chilli."
        },
        {
          "question": "Can Root Cure be mixed with other inputs?",
          "answer": "Compatible with biofertilizers and biopesticides."
        },
        {
          "question": "How should Root Cure be stored?",
          "answer": "Store in a cool and dry place away from direct sunlight. Shelf life is 24 months under recommended storage conditions."
        }
      ]
    }
  },
  {
    "name": "Root Cure Plus",
    "slug": "root-cure-plus",
    "category": "consortia",
    "productType": "Soil Detoxification Consortium Biofertilizer",
    "scientificName": "Consortium of Soil Detoxification Microbes",
    "composition": "Consortium Microbials for Soil Detoxification.\nLyophilized carrier based formulation.",
    "shortDescription": "Root Cure Plus is a Japanese lyophilized consortium of beneficial microorganisms developed for soil detoxification, residue degradation and restoration of soil health.",
    "longDescription": "Root Cure Plus is a Japanese lyophilized carrier based consortium of beneficial microorganisms specially developed for soil detoxification and restoration of soil health. The microbial consortium degrades harmful chemical residues, breaks down accumulated salts and toxins, improves soil structure and reactivates beneficial soil biological activity. Regular application helps rejuvenate tired and degraded soils, improves root zone environment, enhances nutrient availability and supports healthier crop growth in soils affected by continuous cultivation and chemical overuse.",
    "benefits": [
      "Detoxifies chemical residues in soil.",
      "Degrades accumulated salts and toxins.",
      "Improves soil structure and porosity.",
      "Reactivates beneficial soil microbial activity.",
      "Restores soil health and fertility.",
      "Improves root zone environment.",
      "Enhances nutrient availability in degraded soils.",
      "Supports healthier crop growth.",
      "Reduces the impact of continuous cultivation.",
      "Promotes sustainable soil management."
    ],
    "dosage": "4 kg per acre.\nApply during basal dose through soil application.",
    "applicationMethod": "Soil application.\nBroadcast uniformly and incorporate into soil.",
    "targetCrops": [
      "Sugarcane",
      "Cotton",
      "Rice",
      "Wheat",
      "Maize",
      "Vegetables",
      "Fruit crops",
      "Banana",
      "Grapes",
      "Pomegranate",
      "Citrus",
      "Potato",
      "Tomato"
    ],
    "packSize": ["4 Kg"],
    "storage": "Store in a cool and dry place.\nProtect from direct sunlight.",
    "shelfLife": "24 months under recommended storage conditions.",
    "compatibility": "Compatible with biofertilizers and biopesticides.\nAvoid direct mixing with chemical inputs.",
    "images": [
      "client-assets/products/consortia/root-cure-plus.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "Consortium Biofertilizer",
      "technology": "Japanese Lyophilization Technology",
      "certifications": [],
      "usp": ["Soil Detoxification Technology","Japanese Lyophilization","Restores Soil Health","Improves Microbial Diversity"],
      "seo": {
        "title": "Root Cure Plus Soil Detoxification Consortium | Synergy Crop Solutions",
        "description": "Lyophilized Carrier Based Consortia - Consortium Microbials for Soil Detoxification",
        "keywords": [
          "root cure plus",
          "consortium",
          "synergy crop solutions"
        ]
      },
      "faqs": [
        {
          "question": "What is Root Cure Plus and how does it work?",
          "answer": "Lyophilized Carrier Based Consortia - Consortium Microbials for Soil Detoxification"
        },
        {
          "question": "Which crops benefit from Root Cure Plus?",
          "answer": "Root Cure Plus is suitable for Sugarcane, Cotton, Rice, Wheat, Maize, Vegetables, Fruit crops, Banana, Grapes, Pomegranate, Citrus, Potato and Tomato."
        },
        {
          "question": "Can Root Cure Plus be mixed with other inputs?",
          "answer": "Compatible with biofertilizers and biopesticides."
        },
        {
          "question": "How should Root Cure Plus be stored?",
          "answer": "Store in a cool and dry place away from direct sunlight. Shelf life is 24 months under recommended storage conditions."
        }
      ]
    }
  },
  {
    "name": "Zeal",
    "slug": "zeal",
    "category": "consortia",
    "productType": "Lyophilized Carrier Based Consortium Biofertilizer",
    "scientificName": "Lyophilized Carrier Based Consortium",
    "composition": "Lyophilized Carrier Based Consortium.\nBeneficial microbial formulation.",
    "shortDescription": "Zeal is a Japanese lyophilized consortium that combines biofertilizer microorganisms with phytohormone producing microbes for enhanced plant growth stimulation and higher crop yields.",
    "longDescription": "Zeal is a Japanese lyophilized carrier based consortium that uniquely combines biofertilizer microorganisms with phytohormone producing microbes for enhanced plant growth stimulation and higher crop yields. The microbial consortium produces natural plant growth regulators including auxins, gibberellins and cytokinins that stimulate cell division, root elongation, shoot growth and flowering. Combined with nutrient mobilizing and fixing microorganisms, Zeal provides comprehensive growth promotion and improved nutrient availability. Regular application results in more vigorous plant growth, better flowering, improved fruit setting and significantly higher yields across a wide range of crops.",
    "benefits": [
      "Produces natural auxins, gibberellins and cytokinins.",
      "Stimulates cell division and root elongation.",
      "Promotes shoot growth and canopy development.",
      "Enhances flowering and fruit setting.",
      "Improves nutrient availability through microbial activity.",
      "Fixes atmospheric nitrogen biologically.",
      "Solubilizes phosphorus and mobilizes potassium.",
      "Increases crop yield and quality.",
      "Supports comprehensive plant growth promotion.",
      "Compatible with integrated crop management."
    ],
    "dosage": "4 kg per acre.\nApply during basal dose through soil application.",
    "applicationMethod": "Soil application.\nBroadcast uniformly and incorporate into soil.",
    "targetCrops": [
      "Sugarcane",
      "Cotton",
      "Rice",
      "Wheat",
      "Maize",
      "Soybean",
      "Groundnut",
      "Pulses",
      "Vegetables",
      "Fruit crops",
      "Banana",
      "Grapes",
      "Pomegranate",
      "Citrus",
      "Tomato",
      "Chilli"
    ],
    "packSize": ["4 Kg"],
    "storage": "Store in a cool and dry place.\nProtect from direct sunlight.",
    "shelfLife": "24 months under recommended storage conditions.",
    "compatibility": "Compatible with biofertilizers and biopesticides.\nAvoid direct mixing with chemical inputs.",
    "images": [
      "client-assets/products/consortia/zeal.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "Consortium Biofertilizer",
      "technology": "Japanese Lyophilization Technology",
      "certifications": [],
      "usp": ["Consortium Technology","Japanese Lyophilization","Multi-Strain Formulation","Improves Overall Crop Health"],
      "seo": {
        "title": "Zeal Phytohormone Biofertilizer Consortium | Synergy Crop Solutions",
        "description": "Lyophilized Carrier Based Consortia",
        "keywords": [
          "zeal",
          "consortium",
          "synergy crop solutions"
        ]
      },
      "faqs": [
        {
          "question": "What is Zeal and how does it work?",
          "answer": "Lyophilized Carrier Based Consortia"
        },
        {
          "question": "Which crops benefit from Zeal?",
          "answer": "Zeal is suitable for Sugarcane, Cotton, Rice, Wheat, Maize, Soybean, Groundnut, Pulses, Vegetables, Fruit crops, Banana, Grapes, Pomegranate, Citrus, Tomato and Chilli."
        },
        {
          "question": "Can Zeal be mixed with other inputs?",
          "answer": "Compatible with biofertilizers and biopesticides."
        },
        {
          "question": "How should Zeal be stored?",
          "answer": "Store in a cool and dry place away from direct sunlight. Shelf life is 24 months under recommended storage conditions."
        }
      ]
    }
  },
  {
    "name": "AgriBest Plus",
    "slug": "agri-best-plus",
    "category": "liquid-nutrition",
    "productType": "Premium Liquid Plant Nutrition",
    "scientificName": "",
    "composition": "Premium imported liquid plant nutrition formulation.\nConcentrated liquid nutrition.",
    "shortDescription": "AgriBest Plus is a premium imported liquid plant nutrition formulation developed for improving plant metabolism, crop growth, flowering, fruit development and overall productivity.",
    "longDescription": "AgriBest Plus is an advanced imported liquid nutrient formulation supplying essential nutrients required throughout crop development. The formulation promotes vigorous growth, improves flowering, enhances fruit quality and supports higher marketable yield under intensive cultivation.",
    "benefits": [
      "Supplies essential nutrients throughout crop development.",
      "Promotes vigorous plant growth.",
      "Improves flowering and fruit retention.",
      "Enhances fruit quality and marketability.",
      "Supports higher marketable yield.",
      "Improves plant metabolism.",
      "Enhances nutrient uptake and utilization.",
      "Promotes uniform crop development.",
      "Supports crops under intensive cultivation.",
      "Improves overall crop productivity."
    ],
    "dosage": "2–3 ml per litre of water.\nFoliar spray at vegetative and reproductive stages.",
    "applicationMethod": "Shake before use",
    "targetCrops": [
      "Grapes",
      "Pomegranate",
      "Banana",
      "Citrus",
      "Mango",
      "Cotton",
      "Sugarcane",
      "Tomato",
      "Chilli",
      "Onion",
      "Potato",
      "Vegetables",
      "Fruit crops"
    ],
    "packSize": ["250 ml","500 ml","1 L"],
    "storage": "Store in a cool and dry place.\nProtect from direct sunlight.",
    "shelfLife": "24 months under recommended storage conditions.",
    "compatibility": "Compatible with most fertilizers and micronutrients.\nPerform a compatibility test before tank mixing.",
    "images": [
      "client-assets/products/liquid-nutrition/agri-best-plus.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "Imported Liquid Nutrition",
      "technology": "Advanced Imported Liquid Nutrition Technology",
      "certifications": [],
      "usp": ["Imported Liquid Nutrition","Improves Plant Metabolism","Quick Absorption","Multi-Nutrient Formulation"],
      "seo": {
        "title": "AgriBest Plus Premium Liquid Plant Nutrition | Synergy Crop Solutions",
        "description": "Premium imported liquid plant nutrition formulation developed for improving plant metabolism, crop growth, flowering, fruit development and overall productivity.",
        "keywords": [
          "imported plant nutrition",
          "liquid fertilizer",
          "agribest plus",
          "crop growth",
          "flowering improvement",
          "fruit development",
          "plant metabolism",
          "synergy crop solutions"
        ]
      },
      "faqs": [
        {
          "question": "What is AgriBest Plus and how does it work?",
          "answer": "AgriBest Plus is a premium imported liquid plant nutrition formulation that supplies essential nutrients required throughout crop development. It promotes vigorous growth, improves flowering, enhances fruit quality and supports higher marketable yield under intensive cultivation."
        },
        {
          "question": "Which crops benefit from AgriBest Plus?",
          "answer": "AgriBest Plus is suitable for grapes, pomegranate, banana, citrus, mango, cotton, sugarcane, tomato, chilli, onion, potato, vegetables and fruit crops."
        },
        {
          "question": "Can AgriBest Plus be mixed with other fertilizers?",
          "answer": "Yes. AgriBest Plus is compatible with most fertilizers and micronutrients. Perform a jar compatibility test before tank mixing."
        },
        {
          "question": "How should AgriBest Plus be stored?",
          "answer": "Store in a cool and dry place away from direct sunlight. Shelf life is 24 months under recommended storage conditions."
        }
      ]
    }
  },
  {
    "name": "Algafert",
    "slug": "algafert",
    "category": "liquid-nutrition",
    "productType": "Premium Seaweed Extract Liquid Biostimulant",
    "scientificName": "",
    "composition": "Concentrated marine seaweed extract (Ascophyllum nodosum).\nLiquid biostimulant formulation.",
    "shortDescription": "Algafert is a premium seaweed extract based liquid biostimulant that promotes vigorous root growth, vegetative development, flowering, fruit setting and improved crop quality.",
    "longDescription": "Algafert is a concentrated marine seaweed extract formulated to improve nutrient uptake, plant metabolism and stress tolerance. The naturally occurring bioactive compounds stimulate healthy root development, enhance vegetative growth, improve flowering and fruit setting while increasing crop productivity and quality.",
    "benefits": [
      "Promotes vigorous root growth.",
      "Enhances vegetative development.",
      "Improves flowering and fruit setting.",
      "Improves crop quality.",
      "Enhances nutrient uptake.",
      "Improves plant metabolism.",
      "Increases stress tolerance.",
      "Stimulates natural plant defence mechanisms.",
      "Improves chlorophyll activity and photosynthesis.",
      "Supports overall crop productivity."
    ],
    "dosage": "2–3 ml per litre of water.\nFoliar spray or drip application.",
    "applicationMethod": "Foliar spray or drip irrigation.\nDilute in water and apply uniformly.",
    "targetCrops": [
      "Vegetables",
      "Fruits",
      "Grapes",
      "Pomegranate",
      "Banana",
      "Citrus",
      "Cotton",
      "Sugarcane",
      "Soybean",
      "Groundnut",
      "Tomato",
      "Chilli",
      "Onion",
      "Potato",
      "Floriculture crops"
    ],
    "packSize": ["250 ml","500 ml","1 L"],
    "storage": "Store in a cool and dry place.\nProtect from direct sunlight.\nKeep container tightly closed after use.",
    "shelfLife": "24 months under recommended storage conditions.",
    "compatibility": "Compatible with most fertilizers and micronutrients.\nPerform a compatibility test before tank mixing.",
    "images": [
      "client-assets/products/liquid-nutrition/algafert.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "Seaweed Extract",
      "technology": "Marine Bio-Stimulant Technology",
      "certifications": [],
      "usp": ["Seaweed Extract Technology","Natural Biostimulant","Improves Root Growth","Enhances Stress Tolerance"],
      "seo": {
        "title": "Algafert Seaweed Extract Biostimulant | Synergy Crop Solutions",
        "description": "Premium seaweed extract based liquid biostimulant for improved root growth, vegetative development, flowering, fruit setting and crop quality.",
        "keywords": [
          "seaweed extract",
          "biostimulant",
          "algafert",
          "root growth",
          "flowering",
          "fruit setting",
          "crop quality",
          "synergy crop solutions"
        ]
      },
      "faqs": [
        {
          "question": "What is Algafert and how does it work?",
          "answer": "Algafert is a premium seaweed extract based liquid biostimulant containing naturally occurring bioactive compounds. It promotes vigorous root growth, vegetative development, flowering and fruit setting while improving nutrient uptake and plant metabolism."
        },
        {
          "question": "Which crops can use Algafert?",
          "answer": "Algafert is suitable for vegetables, fruits, grapes, pomegranate, banana, citrus, cotton, sugarcane, soybean, groundnut, tomato, chilli, onion, potato and floriculture crops."
        },
        {
          "question": "Is Algafert compatible with other fertilizers?",
          "answer": "Yes. Algafert is compatible with most fertilizers and micronutrients. Perform a jar compatibility test before mixing to ensure compatibility."
        },
        {
          "question": "How should Algafert be stored?",
          "answer": "Store in a cool and dry place away from direct sunlight. Keep the container tightly closed after use. Shelf life is 24 months under recommended storage conditions."
        }
      ]
    }
  },
  {
    "name": "Biofat 600",
    "slug": "biofat-600",
    "category": "liquid-nutrition",
    "productType": "Liquid Calcium Nutrient",
    "scientificName": "",
    "composition": "Liquid calcium formulation.\nConcentrated calcium nutrient solution.",
    "shortDescription": "Biofat 600 is a premium liquid calcium formulation developed to improve cell wall strength, fruit firmness, flowering and overall crop quality.",
    "longDescription": "Biofat 600 supplies readily available calcium for improving plant structural strength, reducing physiological disorders, improving fruit firmness and extending shelf life. The formulation supports vigorous plant growth and enhances crop quality under intensive cultivation.",
    "benefits": [
      "Improves cell wall strength.",
      "Enhances fruit firmness.",
      "Reduces physiological disorders.",
      "Extends shelf life of produce.",
      "Supports vigorous plant growth.",
      "Improves flowering and fruit setting.",
      "Enhances crop quality.",
      "Improves structural strength of plants."
    ],
    "dosage": "2–3 ml per litre of water.\nFoliar spray during vegetative and fruit development stages.",
    "applicationMethod": "Foliar spray.\nDilute in water and spray uniformly on foliage.",
    "targetCrops": [
      "Grapes",
      "Pomegranate",
      "Banana",
      "Citrus",
      "Tomato",
      "Chilli",
      "Onion",
      "Potato",
      "Cotton",
      "Sugarcane",
      "Vegetables",
      "Fruit crops"
    ],
    "packSize": ["250 ml","500 ml","1 L"],
    "storage": "Store in a cool and dry place.\nProtect from direct sunlight.",
    "shelfLife": "24 months under recommended storage conditions.",
    "compatibility": "Compatible with most fertilizers.\nAvoid mixing with highly alkaline products without compatibility testing.",
    "images": [
      "client-assets/products/liquid-nutrition/biofat600.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "Calcium Fertilizer",
      "technology": "Advanced Liquid Calcium Technology",
      "certifications": [],
      "usp": ["Advanced Calcium Technology","Improves Fruit Firmness","Reduces Blossom End Rot","Extends Shelf Life"],
      "seo": {
        "title": "Biofat 600 Liquid Calcium Nutrient | Synergy Crop Solutions",
        "description": "Premium liquid calcium formulation for improved cell wall strength, fruit firmness, flowering and overall crop quality.",
        "keywords": [
          "calcium fertilizer",
          "liquid calcium",
          "biofat 600",
          "fruit firmness",
          "cell wall strength",
          "crop quality",
          "synergy crop solutions"
        ]
      },
      "faqs": [
        {
          "question": "What is Biofat 600 and how does it work?",
          "answer": "Biofat 600 is a premium liquid calcium formulation that supplies readily available calcium to plants. Calcium is essential for cell wall strength, root development and reducing physiological disorders. It improves fruit firmness, extends shelf life and enhances overall crop quality."
        },
        {
          "question": "Which crops benefit from Biofat 600?",
          "answer": "Biofat 600 is suitable for grapes, pomegranate, banana, citrus, tomato, chilli, onion, potato, cotton, sugarcane, vegetables and fruit crops."
        },
        {
          "question": "Can Biofat 600 be mixed with other fertilizers?",
          "answer": "Yes. Biofat 600 is compatible with most fertilizers. Avoid mixing with highly alkaline products without performing a compatibility test first."
        },
        {
          "question": "How should Biofat 600 be stored?",
          "answer": "Store in a cool and dry place away from direct sunlight. Shelf life is 24 months under recommended storage conditions."
        }
      ]
    }
  },
  {
    "name": "Boratech MO+",
    "slug": "boratech-mo-plus",
    "category": "liquid-nutrition",
    "productType": "Liquid Boron & Molybdenum Fertilizer",
    "scientificName": "",
    "composition": "Liquid Boron and Molybdenum micronutrient formulation.\nChelated micronutrient solution.",
    "shortDescription": "Boratech MO+ is a premium liquid micronutrient formulation supplying Boron and Molybdenum to improve flowering, pollen viability, fruit setting and nitrogen metabolism.",
    "longDescription": "Boratech MO+ provides highly available Boron and Molybdenum required for reproductive growth, pollen tube development, flower retention, seed formation and efficient nitrogen metabolism. The formulation improves crop quality, fruit development and overall productivity.",
    "benefits": [
      "Supplies Boron for reproductive growth.",
      "Supplies Molybdenum for nitrogen metabolism.",
      "Improves flowering.",
      "Enhances pollen viability.",
      "Improves fruit setting.",
      "Promotes pollen tube development.",
      "Improves nutrient utilization.",
      "Supports uniform fruit development.",
      "Improves crop quality.",
      "Enhances overall productivity."
    ],
    "dosage": "2–3 ml per litre of water.\nFoliar spray at flowering and fruit setting stages.",
    "applicationMethod": "Foliar spray.\nDilute in water and spray uniformly on foliage.",
    "targetCrops": [
      "Vegetables",
      "Fruit crops",
      "Cotton",
      "Soybean",
      "Groundnut",
      "Sugarcane",
      "Chilli",
      "Tomato",
      "Onion",
      "Grapes",
      "Pomegranate",
      "Citrus",
      "Banana"
    ],
    "packSize": ["250 ml","500 ml","1 L"],
    "storage": "Store in a cool and dry place.\nProtect from direct sunlight.",
    "shelfLife": "24 months under recommended storage conditions.",
    "compatibility": "Compatible with most fertilizers and micronutrients.\nAvoid strongly alkaline mixtures.",
    "images": [
      "client-assets/products/liquid-nutrition/boratech-MO+.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "Boron + Molybdenum Micronutrient",
      "technology": "Advanced Chelated Micronutrient Technology",
      "certifications": [],
      "usp": ["Chelated Micronutrient Technology","Improves Flowering","Enhances Fruit Setting","Dual Micronutrient Formulation"],
      "seo": {
        "title": "Boratech MO+ Liquid Boron & Molybdenum Fertilizer | Synergy Crop Solutions",
        "description": "Premium liquid micronutrient formulation supplying Boron and Molybdenum to improve flowering, pollen viability, fruit setting and nitrogen metabolism.",
        "keywords": [
          "boron fertilizer",
          "molybdenum fertilizer",
          "micronutrient liquid",
          "boratech mo+",
          "flowering improvement",
          "fruit setting",
          "pollen viability",
          "nitrogen metabolism",
          "synergy crop solutions"
        ]
      },
      "faqs": [
        {
          "question": "What is Boratech MO+ and what does it do?",
          "answer": "Boratech MO+ is a premium liquid micronutrient formulation supplying Boron and Molybdenum. Boron supports reproductive growth, pollen tube development and flower retention, while Molybdenum is essential for nitrogen metabolism and seed formation. Together they improve flowering, pollen viability, fruit setting and overall crop productivity."
        },
        {
          "question": "Which crops benefit from Boratech MO+?",
          "answer": "Boratech MO+ is suitable for vegetables, fruit crops, cotton, soybean, groundnut, sugarcane, chilli, tomato, onion, grapes, pomegranate, citrus and banana."
        },
        {
          "question": "Can Boratech MO+ be mixed with other fertilizers?",
          "answer": "Yes. Boratech MO+ is compatible with most fertilizers and micronutrients. Avoid strongly alkaline mixtures."
        },
        {
          "question": "How should Boratech MO+ be stored?",
          "answer": "Store in a cool and dry place away from direct sunlight. Shelf life is 24 months under recommended storage conditions."
        }
      ]
    }
  },
  {
    "name": "Lignocomplex + Zn",
    "slug": "lignocomplex-plus-zn",
    "category": "liquid-nutrition",
    "productType": "Lignosulphonate Chelated Zinc Fertilizer",
    "scientificName": "",
    "composition": "Lignosulphonate chelated zinc.\nLiquid chelated zinc formulation.",
    "shortDescription": "Lignocomplex + Zn is a premium lignosulphonate chelated zinc fertilizer developed for correcting zinc deficiency and improving plant growth, flowering and crop productivity.",
    "longDescription": "Lignocomplex + Zn supplies highly available chelated zinc required for enzyme activation, chlorophyll formation, auxin synthesis and efficient crop metabolism. The formulation rapidly corrects zinc deficiency while improving vegetative growth, flowering, fruit quality and overall yield.",
    "benefits": [
      "Rapidly corrects zinc deficiency.",
      "Supplies highly available chelated zinc.",
      "Activates essential plant enzymes.",
      "Promotes chlorophyll formation.",
      "Supports auxin synthesis for growth regulation.",
      "Improves vegetative growth.",
      "Enhances flowering and fruit retention.",
      "Improves fruit quality and size.",
      "Supports efficient crop metabolism.",
      "Improves overall crop yield."
    ],
    "dosage": "2–3 ml per litre of water.\nFoliar spray at vegetative stage.",
    "applicationMethod": "Foliar spray.\nDilute in water and spray uniformly on foliage.",
    "targetCrops": [
      "Grapes",
      "Pomegranate",
      "Banana",
      "Citrus",
      "Cotton",
      "Soybean",
      "Groundnut",
      "Sugarcane",
      "Tomato",
      "Chilli",
      "Onion",
      "Potato",
      "Vegetables",
      "Fruit crops"
    ],
    "packSize": ["250 ml","500 ml","1 L"],
    "storage": "Store in a cool and dry place.\nProtect from direct sunlight.",
    "shelfLife": "24 months under recommended storage conditions.",
    "compatibility": "Compatible with most fertilizers and micronutrients.\nPerform compatibility test before tank mixing.",
    "images": [
      "client-assets/products/liquid-nutrition/lignocomplex + Zn.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "Chelated Zinc Nutrition",
      "technology": "Advanced Chelated Zinc Technology",
      "certifications": [],
      "usp": ["Lignosulphonate Chelation","Rapid Zinc Absorption","Corrects Zinc Deficiency","Improves Crop Quality"],
      "seo": {
        "title": "Lignocomplex + Zn Lignosulphonate Chelated Zinc Fertilizer | Synergy Crop Solutions",
        "description": "Premium lignosulphonate chelated zinc fertilizer developed for correcting zinc deficiency and improving plant growth, flowering and crop productivity.",
        "keywords": [
          "zinc fertilizer",
          "chelated zinc",
          "lignocomplex zn",
          "zinc deficiency",
          "plant growth",
          "flowering improvement",
          "crop productivity",
          "synergy crop solutions"
        ]
      },
      "faqs": [
        {
          "question": "What is Lignocomplex + Zn and how does it work?",
          "answer": "Lignocomplex + Zn is a premium lignosulphonate chelated zinc fertilizer that supplies highly available zinc to plants. Zinc is essential for enzyme activation, chlorophyll formation, auxin synthesis and crop metabolism. The lignosulphonate chelation ensures rapid absorption and sustained availability."
        },
        {
          "question": "Which crops benefit from Lignocomplex + Zn?",
          "answer": "Lignocomplex + Zn is suitable for grapes, pomegranate, banana, citrus, cotton, soybean, groundnut, sugarcane, tomato, chilli, onion, potato, vegetables and fruit crops."
        },
        {
          "question": "Can Lignocomplex + Zn be mixed with other fertilizers?",
          "answer": "Yes. Lignocomplex + Zn is compatible with most fertilizers and micronutrients. Perform a compatibility test before tank mixing."
        },
        {
          "question": "How should Lignocomplex + Zn be stored?",
          "answer": "Store in a cool and dry place away from direct sunlight. Shelf life is 24 months under recommended storage conditions."
        }
      ]
    }
  },
  {
    "name": "Syn BioK Plus",
    "slug": "synbiok-plus",
    "category": "liquid-nutrition",
    "productType": "Liquid Potassium Fertilizer",
    "scientificName": "",
    "composition": "Liquid potassium formulation.\nConcentrated potassium nutrient solution.",
    "shortDescription": "Syn BioK Plus is a premium liquid potassium fertilizer developed to improve fruit quality, colour development, sugar accumulation and overall crop productivity.",
    "longDescription": "Syn BioK Plus supplies highly available potassium required during flowering, fruit development and crop maturation. It enhances sugar movement, improves fruit colour, firmness, size and market quality while increasing tolerance against environmental stress.",
    "benefits": [
      "Supplies highly available potassium during critical growth stages.",
      "Improves fruit colour development.",
      "Enhances sugar accumulation and sweetness.",
      "Improves fruit firmness and size.",
      "Promotes market quality of produce.",
      "Enhances flowering and fruit retention.",
      "Improves sugar movement within the plant.",
      "Increases tolerance against environmental stress.",
      "Supports overall crop productivity.",
      "Improves post-harvest shelf quality."
    ],
    "dosage": "2–3 ml per litre of water.\nFoliar spray during flowering and fruit development.",
    "applicationMethod": "Foliar spray.\nDilute in water and spray uniformly on foliage.",
    "targetCrops": [
      "Grapes",
      "Pomegranate",
      "Banana",
      "Citrus",
      "Mango",
      "Cotton",
      "Sugarcane",
      "Tomato",
      "Chilli",
      "Onion",
      "Potato",
      "Vegetables",
      "Fruit crops"
    ],
    "packSize": ["250 ml","500 ml","1 L"],
    "storage": "Store in a cool and dry place.\nProtect from direct sunlight.",
    "shelfLife": "24 months under recommended storage conditions.",
    "compatibility": "Compatible with most fertilizers and micronutrients.\nPerform a compatibility test before tank mixing.",
    "images": [
      "client-assets/products/liquid-nutrition/synbiok-plus.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "Potassium Nutrition",
      "technology": "Advanced Liquid Potassium Technology",
      "certifications": [],
      "usp": ["Advanced Liquid Potassium","Improves Fruit Colour","Enhances Sugar Accumulation","Strengthens Plant Structure"],
      "seo": {
        "title": "Syn BioK Plus Liquid Potassium Fertilizer | Synergy Crop Solutions",
        "description": "Premium liquid potassium fertilizer developed to improve fruit quality, colour development, sugar accumulation and overall crop productivity.",
        "keywords": [
          "potassium fertilizer",
          "liquid potash",
          "syn biok plus",
          "fruit quality",
          "colour development",
          "sugar accumulation",
          "crop productivity",
          "synergy crop solutions"
        ]
      },
      "faqs": [
        {
          "question": "What is Syn BioK Plus and how does it work?",
          "answer": "Syn BioK Plus is a premium liquid potassium fertilizer that supplies highly available potassium to plants. Potassium is essential for sugar movement, fruit colour development, firmness and overall crop quality. It is particularly important during flowering, fruit development and maturation stages."
        },
        {
          "question": "Which crops benefit from Syn BioK Plus?",
          "answer": "Syn BioK Plus is suitable for grapes, pomegranate, banana, citrus, mango, cotton, sugarcane, tomato, chilli, onion, potato, vegetables and fruit crops."
        },
        {
          "question": "Can Syn BioK Plus be mixed with other fertilizers?",
          "answer": "Yes. Syn BioK Plus is compatible with most fertilizers and micronutrients. Perform a compatibility test before tank mixing."
        },
        {
          "question": "How should Syn BioK Plus be stored?",
          "answer": "Store in a cool and dry place away from direct sunlight. Shelf life is 24 months under recommended storage conditions."
        }
      ]
    }
  },
  {
    "name": "Spectrum",
    "slug": "spectrum",
    "category": "organic-inputs",
    "productType": "Premium Organic Soil Conditioner",
    "scientificName": "",
    "composition": "Premium organic soil conditioner.\nOrganic carbon enriched formulation.",
    "shortDescription": "Spectrum is a premium organic soil conditioner developed to improve soil fertility, microbial activity, root development and long-term crop productivity.",
    "longDescription": "Spectrum improves soil structure, enhances organic carbon, increases microbial activity and improves nutrient availability. Regular application promotes healthy root systems, better water retention and sustainable crop production while improving overall soil health.",
    "benefits": [
      "Improves soil structure and tilth.",
      "Enhances organic carbon content.",
      "Increases beneficial microbial activity.",
      "Improves nutrient availability in soil.",
      "Promotes healthy root development.",
      "Enhances water retention capacity.",
      "Supports sustainable crop production.",
      "Improves long-term soil health.",
      "Enhances nutrient uptake efficiency.",
      "Promotes overall crop productivity."
    ],
    "dosage": "200–250 kg per acre.\nApply during land preparation.",
    "applicationMethod": "Soil application.\nBroadcast uniformly during land preparation and incorporate into soil.",
    "targetCrops": [
      "Cereals",
      "Pulses",
      "Oilseeds",
      "Cotton",
      "Sugarcane",
      "Vegetables",
      "Fruit crops",
      "Floriculture",
      "Plantation crops"
    ],
    "packSize": ["5 Kg","10 Kg","25 Kg"],
    "storage": "Store in a cool and dry place.\nProtect from moisture and direct sunlight.",
    "shelfLife": "24 months under recommended storage conditions.",
    "compatibility": "Compatible with biofertilizers, organic manures and most fertilizers.",
    "images": [
      "client-assets/products/organic-inputs/spectrum.jpeg"
    ],
    "metadata": {
      "brand": "SHEER",
      "company": "Synergy Crop Solutions",
      "subcategory": "Organic Soil Conditioner",
      "technology": "Organic Carbon Enrichment Technology",
      "certifications": [],
      "usp": ["Organic Carbon Enrichment","Improves Soil Structure","Enhances Microbial Activity","Long-Term Soil Health"],
      "seo": {
        "title": "Spectrum Premium Organic Soil Conditioner | Synergy Crop Solutions",
        "description": "Premium organic soil conditioner developed to improve soil fertility, microbial activity, root development and long-term crop productivity.",
        "keywords": [
          "organic soil conditioner",
          "soil fertility",
          "microbial activity",
          "spectrum",
          "organic inputs",
          "soil health",
          "root development",
          "synergy crop solutions"
        ]
      },
      "faqs": [
        {
          "question": "What is Spectrum and how does it work?",
          "answer": "Spectrum is a premium organic soil conditioner that improves soil structure, enhances organic carbon and increases beneficial microbial activity. It promotes healthy root systems, better water retention and sustainable crop production while improving overall soil health."
        },
        {
          "question": "Which crops can use Spectrum?",
          "answer": "Spectrum is suitable for all agricultural and horticultural crops including cereals, pulses, oilseeds, cotton, sugarcane, vegetables, fruit crops, floriculture and plantation crops."
        },
        {
          "question": "Can Spectrum be mixed with other fertilizers?",
          "answer": "Yes. Spectrum is compatible with biofertilizers, organic manures and most fertilizers."
        },
        {
          "question": "How should Spectrum be stored?",
          "answer": "Store in a cool and dry place, protected from moisture and direct sunlight. Shelf life is 24 months under recommended storage conditions."
        }
      ]
    }
  }
];

async function seedProducts() {
  try {
    await connectDB();

    const existingCount = await Product.countDocuments();
    if (existingCount > 0) {
      logger.info(`${existingCount} product(s) already exist — skipping seeder`);
      process.exit(0);
    }

    await Product.insertMany(products);
    logger.info(`${products.length} products seeded successfully`);
    process.exit(0);
  } catch (error) {
    console.error("Seeder failed:", error.message);
    process.exit(1);
  } finally {
    await disconnectDB();
  }
}

seedProducts();
