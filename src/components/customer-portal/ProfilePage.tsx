
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useProfileForm } from "./useProfileForm";
import ProfileHeader from "./ProfileHeader";
import ProfileForm from "./ProfileForm";
import { useNavigate } from "react-router-dom";
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
    </div>
  );
};

export default ProfilePage;
