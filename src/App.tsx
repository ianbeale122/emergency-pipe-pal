
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";
import LiveChat from "./pages/LiveChat";
import AnnualService from "./pages/AnnualService";
import Emergency from "./pages/Emergency";
import CustomerPortal from "./pages/CustomerPortal";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/chat" element={<LiveChat />} />
          <Route path="/annual-service" element={<AnnualService />} />
          <Route path="/emergency" element={<Emergency />} />
          
          {/* Protected Customer Portal Route */}
          <Route 
            path="/customer-portal" 
            element={
              <>
                <SignedIn>
                  <CustomerPortal />
                </SignedIn>
                <SignedOut>
                  <Navigate to="/" replace />
                </SignedOut>
              </>
            } 
          />
          
          {/* Auth Routes */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
