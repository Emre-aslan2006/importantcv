
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Education } from '@/types/cv';
import { Plus, Trash2, GraduationCap, AlertTriangle, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ data, onChange }) => {
  const { toast } = useToast();

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      startYear: '',
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

  const validateYear = (year: string): { isValid: boolean; message?: string } => {
    if (!year) return { isValid: true };
    
    const yearNum = parseInt(year);
    const currentYear = new Date().getFullYear();
    
    if (isNaN(yearNum)) {
      return { isValid: false, message: 'Please enter a valid year' };
    }
    
    if (yearNum < 1950) {
      return { isValid: false, message: 'Year seems too early (before 1950)' };
    }
    
    if (yearNum > currentYear + 10) {
      return { isValid: false, message: 'Year seems too far in the future' };
    }
    
    return { isValid: true };
  };

  const validateEducationDates = (edu: Education): { isValid: boolean; message?: string } => {
    if (!edu.startYear || !edu.graduationYear) return { isValid: true };
    
    const startYear = parseInt(edu.startYear);
    const gradYear = parseInt(edu.graduationYear);
    
    if (isNaN(startYear) || isNaN(gradYear)) {
      return { isValid: false, message: 'Please enter valid years' };
    }
    
    if (startYear >= gradYear) {
      return { isValid: false, message: 'Graduation year must be after start year' };
    }
    
    if (gradYear - startYear > 15) {
      return { isValid: false, message: 'Education duration seems too long (>15 years)' };
    }
    
    return { isValid: true };
  };

  const handleYearChange = (id: string, field: 'startYear' | 'graduationYear', value: string) => {
    updateEducation(id, field, value);
    
    // Validate the year
    const yearValidation = validateYear(value);
    if (!yearValidation.isValid && value) {
      toast({
        title: "Invalid Year",
        description: yearValidation.message,
        variant: "destructive",
      });
    }
    
    // Validate date range if both dates are present
    const edu = data.find(e => e.id === id);
    if (edu) {
      const updatedEdu = { ...edu, [field]: value };
      const dateValidation = validateEducationDates(updatedEdu);
      if (!dateValidation.isValid && updatedEdu.startYear && updatedEdu.graduationYear) {
        toast({
          title: "Date Range Issue",
          description: dateValidation.message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center">
          <GraduationCap className="h-5 w-5 mr-2" />
          Education
        </h3>
        <Button onClick={addEducation} size="sm" variant="outline" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </div>

      {data.length === 0 && (
        <Card className="p-8 text-center text-gray-500 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
          <GraduationCap className="h-16 w-16 mx-auto mb-4 text-blue-300" />
          <h4 className="text-lg font-medium mb-2">No Education Added Yet</h4>
          <p className="text-sm">Add your educational background to strengthen your CV.</p>
          <p className="text-xs mt-2 text-blue-600">Universities, colleges, certifications, and professional courses</p>
        </Card>
      )}

      {data.map((edu, index) => {
        const startYearValidation = validateYear(edu.startYear);
        const gradYearValidation = validateYear(edu.graduationYear);
        const dateRangeValidation = validateEducationDates(edu);
        
        return (
          <Card key={edu.id} className="p-6 border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-semibold text-lg">Education #{index + 1}</h4>
              <Button
                onClick={() => removeEducation(edu.id)}
                size="sm"
                variant="ghost"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label className="text-sm font-medium">Degree/Program *</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Institution *</Label>
                <Input
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                  placeholder="University of California, Berkeley"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label className="text-sm font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Start Year *
                </Label>
                <Input
                  type="number"
                  value={edu.startYear}
                  onChange={(e) => handleYearChange(edu.id, 'startYear', e.target.value)}
                  placeholder="2019"
                  min="1950"
                  max={new Date().getFullYear() + 10}
                  className={`mt-1 ${!startYearValidation.isValid && edu.startYear ? 'border-red-500' : ''}`}
                />
                {!startYearValidation.isValid && edu.startYear && (
                  <div className="flex items-center mt-1 text-red-500 text-xs">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {startYearValidation.message}
                  </div>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Graduation Year *
                </Label>
                <Input
                  type="number"
                  value={edu.graduationYear}
                  onChange={(e) => handleYearChange(edu.id, 'graduationYear', e.target.value)}
                  placeholder="2023"
                  min="1950"
                  max={new Date().getFullYear() + 10}
                  className={`mt-1 ${!gradYearValidation.isValid && edu.graduationYear ? 'border-red-500' : ''}`}
                />
                {!gradYearValidation.isValid && edu.graduationYear && (
                  <div className="flex items-center mt-1 text-red-500 text-xs">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {gradYearValidation.message}
                  </div>
                )}
              </div>
            </div>

            {!dateRangeValidation.isValid && edu.startYear && edu.graduationYear && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center text-red-600 dark:text-red-400 text-sm">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  {dateRangeValidation.message}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">GPA (Optional)</Label>
                <Input
                  value={edu.gpa || ''}
                  onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                  placeholder="3.8/4.0 or 85%"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Honors/Awards (Optional)</Label>
                <Input
                  value={edu.honors || ''}
                  onChange={(e) => updateEducation(edu.id, 'honors', e.target.value)}
                  placeholder="Magna Cum Laude, Dean's List"
                  className="mt-1"
                />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default EducationForm;
