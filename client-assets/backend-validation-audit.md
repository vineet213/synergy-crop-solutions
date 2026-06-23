# Backend Validation Audit

**Project:** Synergy Crop Solutions
**Date:** 2026-06-24
**Scope:** All Express routes in `backend/src/routes/` across 8 resource groups

---

## Validation Infrastructure

| Component | Status |
|---|---|
| `src/validators/` (10 files) | All zero bytes — no validation rules defined |
| `src/middleware/validateRequest.js` | Zero bytes — no middleware to run validators |
| Validation library (joi / express-validator / zod) | Not installed — no validation library in `package.json` |
| Mongoose schema validation | Present — only `.create()` / `.save()` triggers it; `findByIdAndUpdate` uses `{ runValidators: true }` in some controllers |
| Authentication middleware (`authenticate.js`) | Working — validates JWT only, not request body/params/query |

**Conclusion:** Zero request validation middleware exists anywhere in the backend.

---

## Route-by-Route Audit

### Auth Routes (`/api/auth`)

| # | Method | Path | Validation | Type | Risk |
|---|---|---|---|---|---|
| 1 | POST | /login | **No** | — | **High** — no email format validation, no password length check, empty strings accepted |
| 2 | GET | /me | **No** | — | Low — read-only, requires auth |

### Product Routes (`/api/...`)

| # | Method | Path | Validation | Type | Risk |
|---|---|---|---|---|---|
| 3 | GET | /public/products | **No** | — | Low — read-only query params |
| 4 | GET | /public/products/:id | **No** | — | Low — read-only, CastError handled by errorHandler |
| 5 | GET | /products | **No** | — | Low — read-only, duplicate of #3 |
| 6 | GET | /products/category/:category | **No** | — | Low — read-only |
| 7 | GET | /products/:slug | **No** | — | Low — read-only |
| 8 | GET | /admin/products | **No** | Auth guard only | Low — read-only, auth required |
| 9 | POST | /admin/products | **No** | Mongoose schema only | **Critical** — creates records, no body validation |
| 10 | GET | /admin/products/:id | **No** | Auth guard only | Low — read-only |
| 11 | PATCH | /admin/products/:id | **No** | Mongoose + `runValidators` | **Critical** — updates records, any field accepted |
| 12 | DELETE | /admin/products/:id | **No** | Auth guard only | **High** — deletes records, no id format check |

### Distributor Routes (`/api/...`)

| # | Method | Path | Validation | Type | Risk |
|---|---|---|---|---|---|
| 13 | GET | /public/distributors | **No** | — | Low — read-only query params, no regex injection guard |
| 14 | GET | /public/distributors/:id | **No** | — | Low — read-only |
| 15 | GET | /admin/distributors | **No** | Auth guard only | Low — read-only |
| 16 | GET | /admin/distributors/:id | **No** | Auth guard only | Low — read-only |
| 17 | POST | /admin/distributors | **No** | Mongoose schema only | **Critical** — creates records with address, no body validation |
| 18 | PATCH | /admin/distributors/:id | **No** | Mongoose + `runValidators` | **Critical** — updates records, any field accepted |
| 19 | DELETE | /admin/distributors/:id | **No** | Auth guard only | **High** — deletes records |

### Lead Routes (`/api/...`)

| # | Method | Path | Validation | Type | Risk |
|---|---|---|---|---|---|
| 20 | POST | /public/leads | **No** | Mongoose schema only | **Critical** — public endpoint, creates record, no body validation |
| 21 | GET | /admin/leads | **No** | Auth guard only | Low — read-only |
| 22 | GET | /admin/leads/:id | **No** | Auth guard only | Low — read-only |
| 23 | PATCH | /admin/leads/:id | **No** | Mongoose + `runValidators` | **High** — updates status, assignedDistributor |
| 24 | DELETE | /admin/leads/:id | **No** | Auth guard only | **High** — deletes records |

### Testimonial Routes (`/api/...`)

| # | Method | Path | Validation | Type | Risk |
|---|---|---|---|---|---|
| 25 | GET | /public/testimonials | **No** | — | Low — read-only |
| 26 | GET | /public/testimonials/:id | **No** | — | Low — read-only |
| 27 | GET | /admin/testimonials | **No** | Auth guard only | Low — read-only |
| 28 | GET | /admin/testimonials/:id | **No** | Auth guard only | Low — read-only |
| 29 | POST | /admin/testimonials | **No** | Mongoose schema only | **Critical** — creates records, no body validation |
| 30 | PATCH | /admin/testimonials/:id | **No** | Mongoose + `runValidators` | **High** — updates records |
| 31 | DELETE | /admin/testimonials/:id | **No** | Auth guard only | **High** — deletes records |

### Certification Routes (`/api/...`)

| # | Method | Path | Validation | Type | Risk |
|---|---|---|---|---|---|
| 32 | GET | /public/certifications | **No** | — | Low — read-only |
| 33 | GET | /public/certifications/:id | **No** | — | Low — read-only |
| 34 | GET | /admin/certifications | **No** | Auth guard only | Low — read-only |
| 35 | GET | /admin/certifications/:id | **No** | Auth guard only | Low — read-only |
| 36 | POST | /admin/certifications | **No** | Mongoose schema only | **Critical** — creates records, no body validation |
| 37 | PATCH | /admin/certifications/:id | **No** | Mongoose + `runValidators` | **High** — updates records |
| 38 | DELETE | /admin/certifications/:id | **No** | Auth guard only | **High** — deletes records |

### Crop Routes (`/api/...`)

| # | Method | Path | Validation | Type | Risk |
|---|---|---|---|---|---|
| 39 | GET | /public/crops | **No** | — | Low — read-only |
| 40 | GET | /public/crops/:id | **No** | — | Low — read-only |
| 41 | GET | /admin/crops | **No** | Auth guard only | Low — read-only |
| 42 | GET | /admin/crops/:id | **No** | Auth guard only | Low — read-only |
| 43 | POST | /admin/crops | **No** | Mongoose schema only | **Critical** — creates records, no body validation |
| 44 | PATCH | /admin/crops/:id | **No** | Mongoose + `runValidators` | **High** — updates records |
| 45 | DELETE | /admin/crops/:id | **No** | Auth guard only | **High** — deletes records |

### Disease Routes (`/api/...`)

| # | Method | Path | Validation | Type | Risk |
|---|---|---|---|---|---|
| 46 | GET | /public/diseases | **No** | — | Low — read-only |
| 47 | GET | /public/diseases/:id | **No** | — | Low — read-only |
| 48 | GET | /admin/diseases | **No** | Auth guard only | Low — read-only |
| 49 | GET | /admin/diseases/:id | **No** | Auth guard only | Low — read-only |
| 50 | POST | /admin/diseases | **No** | Mongoose schema only | **Critical** — creates records, no body validation |
| 51 | PATCH | /admin/diseases/:id | **No** | Mongoose + `runValidators` | **High** — updates records |
| 52 | DELETE | /admin/diseases/:id | **No** | Auth guard only | **High** — deletes records |

---

## Summary

| Metric | Count |
|---|---|
| **Total routes** | **52** |
| Routes with explicit validation middleware | **0** (0%) |
| Routes relying only on Mongoose schema validation | **52** (100%) |
| Routes with authentication guard only | **33** (admin routes) |
| Routes with no guard at all (public write) | **1** (POST /public/leads) |
| Fully validated routes (request body + params + query) | **0** |

### Risk Breakdown

| Risk Level | Count | Routes |
|---|---|---|
| **Critical** | **7** | All POST endpoints that create records without body validation: `POST /admin/products`, `POST /admin/distributors`, `POST /public/leads`, `POST /admin/testimonials`, `POST /admin/certifications`, `POST /admin/crops`, `POST /admin/diseases` |
| **High** | **9** | All PATCH endpoints + DELETE endpoints: `PATCH /admin/products/:id`, `PATCH /admin/distributors/:id`, `PATCH /admin/leads/:id`, `PATCH /admin/testimonials/:id`, `PATCH /admin/certifications/:id`, `PATCH /admin/crops/:id`, `PATCH /admin/diseases/:id`, `DELETE /admin/products/:id`, `DELETE /admin/distributors/:id` |
| **Low** | **36** | All GET/public read-only endpoints |

### Highest-Risk Endpoints

1. **POST /public/leads** — Public-facing endpoint with no auth and no validation. Anyone can submit arbitrary data.
2. **POST /api/admin/products** — Admin product creation with no body validation. Missing required fields silently create partial documents (only Mongoose `required: true` fields are enforced).
3. **POST /api/admin/distributors** — Distributor creation with nested address object, no validation on the structure.
4. **POST /api/admin/crops** — Crop creation with product references, no validation that referenced IDs exist.
5. **POST /api/admin/diseases** — Same pattern as crops.
6. **POST /api/admin/testimonials** — No validation on rating range beyond Mongoose `min:1, max:5`.
7. **POST /api/admin/certifications** — No date validation on issueDate/expiryDate.

### What Mongoose Schema Validation Catches

| Model | Required Fields | Enum Fields | Other |
|---|---|---|---|
| Product | name, slug, category | status: draft/published/archived | — |
| Distributor | name, company, email, phone, address.city, address.state | status: active/inactive | — |
| Lead | name, email | status: new/contacted/qualified/converted/closed | — |
| Testimonial | customerName, testimonial | status: active/inactive | rating: min 1, max 5 |
| Certification | title | status: active/inactive | — |
| Crop | name | status: active/inactive | — |
| Disease | name | status: active/inactive | — |

### What Mongoose Does NOT Validate

- **Email format** — `Lead.email` and `Distributor.email` have `required: true, lowercase: true, trim: true` but no regex pattern; `"not-an-email"` passes
- **Phone format** — `Distributor.phone` has `required: true` but no format validation
- **String length** — No `maxlength` on most fields (only `Admin.name` has `maxlength: 100`)
- **Object structure** — `Distributor.address` fields are individually defined but no cross-field validation
- **Reference integrity** — `Crop.products`, `Disease.products` accept any ObjectId without checking it exists
- **Date logic** — `Certification.expiryDate` can be before `issueDate`
- **String content** — No regex pattern validation on slugs, URLs, or text fields
- **Arrays** — No `validate` on array contents or size limits
- **JSON body size** — Only limited at Express level (`limit: "10kb"`), no field-level size checks

---

## Recommended Actions

1. **Install a validation library** (joi or express-validator) — not present in `package.json`
2. **Implement validators** for all 10 `src/validators/` files
3. **Wire `validateRequest.js` middleware** into route definitions
4. **Prioritize by risk:** Public POST endpoints first, then admin POST/PATCH, then admin DELETE
5. **Add Mongoose schema enhancements:** email regex patterns, phone format, string maxlengths, reference validation
