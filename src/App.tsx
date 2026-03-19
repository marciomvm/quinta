import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ProductsProvider } from "@/contexts/ProductsContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Index from "./pages/Index";
import OurTools from "./pages/OurTools";
import HireTerms from "./pages/HireTerms";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <ProductsProvider>
          <SettingsProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Admin — standalone, no shared Header/Footer */}
              <Route path="/admin" element={<Admin />} />

              {/* Public pages — with shared Header/Footer */}
              <Route
                path="*"
                element={
                  <>
                    <Header />
                    <main className="min-h-[calc(100vh-4rem)]">
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/tools" element={<OurTools />} />
                        <Route path="/hire-terms" element={<HireTerms />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                    <Footer />
                    <WhatsAppButton />
                  </>
                }
              />
            </Routes>
          </BrowserRouter>
          </SettingsProvider>
        </ProductsProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
