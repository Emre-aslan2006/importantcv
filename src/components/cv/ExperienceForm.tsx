
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Experience } from '@/types/cv';
import { Plus, Trash2, Briefcase, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, onChange }) => {
  const { toast } = useToast();

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      achievements: ['']
    };
    onChange([...data, newExp]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange(data.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  };

  const removeExperience = (id: string) => {
    onChange(data.filter(exp => exp.id !== id));
  };

  const validateDateRange = (exp: Experience): { isValid: boolean; message?: string } => {
    // Don't validate if dates are empty or incomplete
    if (!exp.startDate || (!exp.endDate && !exp.current)) {
      return { isValid: true };
    }
    
    try {
      // Parse dates properly from YYYY-MM format
      const [startYear, startMonth] = exp.startDate.split('-').map(Number);
      
      if (!startYear || !startMonth || startMonth < 1 || startMonth > 12) {
        return { isValid: false, message: 'Please enter a valid start date' };
      }
      
      const startDate = new Date(startYear, startMonth - 1, 1);
      
      if (exp.current) {
        // If current job, just check if start date is reasonable
        const currentDate = new Date();
        const yearsDiff = (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
        
        if (startDate > currentDate) {
          return { isValid: false, message: 'Start date cannot be in the future' };
        }
        
        if (yearsDiff > 50) {
          return { isValid: false, message: 'Work duration seems too long (>50 years)' };
        }
      } else if (exp.endDate) {
        const [endYear, endMonth] = exp.endDate.split('-').map(Number);
        
        if (!endYear || !endMonth || endMonth < 1 || endMonth > 12) {
          return { isValid: false, message: 'Please enter a valid end date' };
        }
        
        const endDate = new Date(endYear, endMonth - 1, 1);
        
        // Check if end date is after start date
        if (endDate <= startDate) {
          return { isValid: false, message: 'End date must be after start date' };
        }
        
        // Check if duration is reasonable
        const yearsDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
        if (yearsDiff > 50) {
          return { isValid: false, message: 'Work duration seems too long (>50 years)' };
        }
        
        // Check if end date is not too far in the future
        const currentDate = new Date();
        if (endDate > new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1)) {
          return { isValid: false, message: 'End date cannot be more than 1 year in the future' };
        }
      }
      
      return { isValid: true };
    } catch (error) {
      return { isValid: false, message: 'Please enter valid dates' };
    }
  };

  const handleDateChange = (id: string, field: 'startDate' | 'endDate', value: string) => {
    updateExperience(id, field, value);
    
    // Only validate and show toast if both dates are filled
    setTimeout(() => {
      const exp = data.find(e => e.id === id);
      if (exp) {
        const updatedExp = { ...exp, [field]: value };
        const rangeValidation = validateDateRange(updatedExp);
        
        // Only show error if validation fails AND we have sufficient date info
        if (!rangeValidation.isValid && 
            updatedExp.startDate && 
            (updatedExp.endDate || updatedExp.current) &&
            rangeValidation.message) {
          toast({
            title: "Date Range Issue",
            description: rangeValidation.message,
            variant: "destructive",
          });
        }
      }
    }, 100);
  };

  const addAchievement = (id: string) => {
    const exp = data.find(e => e.id === id);
    if (exp) {
      updateExperience(id, 'achievements', [...exp.achievements, '']);
    }
  };

  const updateAchievement = (id: string, index: number, value: string) => {
    const exp = data.find(e => e.id === id);
    if (exp) {
      const newAchievements = [...exp.achievements];
      newAchievements[index] = value;
      updateExperience(id, 'achievements', newAchievements);
    }
  };

  const removeAchievement = (id: string, index: number) => {
    const exp = data.find(e => e.id === id);
    if (exp && exp.achievements.length > 1) {
      const newAchievements = exp.achievements.filter((_, i) => i !== index);
      updateExperience(id, 'achievements', newAchievements);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center">
          <Briefcase className="h-5 w-5 mr-2" />
          Professional Experience
        </h3>
        <Button onClick={addExperience} size="sm" variant="outline" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {data.length === 0 && (
        <Card className="p-8 text-center text-gray-500 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
          <Briefcase className="h-16 w-16 mx-auto mb-4 text-purple-300" />
          <h4 className="text-lg font-medium mb-2">No Work Experience Added Yet</h4>
          <p className="text-sm">Add your professional experience to showcase your expertise.</p>
          <p className="text-xs mt-2 text-purple-600">Include internships, full-time roles, freelance work, and projects</p>
        </Card>
      )}

      {data.map((exp, index) => {
        const dateRangeValidation = validateDateRange(exp);
        
        return (
          <Card key={exp.id} className="p-6 border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-semibold text-lg">Experience #{index + 1}</h4>
              <Button
                onClick={() => removeExperience(exp.id)}
                size="sm"
                variant="ghost"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label className="text-sm font-medium">Job Title *</Label>
                <Input
                  value={exp.jobTitle}
                  onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                  placeholder="Senior Software Engineer"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Company *</Label>
                <Input
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  placeholder="Google Inc."
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label className="text-sm font-medium">Location</Label>
                <Input
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                  placeholder="London, UK"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Start Date *
                </Label>
                <Input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => handleDateChange(exp.id, 'startDate', e.target.value)}
                  min="1950-01"
                  max={new Date().toISOString().slice(0, 7)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  End Date
                </Label>
                <Input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => handleDateChange(exp.id, 'endDate', e.target.value)}
                  disabled={exp.current}
                  min="1950-01"
                  max={new Date().toISOString().slice(0, 7)}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onCheckedChange={(checked) => updateExperience(exp.id, 'current', checked)}
                />
                <Label htmlFor={`current-${exp.id}`} className="text-sm font-medium">I currently work here</Label>
              </div>
            </div>

            {!dateRangeValidation.isValid && exp.startDate && (exp.endDate || exp.current) && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center text-red-600 dark:text-red-400 text-sm">
                  {dateRangeValidation.message}
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Key Achievements & Responsibilities *</Label>
                <Button
                  onClick={() => addAchievement(exp.id)}
                  size="sm"
                  variant="outline"
                  type="button"
                  className="text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Point
                </Button>
              </div>
              {exp.achievements.map((achievement, achIndex) => (
                <div key={achIndex} className="flex gap-2 mb-2">
                  <Textarea
                    value={achievement}
                    onChange={(e) => updateAchievement(exp.id, achIndex, e.target.value)}
                    placeholder="• Led a team of 5 developers to deliver a critical project 2 weeks ahead of schedule, resulting in $200K cost savings"
                    rows={2}
                    className="flex-1 text-sm"
                  />
                  {exp.achievements.length > 1 && (
                    <Button
                      onClick={() => removeAchievement(exp.id, achIndex)}
                      size="sm"
                      variant="ghost"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      type="button"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default ExperienceForm;
