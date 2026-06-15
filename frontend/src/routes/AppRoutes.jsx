import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "../components/layout/PublicLayout.jsx";
import HomePage from "../pages/public/HomePage.jsx";
import BlogPage from "../pages/public/BlogPage.jsx";
import BlogDetailPage from "../pages/public/BlogDetailPage.jsx";
import CategoriesPage from "../pages/public/CategoriesPage.jsx";
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
import DashboardPage from "../pages/admin/DashboardPage.jsx";
import BlogManagePage from "../pages/admin/BlogManagePage.jsx";
import CategoriesManagePage from "../pages/admin/CategoriesManagePage.jsx";
import CertificationsManagePage from "../pages/admin/CertificationsManagePage.jsx";
import CropsManagePage from "../pages/admin/CropsManagePage.jsx";
import DiseasesManagePage from "../pages/admin/DiseasesManagePage.jsx";
import DistributorsManagePage from "../pages/admin/DistributorsManagePage.jsx";
import LeadsManagePage from "../pages/admin/LeadsManagePage.jsx";
import ProductsManagePage from "../pages/admin/ProductsManagePage.jsx";
import SettingsPage from "../pages/admin/SettingsPage.jsx";
import TestimonialsManagePage from "../pages/admin/TestimonialsManagePage.jsx";

function AdminShell({ children }) {
  return <main className="page-container">{children}</main>;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:id" element={<BlogDetailPage />} />
        <Route path="categories" element={<CategoriesPage />} />
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
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="state-products" element={<StateProductsPage />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
      </Route>

      <Route path="/admin" element={<AdminShell><DashboardPage /></AdminShell>}>
        <Route index element={<DashboardPage />} />
        <Route path="blog" element={<BlogManagePage />} />
        <Route path="categories" element={<CategoriesManagePage />} />
        <Route path="certifications" element={<CertificationsManagePage />} />
        <Route path="crops" element={<CropsManagePage />} />
        <Route path="diseases" element={<DiseasesManagePage />} />
        <Route path="distributors" element={<DistributorsManagePage />} />
        <Route path="leads" element={<LeadsManagePage />} />
        <Route path="products" element={<ProductsManagePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="testimonials" element={<TestimonialsManagePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
