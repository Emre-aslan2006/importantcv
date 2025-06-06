
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Experience } from '@/types/cv';
import { Plus, Trash2, Briefcase } from 'lucide-react';

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, onChange }) => {
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

  const addAchievement = (expId: string) => {
    const exp = data.find(e => e.id === expId);
    if (exp) {
      updateExperience(expId, 'achievements', [...exp.achievements, '']);
    }
  };

  const updateAchievement = (expId: string, index: number, value: string) => {
    const exp = data.find(e => e.id === expId);
    if (exp) {
      const newAchievements = [...exp.achievements];
      newAchievements[index] = value;
      updateExperience(expId, 'achievements', newAchievements);
    }
  };

  const removeAchievement = (expId: string, index: number) => {
    const exp = data.find(e => e.id === expId);
    if (exp && exp.achievements.length > 1) {
      const newAchievements = exp.achievements.filter((_, i) => i !== index);
      updateExperience(expId, 'achievements', newAchievements);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center">
          <Briefcase className="h-5 w-5 mr-2" />
          Work Experience
        </h3>
        <Button onClick={addExperience} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {data.length === 0 && (
        <Card className="p-6 text-center text-gray-500">
          <Briefcase className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p>No work experience added yet.</p>
          <p className="text-sm">Click "Add Experience" to get started.</p>
        </Card>
      )}

      {data.map((exp, index) => (
        <Card key={exp.id} className="p-4 border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-medium">Experience #{index + 1}</h4>
            <Button
              onClick={() => removeExperience(exp.id)}
              size="sm"
              variant="ghost"
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label>Job Title *</Label>
              <Input
                value={exp.jobTitle}
                onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                placeholder="Software Engineer"
              />
            </div>
            <div>
              <Label>Company *</Label>
              <Input
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                placeholder="Tech Corp"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label>Location</Label>
              <Input
                value={exp.location}
                onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                placeholder="San Francisco, CA"
              />
            </div>
            <div>
              <Label>Start Date *</Label>
              <Input
                type="month"
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
              />
            </div>
            <div>
              <Label>End Date</Label>
              <Input
                type="month"
                value={exp.endDate}
                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                disabled={exp.current}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <Checkbox
              id={`current-${exp.id}`}
              checked={exp.current}
              onCheckedChange={(checked) => updateExperience(exp.id, 'current', checked)}
            />
            <Label htmlFor={`current-${exp.id}`}>Currently working here</Label>
          </div>

          <div>
            <Label>Key Achievements & Responsibilities</Label>
            {exp.achievements.map((achievement, achIndex) => (
              <div key={achIndex} className="flex items-center space-x-2 mt-2">
                <Textarea
                  value={achievement}
                  onChange={(e) => updateAchievement(exp.id, achIndex, e.target.value)}
                  placeholder="• Increased team productivity by 30% through implementation of agile methodologies..."
                  rows={2}
                  className="flex-1"
                />
                {exp.achievements.length > 1 && (
                  <Button
                    onClick={() => removeAchievement(exp.id, achIndex)}
                    size="sm"
                    variant="ghost"
                    className="text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              onClick={() => addAchievement(exp.id)}
              size="sm"
              variant="outline"
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Achievement
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ExperienceForm;
