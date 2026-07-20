import {
	required,
	isIn,
	isNumeric,
	matches,
	isBoolean,
	isLocalizedText,
	isArrayOfLocalizedText,
	maxLength,
} from "./common.js";

const VALID_CATEGORIES = [
	"Bio Fertilizer",
	"Bio Pesticide",
	"Consortium",
	"Liquid Nutrition",
	"Organic Inputs",
	"biofertilizers",
	"biopesticides",
	"consortia",
	"liquid-nutrition",
	"organic-inputs",
];

const slugPattern = matches(
	/^[a-z0-9]+(-[a-z0-9]+)*$/,
	"slug must be lowercase alphanumeric with hyphens"
);

// ── Helpers ────────────────────────────────────────────────────────────────
// Validate an array of FAQ objects (each must have question + answer).
function isValidFaqArray(value, field) {
	if (value === undefined || value === null) return null;
	if (!Array.isArray(value)) return `${field} must be an array`;
	for (let i = 0; i < value.length; i++) {
		const item = value[i];
		if (!item || typeof item !== "object") {
			return `${field}[${i}] must be an object`;
		}
		const qOk =
			typeof item.question === "string" ||
			(typeof item.question === "object" &&
				item.question !== null &&
				typeof item.question.en === "string");
		const aOk =
			typeof item.answer === "string" ||
			(typeof item.answer === "object" &&
				item.answer !== null &&
				typeof item.answer.en === "string");
		if (!qOk || !aOk) {
			return `${field}[${i}] must have localized text "question" and "answer"`;
		}
	}
	return null;
}

// Validate an array of image objects (each must have url string).
function isValidImageArray(value, field) {
	if (value === undefined || value === null) return null;
	if (!Array.isArray(value)) return `${field} must be an array`;
	for (let i = 0; i < value.length; i++) {
		const item = value[i];
		if (!item || typeof item !== "object" || typeof item.url !== "string") {
			return `${field}[${i}] must have a "url" string`;
		}
	}
	return null;
}

// Validate brochure object (url is optional string, title is optional localized text).
function isValidBrochure(value, field) {
	if (value === undefined || value === null) return null;
	if (typeof value !== "object") return `${field} must be an object`;
	if (value.url !== undefined && typeof value.url !== "string") {
		return `${field}.url must be a string`;
	}
	if (value.title !== undefined) {
		const ok =
			typeof value.title === "string" ||
			(typeof value.title === "object" &&
				value.title !== null &&
				typeof value.title.en === "string");
		if (!ok) return `${field}.title must be a string or localized object`;
	}
	return null;
}

// ── Create schema ──────────────────────────────────────────────────────────
export const createProductSchema = {
	name: [required, isLocalizedText],
	category: [required, isIn(VALID_CATEGORIES)],
	slug: [slugPattern],

	// Basic
	subCategory: [isLocalizedText],
	featured: [isBoolean],
	published: [isBoolean],

	// Descriptions
	shortDescription: [isLocalizedText],
	longDescription: [isLocalizedText],
	overview: [isLocalizedText],

	// Technical
	composition: [isLocalizedText],
	activeIngredients: [isLocalizedText],
	formulation: [isLocalizedText],
	modeOfAction: [isLocalizedText],
	technicalSpecifications: [isLocalizedText],

	// Usage
	dosage: [isLocalizedText],
	applicationMethod: [isLocalizedText],
	frequency: [isLocalizedText],
	growthStage: [isLocalizedText],

	// Benefits
	benefits: [isArrayOfLocalizedText],
	features: [isArrayOfLocalizedText],

	// Agriculture
	crops: [isArrayOfLocalizedText],
	diseases: [isArrayOfLocalizedText],
	pests: [isArrayOfLocalizedText],
	nutrientDeficiencies: [isArrayOfLocalizedText],
	suitableRegions: [isArrayOfLocalizedText],

	// Safety
	precautions: [isLocalizedText],
	storageInstructions: [isLocalizedText],
	compatibility: [isLocalizedText],
	shelfLife: [isLocalizedText],

	// Media
	images: [(v, f) => isValidImageArray(v, f)],
	brochure: [(v, f) => isValidBrochure(v, f)],

	// FAQ
	faqs: [(v, f) => isValidFaqArray(v, f)],

	// SEO
	metaTitle: [isLocalizedText, maxLength(70)],
	metaDescription: [isLocalizedText, maxLength(160)],
	keywords: [isArrayOfLocalizedText],

	// Display
	displayOrder: [isNumeric],

	// Legacy
	price: [isNumeric],
};

// ── Update schema (all fields optional) ────────────────────────────────────
export const updateProductSchema = {
	name: [isLocalizedText],
	category: [isIn(VALID_CATEGORIES)],
	slug: [slugPattern],

	// Basic
	subCategory: [isLocalizedText],
	featured: [isBoolean],
	published: [isBoolean],

	// Descriptions
	shortDescription: [isLocalizedText],
	longDescription: [isLocalizedText],
	overview: [isLocalizedText],

	// Technical
	composition: [isLocalizedText],
	activeIngredients: [isLocalizedText],
	formulation: [isLocalizedText],
	modeOfAction: [isLocalizedText],
	technicalSpecifications: [isLocalizedText],

	// Usage
	dosage: [isLocalizedText],
	applicationMethod: [isLocalizedText],
	frequency: [isLocalizedText],
	growthStage: [isLocalizedText],

	// Benefits
	benefits: [isArrayOfLocalizedText],
	features: [isArrayOfLocalizedText],

	// Agriculture
	crops: [isArrayOfLocalizedText],
	diseases: [isArrayOfLocalizedText],
	pests: [isArrayOfLocalizedText],
	nutrientDeficiencies: [isArrayOfLocalizedText],
	suitableRegions: [isArrayOfLocalizedText],

	// Safety
	precautions: [isLocalizedText],
	storageInstructions: [isLocalizedText],
	compatibility: [isLocalizedText],
	shelfLife: [isLocalizedText],

	// Media
	images: [(v, f) => isValidImageArray(v, f)],
	brochure: [(v, f) => isValidBrochure(v, f)],

	// FAQ
	faqs: [(v, f) => isValidFaqArray(v, f)],

	// SEO
	metaTitle: [isLocalizedText, maxLength(70)],
	metaDescription: [isLocalizedText, maxLength(160)],
	keywords: [isArrayOfLocalizedText],

	// Display
	displayOrder: [isNumeric],

	// Legacy
	price: [isNumeric],
	status: [isIn(["draft", "published", "archived"])],
	isFeatured: [isBoolean],
};
