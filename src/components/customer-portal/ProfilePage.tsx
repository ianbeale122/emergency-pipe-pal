
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DocumentUploadSection from "./DocumentUploadSection";
import ProfileHeader from "./ProfileHeader";
import ProfileForm from "./ProfileForm";
import { useProfileForm } from "./useProfileForm";

interface ProfilePageProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  onProfileUpdate: (updatedProfile: UpdatedProfileData) => void;
}

export interface UpdatedProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  propertyDetails: string;
}

const ProfilePage = ({ user, onProfileUpdate }: ProfilePageProps) => {
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
        isEditing={isEditing} 
        onEditClick={() => setIsEditing(true)} 
      />

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            {isEditing 
              ? "Make changes to your profile information below" 
              : "Your account details and preferences"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm
            formData={formData}
            isEditing={isEditing}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            user={user}
          />
        </CardContent>
      </Card>
      
      {/* Add Document Upload Section */}
      <DocumentUploadSection customerId={user?.email || 'guest'} />
    </div>
  );
};

export default ProfilePage;
