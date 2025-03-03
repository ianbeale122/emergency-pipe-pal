
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";
import LiveChat from "./pages/LiveChat";
import AnnualService from "./pages/AnnualService";
import Emergency from "./pages/Emergency";
import CustomerPortal from "./pages/CustomerPortal";
import AdminPortal from "./pages/AdminPortal";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const queryClient = new QueryClient();

// Check if Clerk is available using a safer approach
const isClerkAvailable = () => {
  try {
    return typeof window !== 'undefined' && 'Clerk' in window;
  } catch (e) {
    return false;
  }
};

const App = () => {
  // Determine if Clerk is available
  const clerkAvailable = isClerkAvailable();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/chat" element={<LiveChat />} />
            <Route path="/annual-service" element={<AnnualService />} />
            <Route path="/emergency" element={<Emergency />} />
            
            {/* Protected Customer Portal Route - conditionally render based on Clerk availability */}
            <Route 
              path="/customer-portal" 
              element={
                clerkAvailable ? (
                  <>
                    <SignedIn>
                      <CustomerPortal />
                    </SignedIn>
                    <SignedOut>
                      <Navigate to="/" replace />
                    </SignedOut>
                  </>
                ) : (
                  // If Clerk is not available, just show the portal without auth
                  <CustomerPortal />
                )
              } 
            />
            
            {/* Admin Portal Route */}
            <Route path="/admin" element={<AdminPortal />} />
            
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
};

export default App;
