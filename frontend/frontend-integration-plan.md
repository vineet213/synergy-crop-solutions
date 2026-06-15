# Frontend Integration Plan

## Summary

This report audits the public-facing frontend in `frontend/src/pages/public`, verifies route navigation and build status, identifies missing assets and backend APIs, and provides an integration plan for backend support.

- Build status: `npm run build` succeeds in `frontend`
- Public routes compile and resolve through `src/routes/AppRoutes.jsx`
- Navbar links resolve to existing public routes
- Current backend provides only authentication endpoints; all public page data endpoints are missing
- Several route placeholders exist without real content or API integration
- Missing asset references were found in the homepage design

---

## Route Inventory

| Route | Page component | Status | Notes |
|---|---|---|---|
| `/` | `HomePage.jsx` | implemented | Static homepage; no data fetching yet |
| `/products` | `ProductsPage.jsx` | implemented | Static product overview |
| `/products/:id` | `ProductDetailPage.jsx` | placeholder | detail route exists, no dynamic data |
| `/categories` | `CategoriesPage.jsx` | implemented | static category cards |
| `/certifications` | `CertificationsPage.jsx` | implemented | static certification cards |
| `/contact` | `ContactPage.jsx` | implemented | static contact CTA only |
| `/crops` | `CropDiscoveryPage.jsx` | implemented | static discovery info |
| `/crops/products` | `CropProductsPage.jsx` | placeholder | route exists, placeholder content |
| `/crops/:id` | `CropDetailPage.jsx` | placeholder | route exists, placeholder content |
| `/diseases` | `DiseaseDiscoveryPage.jsx` | implemented | static discovery info |
| `/diseases/products` | `DiseaseProductsPage.jsx` | placeholder | route exists, placeholder content |
| `/diseases/:id` | `DiseaseDetailPage.jsx` | placeholder | route exists, placeholder content |
| `/distributors` | `DistributorLocatorPage.jsx` | implemented | static locator info |
| `/blog` | `BlogPage.jsx` | implemented | static article cards |
| `/blog/:id` | `BlogDetailPage.jsx` | placeholder | route exists, placeholder content |
| `/state-products` | `StateProductsPage.jsx` | placeholder | route exists, placeholder content |
| `/testimonials` | `TestimonialsPage.jsx` | implemented | static testimonial cards |

### Route coverage observations

- Navbar includes: home, products, categories, crops, diseases, distributors, blog, contact.
- The `/state-products` route is not directly exposed in navigation.
- Dynamic routes for detail pages exist, but listing pages do not currently link into them.
- Admin route `/admin` exists separately and is not part of the public navbar.

---

## Navigation and Link Audit

### Navbar links

- `/` ✅ Home
- `/products` ✅ Products
- `/categories` ✅ Categories
- `/crops` ✅ Crop Discovery
- `/diseases` ✅ Disease Discovery
- `/distributors` ✅ Locator
- `/blog` ✅ Blog
- `/contact` ✅ Contact
- `/contact` ✅ Get in Touch CTA

### Observations

- All navbar links resolve to valid routes defined in `src/routes/AppRoutes.jsx`.
- There is no navbar entry for detail or state-specific pages, which is acceptable for a marketing site if those are nested behind in-app CTAs.
- The admin navigation is intentionally separate.

---

## Component Inventory

### Primary UI primitives

| Component | File | Used in public pages? | Notes |
|---|---|---|---|
| `Button` | `src/components/ui/Button.jsx` | yes | used across multiple pages |
| `Card` | `src/components/ui/Card.jsx` | yes | central layout primitive |
| `Badge` | `src/components/ui/Badge.jsx` | yes | used in home and categories |
| `SectionContainer` | `src/components/ui/SectionContainer.jsx` | yes | used to structure page sections |
| `PublicLayout` | `src/components/layout/PublicLayout.jsx` | yes | wrapper for public pages |
| `Navbar` | `src/components/layout/Navbar.jsx` | yes | main top-level navigation |
| `Footer` | `src/components/layout/Footer.jsx` | yes | public footer content |

### Unused imports / dead icon imports

- `HomePage.jsx`: imports `ArrowRight` and `Sparkles` from `lucide-react` but does not use them.
- `Navbar.jsx`: imports `Sparkles` from `lucide-react` but does not use it.

### Unused React components

- No standalone React components in `src/components` are unused.
- Several page components are placeholders, but they are still used by route definitions.

---

## Public Page Audit

### `/` — `HomePage.jsx`

- Purpose: marketing homepage with product highlights, crop and disease discovery, distributor locator, and testimonials.
- Backend endpoint(s) required:
  - `GET /api/v1/home/hero` or combined homepage content payload
  - `GET /api/v1/products/featured`
  - `GET /api/v1/discovery/crops`
  - `GET /api/v1/discovery/diseases`
  - `GET /api/v1/distributors/featured`
  - `GET /api/v1/testimonials`
- Request shape: simple GET requests; no query required for core homepage content.
- Response shape examples:
  - `hero`: `{ title, subtitle, ctaText, ctaUrl }`
  - `featuredProducts`: `[{ id, title, description, imageUrl }]`
  - `cropDiscovery`: `[{ id, title, description }]`
  - `diseaseDiscovery`: `[{ id, title, description }]`
  - `distributors`: `[{ id, name, description, location }]`
  - `testimonials`: `[{ id, author, role, quote }]`
- Loading state requirements:
  - skeleton cards or spinner for hero and grid sections
  - placeholder blocks for featured products, discovery panels, and testimonials
- Error state requirements:
  - fallback copy like "Unable to load featured insights right now"
  - gracefully degrade to static messaging if endpoint fails

### `/products` — `ProductsPage.jsx`

- Purpose: showcase core product categories and product positioning.
- Backend endpoint(s) required:
  - `GET /api/v1/products`
- Request shape:
  - query params optional: `category`, `featured=true`
- Response shape:
  - `[{ id, title, description, imageUrl, slug }]`
- Loading state requirements:
  - placeholder cards while products load
- Error state requirements:
  - error callout with retry if product catalog cannot be fetched

### `/products/:id` — `ProductDetailPage.jsx`

- Purpose: detail view for individual products.
- Backend endpoint(s) required:
  - `GET /api/v1/products/:id`
- Request shape:
  - path param `id`
- Response shape:
  - `{ id, title, description, images, features, relatedProducts }`
- Loading state requirements:
  - loading skeleton for details section
- Error state requirements:
  - not found message for unknown product
  - retry or back-to-list CTA

### `/categories` — `CategoriesPage.jsx`

- Purpose: explain product categories supported by the business.
- Backend endpoint(s) required:
  - `GET /api/v1/categories`
- Request shape:
  - simple GET
- Response shape:
  - `[{ id, title, description, imageUrl }]`
- Loading state requirements:
  - placeholder category cards
- Error state requirements:
  - fallback text if categories cannot load

### `/certifications` — `CertificationsPage.jsx`

- Purpose: highlight the company’s certifications and quality standards.
- Backend endpoint(s) required:
  - `GET /api/v1/certifications`
- Request shape:
  - simple GET
- Response shape:
  - `[{ id, title, description, badge }]`
- Loading state requirements:
  - spinner or skeleton list
- Error state requirements:
  - clear note if certification data is unavailable

### `/contact` — `ContactPage.jsx`

- Purpose: convert visitors with contact details and a CTA.
- Backend endpoint(s) required:
  - optional `POST /api/v1/contact` for lead capture
- Request shape:
  - `{ name, email, phone, message }`
- Response shape:
  - `{ success: true, message: "Message received" }`
- Loading state requirements:
  - button loading state for form submit
- Error state requirements:
  - field-level and submit error handling

### `/crops` — `CropDiscoveryPage.jsx`

- Purpose: outline crop discovery services and benefits.
- Backend endpoint(s) required:
  - `GET /api/v1/crops/discovery`
- Request shape:
  - simple GET or optional query `region`
- Response shape:
  - `[{ id, title, description, details }]`
- Loading state requirements:
  - placeholder discovery cards
- Error state requirements:
  - failure banner and a fallback CTA to contact support

### `/crops/products` — `CropProductsPage.jsx`

- Purpose: show crop-specific products; currently placeholder.
- Backend endpoint(s) required:
  - `GET /api/v1/crops/products`
- Request shape:
  - optional query `cropType`
- Response shape:
  - `[{ id, title, description, imageUrl }]`
- Loading state requirements:
  - placeholder product cards
- Error state requirements:
  - message when the crop product catalog cannot be retrieved

### `/crops/:id` — `CropDetailPage.jsx`

- Purpose: crop detail page; currently placeholder.
- Backend endpoint(s) required:
  - `GET /api/v1/crops/:id`
- Request shape:
  - path param `id`
- Response shape:
  - `{ id, name, description, bestUse, yieldProfile, recommendedProducts }`
- Loading state requirements:
  - detail skeleton while loading
- Error state requirements:
  - not found or unavailable crop message

### `/diseases` — `DiseaseDiscoveryPage.jsx`

- Purpose: describe disease discovery service.
- Backend endpoint(s) required:
  - `GET /api/v1/diseases/discovery`
- Request shape:
  - simple GET or query `cropId`
- Response shape:
  - `[{ id, title, description, action }]`
- Loading state requirements:
  - discovery loading placeholders
- Error state requirements:
  - fallback text and contact CTA

### `/diseases/products` — `DiseaseProductsPage.jsx`

- Purpose: list disease management products; currently placeholder.
- Backend endpoint(s) required:
  - `GET /api/v1/diseases/products`
- Request shape:
  - optional query `diseaseType`
- Response shape:
  - `[{ id, name, description, useCase }]`
- Loading state requirements:
  - product placeholders
- Error state requirements:
  - message on fetch failure

### `/diseases/:id` — `DiseaseDetailPage.jsx`

- Purpose: disease detail view; currently placeholder.
- Backend endpoint(s) required:
  - `GET /api/v1/diseases/:id`
- Request shape:
  - path param `id`
- Response shape:
  - `{ id, name, symptoms, treatmentOptions, preventionTips }`
- Loading state requirements:
  - skeleton detail card
- Error state requirements:
  - error banner and optional help link

### `/distributors` — `DistributorLocatorPage.jsx`

- Purpose: locate distributor partners and highlight supply network.
- Backend endpoint(s) required:
  - `GET /api/v1/distributors`
- Request shape:
  - optional query `region` or `serviceType`
- Response shape:
  - `[{ id, name, description, region, contactUrl }]`
- Loading state requirements:
  - locator list loading state
- Error state requirements:
  - fallback copy and contact CTA

### `/blog` — `BlogPage.jsx`

- Purpose: display blog/article previews.
- Backend endpoint(s) required:
  - `GET /api/v1/blog`
- Request shape:
  - optional query `page`, `category`
- Response shape:
  - `[{ id, title, description, publishDate, slug }]`
- Loading state requirements:
  - skeleton article cards
- Error state requirements:
  - "Unable to load articles" and retry option

### `/blog/:id` — `BlogDetailPage.jsx`

- Purpose: blog article detail; currently placeholder.
- Backend endpoint(s) required:
  - `GET /api/v1/blog/:id`
- Request shape:
  - path param `id`
- Response shape:
  - `{ id, title, content, author, publishedAt }`
- Loading state requirements:
  - content skeleton while fetching
- Error state requirements:
  - not found message or redirect to `/blog`

### `/state-products` — `StateProductsPage.jsx`

- Purpose: state-specific product listing; currently placeholder.
- Backend endpoint(s) required:
  - `GET /api/v1/state-products`
- Request shape:
  - optional query `state`
- Response shape:
  - `[{ id, title, description, state, availability }]`
- Loading state requirements:
  - placeholder list cards
- Error state requirements:
  - failure message with fallback navigation

### `/testimonials` — `TestimonialsPage.jsx`

- Purpose: showcase customer testimonials.
- Backend endpoint(s) required:
  - `GET /api/v1/testimonials`
- Request shape:
  - simple GET
- Response shape:
  - `[{ id, author, description, role }]`
- Loading state requirements:
  - skeleton testimonial cards
- Error state requirements:
  - fallback testimonial messaging

---

## Asset and Missing Resource Audit

### Missing assets

The homepage references image assets that are not present in `frontend/src/assets/images`:

- `/src/assets/images/crop-discovery.png`
- `/src/assets/images/disease-discovery.png`
- `hero-pattern.jpg` referenced in `src/index.css` via the `.hero-visual::before` background URL

### Asset inventory

Current `frontend/src/assets/images` only contains `.gitkeep`.
Current `frontend/src/assets/icons` only contains `.gitkeep`.

### Impact

- The homepage will render without the intended imagery.
- Static CSS background image reference may fail at runtime or show a broken graphic.
- No build-time error occurred for these references because the JSX and CSS strings are not bundler-resolved paths.

---

## Dead Imports and Code Issues

### Identified dead imports

- `ArrowRight` imported but not used in `src/pages/public/HomePage.jsx`
- `Sparkles` imported but not used in `src/pages/public/HomePage.jsx`
- `Sparkles` imported but not used in `src/components/layout/Navbar.jsx`

### Page placeholders

These page components are route-available but currently contain only placeholder text:

- `ProductDetailPage.jsx`
- `StateProductsPage.jsx`
- `CropProductsPage.jsx`
- `CropDetailPage.jsx`
- `DiseaseProductsPage.jsx`
- `DiseaseDetailPage.jsx`
- `BlogDetailPage.jsx`

These should be upgraded to real detail pages and/or removed from routing if not needed.

---

## Styling and Reuse Opportunities

### Duplicate styling patterns

- Repeated inline styles in pages, such as `style={{ display: "flex", flexDirection: "column", gap: "1rem" }}` on `card-shell` wrappers.
- Multiple pages use the same grid layout classes: `card-grid`, `discover-grid`, `highlight-grid`, `testimonials-grid`.
- Reuse candidates:
  - `InfoCardGrid` for repeated card grid layouts
  - `DetailPanel` or `FeaturePanel` for panel blocks shown on `HomePage`, `ContactPage`, and product pages
  - `PageSection` wrapper component for repeated `SectionContainer + card-shell` compositions
  - `PageHeader` / `SectionHeader` to standardize titles, subtitles, and description combinations

### Recommended reusable UI components

- `FeatureGrid` / `CardGrid`
- `DetailCard` or `InfoPanel`
- `ContentSection` wrapper for repeated `SectionContainer` patterns
- `ImageBanner` component for hero visuals and promotional sections

---

## Backend Dependency Inventory

### Existing backend endpoints

Current backend only exposes auth endpoints:

- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`

### Missing backend dependencies for public site

Every public page requires new data endpoints. The minimum set is:

- `GET /api/v1/home`
- `GET /api/v1/products`
- `GET /api/v1/products/:id`
- `GET /api/v1/categories`
- `GET /api/v1/certifications`
- `GET /api/v1/crops/discovery`
- `GET /api/v1/crops/products`
- `GET /api/v1/crops/:id`
- `GET /api/v1/diseases/discovery`
- `GET /api/v1/diseases/products`
- `GET /api/v1/diseases/:id`
- `GET /api/v1/distributors`
- `GET /api/v1/blog`
- `GET /api/v1/blog/:id`
- `GET /api/v1/state-products`
- `GET /api/v1/testimonials`
- `POST /api/v1/contact` (optional, if lead capture is enabled)

### Recommended payload shapes

- Standardize list endpoints with arrays of objects containing IDs, titles, descriptions, images, metadata, and slugs.
- Detail endpoints should return richer records plus related items.
- For contact lead capture, use a simple `{ name, email, phone, message }` request.

---

## Recommended Implementation Order

1. **Homepage data integration**
   - Add homepage content endpoint(s)
   - Provide featured products, discovery cards, distributor highlights, and testimonials
   - Fix missing image assets or convert to responsive SVG/illustration placeholders

2. **Products + categories + certifications**
   - Build catalog endpoints for products and categories
   - Implement `/products` and `/categories`
   - Upgrade `/products/:id` to a working detail page

3. **Blog and content pages**
   - Implement blog listing and detail endpoints
   - Add navigation from listings to `blog/:id`

4. **Discovery sections**
   - Add `crops/discovery`, `diseases/discovery`, and related product endpoints
   - Build `/crops`, `/diseases`, `/crops/products`, `/diseases/products` pages

5. **Distributor locator and contact**
   - Add distributor list endpoint and optional region filter
   - Add contact lead capture endpoint

6. **State products + dynamic detail pages**
   - Implement `state-products` and all `:id` detail routes as needed

7. **Refactoring UI reuse**
   - Convert repeated layout patterns into shared, reusable components after data integration is in place

---

## Build Verification

- `npm run build` executed successfully in `frontend`
- Build output: `dist/index.html` created with no compile errors
- Route definitions and import paths are valid

---

## Conclusion

The frontend compiles correctly, but the public site is currently a largely static marketing shell.
A complete backend integration requires a new set of content and catalog endpoints, plus asset provisioning for homepage imagery.

The highest-priority implementation tasks are homepage data support, product/category APIs, blog APIs, and distributor/contact endpoints.
