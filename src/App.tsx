import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import UserSelect from "./pages/UserSelect";
import DonorLogin from "./pages/DonorLogin";
import DonorDashboard from "./pages/DonorDashboard";
import PromoterLogin from "./pages/PromoterLogin";
import PromoterDashboard from "./pages/PromoterDashboard";
import AboutUs from "./pages/AboutUs";
import FAQ from "./pages/FAQ";
import Policies from "./pages/Policies";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/user-select" element={<UserSelect />} />
          <Route path="/donor-login" element={<DonorLogin />} />
          <Route path="/donor-dashboard" element={<DonorDashboard />} />
          <Route path="/promoter-login" element={<PromoterLogin />} />
          <Route path="/promoter-dashboard" element={<PromoterDashboard />} />
          <Route path="/sobre-nosotros" element={<AboutUs />} />
          <Route path="/preguntas" element={<FAQ />} />
          <Route path="/politicas" element={<Policies />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
