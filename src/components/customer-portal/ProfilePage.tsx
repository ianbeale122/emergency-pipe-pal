
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
          {user?.email === "beale122@gmail.com" && (
            <p className="text-indigo-300 text-xs mt-2 text-center">
              You have admin privileges
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
