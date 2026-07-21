import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "../components/layout/PublicLayout.jsx";
import HomePage from "../pages/public/HomePage.jsx";
import AboutPage from "../pages/public/AboutPage.jsx";
import BlogPage from "../pages/public/BlogPage.jsx";
import BlogDetailPage from "../pages/public/BlogDetailPage.jsx";
import CertificationsPage from "../pages/public/CertificationsPage.jsx";
import ContactPage from "../pages/public/ContactPage.jsx";
import CropDiscoveryPage from "../pages/public/CropDiscoveryPage.jsx";
import CropProductsPage from "../pages/public/CropProductsPage.jsx";
import CropDetailPage from "../pages/public/CropDetailPage.jsx";
import DiseaseDiscoveryPage from "../pages/public/DiseaseDiscoveryPage.jsx";
import DiseaseProductsPage from "../pages/public/DiseaseProductsPage.jsx";
import DiseaseDetailPage from "../pages/public/DiseaseDetailPage.jsx";
import DistributorLocatorPage from "../pages/public/DistributorLocatorPage.jsx";
import ProductsPage from "../pages/public/ProductsPage.jsx";
import ProductDetailPage from "../pages/public/ProductDetailPage.jsx";
import StateProductsPage from "../pages/public/StateProductsPage.jsx";
import TestimonialsPage from "../pages/public/TestimonialsPage.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import AdminLogin from "../pages/admin/AdminLogin.jsx";
import DashboardPage from "../pages/admin/DashboardPage.jsx";
import BlogManagePage from "../pages/admin/BlogManagePage.jsx";
import CategoriesManagePage from "../pages/admin/CategoriesManagePage.jsx";
import CertificationsManagePage from "../pages/admin/CertificationsManagePage.jsx";
import CropsManagePage from "../pages/admin/CropsManagePage.jsx";
import DiseasesManagePage from "../pages/admin/DiseasesManagePage.jsx";
import DistributorsManagePage from "../pages/admin/DistributorsManagePage.jsx";
import DistributorFormPage from "../pages/admin/DistributorFormPage.jsx";
import LeadsManagePage from "../pages/admin/LeadsManagePage.jsx";
import ProductsManagePage from "../pages/admin/ProductsManagePage.jsx";
import ProductFormPage from "../pages/admin/ProductFormPage.jsx";
import SettingsPage from "../pages/admin/SettingsPage.jsx";
import WebsiteSettingsPage from "../pages/admin/WebsiteSettingsPage.jsx";
import AdminManagePage from "../pages/admin/AdminManagePage.jsx";
import AdminFormPage from "../pages/admin/AdminFormPage.jsx";
import TestimonialsManagePage from "../pages/admin/TestimonialsManagePage.jsx";
import TestimonialFormPage from "../pages/admin/TestimonialFormPage.jsx";
import CertificationFormPage from "../pages/admin/CertificationFormPage.jsx";
import CropFormPage from "../pages/admin/CropFormPage.jsx";
import DiseaseFormPage from "../pages/admin/DiseaseFormPage.jsx";
import NotFoundPage from "../pages/public/NotFoundPage.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:id" element={<BlogDetailPage />} />
        <Route path="certifications" element={<CertificationsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="crops" element={<CropDiscoveryPage />} />
        <Route path="crops/products" element={<CropProductsPage />} />
        <Route path="crops/:id" element={<CropDetailPage />} />
        <Route path="diseases" element={<DiseaseDiscoveryPage />} />
        <Route path="diseases/products" element={<DiseaseProductsPage />} />
        <Route path="diseases/:id" element={<DiseaseDetailPage />} />
        <Route path="distributors" element={<DistributorLocatorPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:slug" element={<ProductDetailPage />} />
        <Route path="state-products" element={<StateProductsPage />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Protected Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="blog" element={<BlogManagePage />} />
        <Route path="categories" element={<CategoriesManagePage />} />
        <Route path="certifications" element={<CertificationsManagePage />} />
        <Route path="certifications/new" element={<CertificationFormPage />} />
        <Route path="certifications/:id/edit" element={<CertificationFormPage />} />
        <Route path="crops" element={<CropsManagePage />} />
        <Route path="crops/new" element={<CropFormPage />} />
        <Route path="crops/:id/edit" element={<CropFormPage />} />
        <Route path="diseases" element={<DiseasesManagePage />} />
        <Route path="diseases/new" element={<DiseaseFormPage />} />
        <Route path="diseases/:id/edit" element={<DiseaseFormPage />} />
        <Route path="distributors" element={<DistributorsManagePage />} />
        <Route path="distributors/new" element={<DistributorFormPage />} />
        <Route path="distributors/:id/edit" element={<DistributorFormPage />} />
        <Route path="leads" element={<LeadsManagePage />} />
        <Route path="products" element={<ProductsManagePage />} />
        <Route path="products/new" element={<ProductFormPage />} />
        <Route path="products/:id/edit" element={<ProductFormPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="website-settings" element={<WebsiteSettingsPage />} />
          <Route path="admins" element={<AdminManagePage />} />
          <Route path="admins/new" element={<AdminFormPage />} />
          <Route path="admins/:id/edit" element={<AdminFormPage />} />
          <Route path="testimonials" element={<TestimonialsManagePage />} />
        <Route path="testimonials/new" element={<TestimonialFormPage />} />
        <Route path="testimonials/:id/edit" element={<TestimonialFormPage />} />
      </Route>

    </Routes>
  );
}
