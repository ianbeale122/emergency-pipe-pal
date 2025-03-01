import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";

// Get the publishable key from environment
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Create a component that conditionally renders based on whether we have a valid key
const Root = () => {
  // If we don't have a key, render the app without Clerk authentication
  if (!PUBLISHABLE_KEY) {
    console.warn("No Clerk publishable key provided. Authentication features will be disabled.");
    return <App />;
  }

  // Otherwise, wrap the app with ClerkProvider
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
