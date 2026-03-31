import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import AdminLayout from "@/components/AdminLayout";
import Index from "./pages/Index";
import CatalogPage from "./pages/CatalogPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminSignupPage from "./pages/AdminSignupPage";
import AboutPage from "./pages/AboutPage";
import MemberDashboard from "./pages/MemberDashboard";
import BookReaderPage from "./pages/BookReaderPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBooks from "./pages/admin/AdminBooks";
import AdminMembers from "./pages/admin/AdminMembers";
import AdminIssues from "./pages/admin/AdminIssues";
import AdminAuthors from "./pages/admin/AdminAuthors";
import AdminPublishers from "./pages/admin/AdminPublishers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin/signup" element={<AdminSignupPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/dashboard" element={<MemberDashboard />} />
            <Route path="/read/:bookId" element={<BookReaderPage />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="books" element={<AdminBooks />} />
            <Route path="members" element={<AdminMembers />} />
            <Route path="issues" element={<AdminIssues />} />
            <Route path="authors" element={<AdminAuthors />} />
            <Route path="publishers" element={<AdminPublishers />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
