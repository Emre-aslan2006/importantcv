
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Education } from '@/types/cv';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ data, onChange }) => {
  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      graduationYear: '',
      gpa: '',
      honors: ''
    };
    onChange([...data, newEdu]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(data.map(edu => edu.id === id ? { ...edu, [field]: value } : edu));
  };

  const removeEducation = (id: string) => {
    onChange(data.filter(edu => edu.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center">
          <GraduationCap className="h-5 w-5 mr-2" />
          Education
        </h3>
        <Button onClick={addEducation} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </div>

      {data.length === 0 && (
        <Card className="p-6 text-center text-gray-500">
          <GraduationCap className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p>No education added yet.</p>
          <p className="text-sm">Click "Add Education" to get started.</p>
        </Card>
      )}

      {data.map((edu, index) => (
        <Card key={edu.id} className="p-4 border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-medium">Education #{index + 1}</h4>
            <Button
              onClick={() => removeEducation(edu.id)}
              size="sm"
              variant="ghost"
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label>Degree *</Label>
              <Input
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                placeholder="Bachelor of Science in Computer Science"
              />
            </div>
            <div>
              <Label>Institution *</Label>
              <Input
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                placeholder="University of California, Berkeley"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Graduation Year *</Label>
              <Input
                value={edu.graduationYear}
                onChange={(e) => updateEducation(edu.id, 'graduationYear', e.target.value)}
                placeholder="2023"
              />
            </div>
            <div>
              <Label>GPA (Optional)</Label>
              <Input
                value={edu.gpa || ''}
                onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                placeholder="3.8/4.0"
              />
            </div>
            <div>
              <Label>Honors (Optional)</Label>
              <Input
                value={edu.honors || ''}
                onChange={(e) => updateEducation(edu.id, 'honors', e.target.value)}
                placeholder="Magna Cum Laude"
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default EducationForm;
