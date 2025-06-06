
import React, { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { PersonalInfo } from '@/types/cv';
import { Upload, User } from 'lucide-react';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleChange('profilePicture', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const removeProfilePicture = () => {
    handleChange('profilePicture', '');
  };

  return (
    <div className="space-y-4">
      {/* Profile Picture Section */}
      <div className="flex flex-col items-center space-y-3 p-4 border-2 border-dashed border-gray-300 rounded-lg">
        <Avatar className="h-24 w-24">
          {data.profilePicture ? (
            <AvatarImage src={data.profilePicture} alt="Profile" />
          ) : (
            <AvatarFallback>
              <User className="h-12 w-12 text-gray-400" />
            </AvatarFallback>
          )}
        </Avatar>
        
        <div className="flex gap-2">
          <Button onClick={triggerFileUpload} size="sm" variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload Photo
          </Button>
          {data.profilePicture && (
            <Button onClick={removeProfilePicture} size="sm" variant="ghost" className="text-red-500">
              Remove
            </Button>
          )}
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        
        <p className="text-xs text-gray-500 text-center">
          Upload a professional headshot (JPG, PNG, max 5MB)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="John Doe"
          />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john.doe@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={data.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="New York, NY"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="linkedin">LinkedIn Profile</Label>
          <Input
            id="linkedin"
            value={data.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
        <div>
          <Label htmlFor="website">Website/Portfolio</Label>
          <Input
            id="website"
            value={data.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="www.johndoe.com"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="summary">Professional Summary *</Label>
        <Textarea
          id="summary"
          value={data.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="A brief 2-3 sentence summary of your career goals and experience..."
          rows={4}
        />
        <p className="text-xs text-gray-500 mt-1">
          Keep it concise and highlight your key achievements and career objectives.
        </p>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
