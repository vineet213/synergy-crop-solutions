import { connectDB, disconnectDB } from "../config/db.js";
import Product from "../models/Product.js";

const products = [
  {
    name: "Aceto",
    slug: "aceto",
    category: "biofertilizers",
    images: ["client-assets/products/biofertilizers/aceto.jpeg"],
  },
  {
    name: "Azospi",
    slug: "azospi",
    category: "biofertilizers",
    images: ["client-assets/products/biofertilizers/azospi.jpeg"],
  },
  {
    name: "Azoto",
    slug: "azoto",
    category: "biofertilizers",
    images: ["client-assets/products/biofertilizers/azoto.jpeg"],
  },
  {
    name: "Basu",
    slug: "basu",
    category: "biofertilizers",
    images: ["client-assets/products/biofertilizers/basu.jpeg"],
  },
  {
    name: "Phosphate",
    slug: "phosphate",
    category: "biofertilizers",
    images: ["client-assets/products/biofertilizers/phosphate.jpeg"],
  },
  {
    name: "Potash",
    slug: "potash",
    category: "biofertilizers",
    images: ["client-assets/products/biofertilizers/potash.jpeg"],
  },
  {
    name: "Rhizo",
    slug: "rhizo",
    category: "biofertilizers",
    images: ["client-assets/products/biofertilizers/rhizo.jpeg"],
  },
  {
    name: "Secure P",
    slug: "secure-p",
    category: "biofertilizers",
    images: ["client-assets/products/biofertilizers/secure-p.jpeg"],
  },
  {
    name: "Tri Immune",
    slug: "tri-immune",
    category: "biofertilizers",
    images: ["client-assets/products/biofertilizers/tri-immune.jpeg"],
  },
  {
    name: "Vam",
    slug: "vam",
    category: "biofertilizers",
    images: ["client-assets/products/biofertilizers/vam.jpeg"],
  },
  {
    name: "Zinc",
    slug: "zinc",
    category: "biofertilizers",
    images: ["client-assets/products/biofertilizers/zinc.jpeg"],
  },
  {
    name: "Meta",
    slug: "meta",
    category: "biopesticides",
    images: ["client-assets/products/biopesticides/meta.jpeg"],
  },
  {
    name: "Pseudo",
    slug: "pseudo",
    category: "biopesticides",
    images: ["client-assets/products/biopesticides/pseudo.jpeg"],
  },
  {
    name: "Tricho",
    slug: "tricho",
    category: "biopesticides",
    images: ["client-assets/products/biopesticides/tricho.jpeg"],
  },
  {
    name: "Tricho H",
    slug: "tricho-h",
    category: "biopesticides",
    images: ["client-assets/products/biopesticides/tricho-h.jpeg"],
  },
  {
    name: "Verti C",
    slug: "verti-c",
    category: "biopesticides",
    images: ["client-assets/products/biopesticides/verti-c.jpeg"],
  },
  {
    name: "Fusion",
    slug: "fusion",
    category: "consortia",
    images: ["client-assets/products/consortia/fusion.jpeg"],
  },
  {
    name: "Life",
    slug: "life",
    category: "consortia",
    images: ["client-assets/products/consortia/life.jpeg"],
  },
  {
    name: "Plant Bliss",
    slug: "plant-bliss",
    category: "consortia",
    images: ["client-assets/products/consortia/plant-bliss.jpeg"],
  },
  {
    name: "Plant Cure",
    slug: "plant-cure",
    category: "consortia",
    images: ["client-assets/products/consortia/plant-cure.jpeg"],
  },
  {
    name: "Plant Cure Plus",
    slug: "plant-cure-plus",
    category: "consortia",
    images: ["client-assets/products/consortia/plant-cure-plus.jpeg"],
  },
  {
    name: "Root Cure",
    slug: "root-cure",
    category: "consortia",
    images: ["client-assets/products/consortia/root-cure.jpeg"],
  },
  {
    name: "Root Cure Plus",
    slug: "root-cure-plus",
    category: "consortia",
    images: ["client-assets/products/consortia/root-cure-plus.jpeg"],
  },
  {
    name: "Zeal",
    slug: "zeal",
    category: "consortia",
    images: ["client-assets/products/consortia/zeal.jpeg"],
  },
  {
    name: "Agri Best Plus",
    slug: "agri-best-plus",
    category: "liquid-nutrition",
    images: ["client-assets/products/liquid-nutrition/agri-best-plus.jpeg"],
  },
  {
    name: "Algafert",
    slug: "algafert",
    category: "liquid-nutrition",
    images: ["client-assets/products/liquid-nutrition/algafert.jpeg"],
  },
  {
    name: "Biofat 600",
    slug: "biofat-600",
    category: "liquid-nutrition",
    images: ["client-assets/products/liquid-nutrition/biofat600.jpeg"],
  },
  {
    name: "Boratech MO+",
    slug: "boratech-mo-plus",
    category: "liquid-nutrition",
    images: ["client-assets/products/liquid-nutrition/boratech-MO+.jpeg"],
  },
  {
    name: "Lignocomplex + Zn",
    slug: "lignocomplex-plus-zn",
    category: "liquid-nutrition",
    images: ["client-assets/products/liquid-nutrition/lignocomplex + Zn.jpeg"],
  },
  {
    name: "Synbiok Plus",
    slug: "synbiok-plus",
    category: "liquid-nutrition",
    images: ["client-assets/products/liquid-nutrition/synbiok-plus.jpeg"],
  },
  {
    name: "Spectrum",
    slug: "spectrum",
    category: "organic-inputs",
    images: ["client-assets/products/organic-inputs/spectrum.jpeg"],
  },
];

async function seedProducts() {
  try {
    await connectDB();

    const existingCount = await Product.countDocuments();
    if (existingCount > 0) {
      console.log(`${existingCount} product(s) already exist — skipping seeder`);
      process.exit(0);
    }

    await Product.insertMany(products);
    console.log(`${products.length} products seeded successfully`);
    process.exit(0);
  } catch (error) {
    console.error("Seeder failed:", error.message);
    process.exit(1);
  } finally {
    await disconnectDB();
  }
}

seedProducts();
