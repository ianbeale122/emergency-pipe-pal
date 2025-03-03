
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, MapPin, Building } from "lucide-react";
import { UpdatedProfileData } from "./ProfilePage";

interface ProfileFormProps {
  formData: UpdatedProfileData;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  onEdit: () => void;
}

const ProfileForm = ({ 
  formData, 
  isEditing, 
  onInputChange, 
  onSubmit, 
  onCancel,
  onEdit
}: ProfileFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            First Name
          </Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={onInputChange}
            readOnly={!isEditing}
            className={!isEditing ? "bg-muted cursor-not-allowed" : ""}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName" className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            Last Name
          </Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={onInputChange}
            readOnly={!isEditing}
            className={!isEditing ? "bg-muted cursor-not-allowed" : ""}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          Email Address
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onInputChange}
          readOnly={!isEditing}
          className={!isEditing ? "bg-muted cursor-not-allowed" : ""}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone" className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          Phone Number
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={onInputChange}
          readOnly={!isEditing}
          className={!isEditing ? "bg-muted cursor-not-allowed" : ""}
          placeholder={!isEditing && !formData.phone ? "No phone number provided" : ""}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address" className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          Address
        </Label>
        <Textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={onInputChange}
          readOnly={!isEditing}
          className={!isEditing ? "bg-muted cursor-not-allowed resize-none" : "resize-none"}
          placeholder={!isEditing && !formData.address ? "No address provided" : ""}
          rows={2}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="propertyDetails" className="flex items-center gap-2">
          <Building className="h-4 w-4 text-muted-foreground" />
          Property Details
        </Label>
        <Textarea
          id="propertyDetails"
          name="propertyDetails"
          value={formData.propertyDetails}
          onChange={onInputChange}
          readOnly={!isEditing}
          className={!isEditing ? "bg-muted cursor-not-allowed resize-none" : "resize-none"}
          placeholder={!isEditing && !formData.propertyDetails ? "No property details provided" : ""}
          rows={3}
        />
      </div>
      
      {isEditing && (
        <div className="flex justify-end gap-2 pt-2">
          <Button 
            type="button" 
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      )}
    </form>
  );
};

export default ProfileForm;
