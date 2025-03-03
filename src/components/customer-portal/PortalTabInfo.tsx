
import React from "react";

interface PortalTabInfoProps {
  activeTab: "login" | "register";
}

const PortalTabInfo = ({ activeTab }: PortalTabInfoProps) => {
  return (
    <div className="mt-6 text-center text-sm text-muted-foreground">
      <p>
        {activeTab === "login" 
          ? "Login to access your certificates, invoices, and service history." 
          : "Register to easily manage your certificates and invoices."}
      </p>
    </div>
  );
};

export default PortalTabInfo;
