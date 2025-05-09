
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import StudentDiscountPage from "./pages/StudentDiscountPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminUploadProduct from "./pages/admin/AdminUploadProduct";
import AdminWishlist from "./pages/admin/AdminWishlist";
import AdminInventory from "./pages/admin/AdminInventory";
import AdminSizeEstimator from "./pages/admin/AdminSizeEstimator";
import AdminThemeCustomizer from "./pages/admin/AdminThemeCustomizer";
import AdminStats from "./pages/admin/AdminStats";
import AdminRatingsReviews from "./pages/admin/AdminRatingsReviews";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/student-discount" element={<StudentDiscountPage />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/products" element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
              <Route path="/admin/upload-product" element={<ProtectedRoute><AdminUploadProduct /></ProtectedRoute>} />
              <Route path="/admin/wishlist" element={<ProtectedRoute><AdminWishlist /></ProtectedRoute>} />
              <Route path="/admin/inventory" element={<ProtectedRoute><AdminInventory /></ProtectedRoute>} />
              <Route path="/admin/size-estimator" element={<ProtectedRoute><AdminSizeEstimator /></ProtectedRoute>} />
              <Route path="/admin/theme" element={<ProtectedRoute><AdminThemeCustomizer /></ProtectedRoute>} />
              <Route path="/admin/stats" element={<ProtectedRoute><AdminStats /></ProtectedRoute>} />
              <Route path="/admin/ratings" element={<ProtectedRoute><AdminRatingsReviews /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
