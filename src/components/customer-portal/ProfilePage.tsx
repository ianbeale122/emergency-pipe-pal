
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useProfileForm } from "./useProfileForm";
import ProfileHeader from "./ProfileHeader";
import ProfileForm from "./ProfileForm";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";

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
      
      <Card>
        <CardHeader>
          <CardTitle>Admin Access</CardTitle>
          <CardDescription>
            Access the admin portal to manage customers and documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={goToAdminPortal}
            className="flex items-center gap-2"
          >
            <Shield className="h-4 w-4" />
            Access Admin Portal
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
