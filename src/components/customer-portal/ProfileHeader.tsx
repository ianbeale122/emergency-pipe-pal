
import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
  firstName: string;
  lastName: string;
  email: string;
  isEditing: boolean;
  onEditClick: () => void;
}

const ProfileHeader = ({ firstName, lastName, email, isEditing, onEditClick }: ProfileHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">Your Profile</h2>
        <p className="text-sm text-muted-foreground">
          Manage your personal information and contact details
        </p>
      </div>
      {!isEditing && (
        <Button 
          onClick={onEditClick}
          variant="outline"
        >
          Edit Profile
        </Button>
      )}
    </div>
  );
};

export default ProfileHeader;
