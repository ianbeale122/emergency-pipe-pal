
import { 
  ShieldCheck, 
  Calendar, 
  Receipt, 
  Building 
} from "lucide-react";

// Mock data for certificates and invoices
export const mockCertificates = [
  { id: "GC-2023-001", name: "Gas Safety Certificate", date: "2023-10-15", expires: "2024-10-15", property: "123 Oak Street, London", status: "Valid" },
  { id: "GC-2023-002", name: "Boiler Service Certificate", date: "2023-11-20", expires: "2024-11-20", property: "123 Oak Street, London", status: "Valid" },
  { id: "GC-2022-003", name: "Gas Safety Certificate", date: "2022-10-10", expires: "2023-10-10", property: "123 Oak Street, London", status: "Expired" },
  { id: "GC-2023-004", name: "Electrical Safety Certificate", date: "2023-09-05", expires: "2024-09-05", property: "123 Oak Street, London", status: "Valid" },
];

export const mockInvoices = [
  { id: "INV-2023-001", description: "Annual Boiler Service", date: "2023-10-15", amount: 120.00, status: "Paid" },
  { id: "INV-2023-002", description: "Emergency Callout - Leak Fix", date: "2023-11-20", amount: 180.00, status: "Paid" },
  { id: "INV-2023-003", description: "Bathroom Sink Installation", date: "2023-12-05", amount: 350.00, status: "Pending" },
  { id: "INV-2024-001", description: "Radiator Replacement", date: "2024-01-15", amount: 420.00, status: "Overdue" },
  { id: "INV-2024-002", description: "Quarterly Maintenance Visit", date: "2024-03-10", amount: 95.00, status: "Pending" },
  { id: "INV-2024-003", description: "Water Heater Installation", date: "2024-02-28", amount: 580.00, status: "Paid" },
];

// Mock FAQ videos
export const mockFaqVideos = [
  { id: 1, title: "How to Bleed a Radiator", thumbnail: "https://images.unsplash.com/photo-1581092242409-b27d24be9536", duration: "4:32", category: "Heating" },
  { id: 2, title: "Fixing a Dripping Tap", thumbnail: "https://images.unsplash.com/photo-1540587659271-5a67befab240", duration: "6:15", category: "Plumbing" },
  { id: 3, title: "Unblocking a Sink", thumbnail: "https://images.unsplash.com/photo-1540518614846-7eded433c457", duration: "5:47", category: "Plumbing" },
  { id: 4, title: "Boiler Pressure Guide", thumbnail: "https://images.unsplash.com/photo-1524270000-94f8ff3b8ff2", duration: "8:22", category: "Heating" },
  { id: 5, title: "Thermostat Programming", thumbnail: "https://images.unsplash.com/photo-1606818716364-2c1126e0104f", duration: "7:18", category: "Heating" },
  { id: 6, title: "Toilet Cistern Repairs", thumbnail: "https://images.unsplash.com/photo-1533749047139-189de3cf06d3", duration: "9:45", category: "Plumbing" },
];

// Statistics for the dashboard
export const mockStats = [
  { label: "Active Certificates", value: 3, icon: ShieldCheck, color: "text-green-500" },
  { label: "Upcoming Renewals", value: 1, icon: Calendar, color: "text-amber-500" },
  { label: "Pending Invoices", value: 2, icon: Receipt, color: "text-blue-500" },
  { label: "Total Properties", value: 1, icon: Building, color: "text-purple-500" },
];
