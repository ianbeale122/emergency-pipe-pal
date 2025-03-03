
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useProfileForm } from "./useProfileForm";
import ProfileHeader from "./ProfileHeader";
import ProfileForm from "./ProfileForm";
import { useNavigate } from "react-router-dom";
import { Shield, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export interface UpdatedProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  propertyDetails: string;
}

interface ProfilePageProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  onProfileUpdate: (updatedProfile: UpdatedProfileData) => void;
}

const ProfilePage = ({ user, onProfileUpdate }: ProfilePageProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const {
    formData,
    isEditing,
    setIsEditing,
    handleInputChange,
    handleSubmit,
    handleCancel
  } = useProfileForm({ user, onProfileUpdate });

  const goToAdminPortal = () => {
    // Clear any existing admin auth to force login screen
    localStorage.removeItem("adminAuth");
    
    // Store user info to pre-fill admin login form
    if (user && user.email === "beale122@gmail.com") {
      localStorage.setItem("adminEmail", user.email);
      
      toast({
        title: "Redirecting to admin portal",
        description: "Use your customer portal credentials to log in",
      });
    }
    
    // Use window.location instead of navigate to ensure full page reload
    window.location.href = '/admin';
  };

  const isAdmin = user?.email === "beale122@gmail.com";

  return (
    <div className="space-y-6">
      <ProfileHeader 
        firstName={user?.firstName || ""} 
        lastName={user?.lastName || ""} 
        email={user?.email || ""}
        isEditing={isEditing}
        onEditClick={() => setIsEditing(true)}
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your profile information and manage your account settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm
            formData={formData}
            isEditing={isEditing}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            onEdit={() => setIsEditing(true)}
          />
        </CardContent>
      </Card>
      
      {/* Enhanced Admin Access Card */}
      {isAdmin && (
        <Card className="border-indigo-400 bg-gradient-to-r from-slate-900 to-indigo-950 shadow-lg">
          <CardHeader className="border-b border-indigo-800/30">
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-400" fill="#9b87f5" />
              Admin Access
            </CardTitle>
            <CardDescription className="text-indigo-300">
              Access the admin portal to manage customers and documents
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Button 
              onClick={goToAdminPortal}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white border border-indigo-500 shadow-md flex items-center justify-center gap-2"
              size="lg"
            >
              <Shield className="h-5 w-5" />
              Access Admin Portal
              <ExternalLink className="h-4 w-4 ml-1 opacity-70" />
            </Button>
            <p className="text-indigo-300 text-xs mt-2 text-center">
              You have admin privileges
            </p>
          </CardContent>
        </Card>
      )}
      
      {/* Floating Admin Button (Mobile Only) */}
      {isAdmin && (
        <div className="fixed bottom-20 right-4 md:hidden z-40">
          <Button
            onClick={goToAdminPortal}
            size="lg"
            className="rounded-full h-14 w-14 p-0 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg border-2 border-indigo-400"
          >
            <Shield className="h-6 w-6" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
