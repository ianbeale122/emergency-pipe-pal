
import { PhoneCall } from "lucide-react";

export const EmergencyButton = () => {
  return (
    <a href="tel:+1234567890" className="emergency-button animate-fade-in">
      <PhoneCall className="h-5 w-5" />
      <span className="font-semibold">Emergency Call</span>
    </a>
  );
};
