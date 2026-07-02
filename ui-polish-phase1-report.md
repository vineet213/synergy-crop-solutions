# UI Polish — Phase 1 Report

## Summary

Completed 6 improvements targeting layout, navigation, loading UX, and AdminLogin styling.

## Changes

### 1. Utility CSS classes for admin pages
**File:** `frontend/src/styles/main.css`

Added `.admin-login-*` class family covering the full login form (wrapper, card, header, error banner, field, label, input wrapper, icon positioning, error state, submit button, footer). Published alongside the existing `.card-shell` / `.button-base` system. These replace all Tailwind utility dependencies previously baked into `AdminLogin.jsx`.

### 2. AdminLogin rewritten — no Tailwind utilities
**File:** `frontend/src/pages/admin/AdminLogin.jsx`

Before: inline Tailwind (`min-h-screen`, `bg-gradient-to-br`, `from-green-50`, `to-blue-50`, `sm:`, `md:`, spacing, flex, etc.). After: pure project CSS classes (`admin-login-wrapper`, `admin-login-card`, `admin-login-input`, `button-base button-primary`, etc.) with Lucide icons. Zero Tailwind dependencies. Build passes.

### 3. Phantom "Users" nav link removed
**File:** `frontend/src/layouts/AdminLayout.jsx`

The admin sidebar referenced a `/admin/users` route that exists in `AppRoutes.jsx` but has **no** page file (`UsersPage.jsx` was never created). Removed the nav link and its `Users` icon import to prevent 404 dead-ends.

### 4. Hero panel responsive layout fix
**File:** `frontend/src/styles/main.css`

The hero panel was set to `grid-template-columns: 1fr 1fr` on the same line as other hero styles. Since CSS cascade layers it after the base hero style, but there was **no** mobile override, the two-column layout persisted on small screens. Added `@media (max-width: 1100px) { .hero-panel { grid-template-columns: 1fr } }` — matching the real breakpoint in the section padding block. Also ensured `.section-block` padding reduces to `3rem 0` below 900px.

### 5. Pill overflow scroll on mobile
**File:** `frontend/src/styles/main.css`

The product category row (`filter-pill` row) now uses `flex-wrap: nowrap` + `overflow-x: auto` below 720px, with a hidden scrollbar. This prevents the pills from wrapping awkwardly on narrow screens and makes them swipeable.

### 6. Loading states for HomePage sections
**File:** `frontend/src/pages/public/HomePage.jsx`

Before: all 4 `useEffect` hooks used `.catch(console.error)` with no loading indicator. After: each section tracks its own `loading.{section}` boolean and renders skeleton cards (`skeleton-block`, `skeleton-title`, `skeleton-line`) while data loads. Sections appear independently as they resolve.

## Files Changed

| File | Change |
|------|--------|
| `frontend/src/styles/main.css` | Added admin-login classes, hero mobile breakpoint, pill overflow |
| `frontend/src/pages/admin/AdminLogin.jsx` | Rewritten — no Tailwind utilities |
| `frontend/src/layouts/AdminLayout.jsx` | Removed Users nav link + icon import |
| `frontend/src/pages/public/HomePage.jsx` | Added per-section loading states + skeleton UI |

## Verification

- `npm run build` passes (1679 modules, no warnings/errors)
- Built CSS confirmed: admin-login classes included, skeleton classes included
- No remaining Tailwind utility strings in touched files
