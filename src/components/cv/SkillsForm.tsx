
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skills } from '@/types/cv';
import { Plus, Trash2, Code, Brain, Globe, Award } from 'lucide-react';

interface SkillsFormProps {
  data: Skills;
  onChange: (data: Skills) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ data, onChange }) => {
  const addSkill = (category: 'technical' | 'soft' | 'certifications') => {
    onChange({
      ...data,
      [category]: [...data[category], '']
    });
  };

  const updateSkill = (category: 'technical' | 'soft' | 'certifications', index: number, value: string) => {
    const newSkills = [...data[category]];
    newSkills[index] = value;
    onChange({
      ...data,
      [category]: newSkills
    });
  };

  const removeSkill = (category: 'technical' | 'soft' | 'certifications', index: number) => {
    const newSkills = data[category].filter((_, i) => i !== index);
    onChange({
      ...data,
      [category]: newSkills
    });
  };

  const addLanguage = () => {
    onChange({
      ...data,
      languages: [...data.languages, { language: '', level: '' }]
    });
  };

  const updateLanguage = (index: number, field: 'language' | 'level', value: string) => {
    const newLanguages = [...data.languages];
    newLanguages[index] = { ...newLanguages[index], [field]: value };
    onChange({
      ...data,
      languages: newLanguages
    });
  };

  const removeLanguage = (index: number) => {
    const newLanguages = data.languages.filter((_, i) => i !== index);
    onChange({
      ...data,
      languages: newLanguages
    });
  };

  const languageLevels = ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic'];

  return (
    <div className="space-y-6">
      {/* Technical Skills */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium flex items-center">
            <Code className="h-5 w-5 mr-2" />
            Technical Skills
          </h3>
          <Button onClick={() => addSkill('technical')} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Skill
          </Button>
        </div>
        <div className="space-y-2">
          {data.technical.map((skill, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={skill}
                onChange={(e) => updateSkill('technical', index, e.target.value)}
                placeholder="React, Python, SQL, etc."
                className="flex-1"
              />
              <Button
                onClick={() => removeSkill('technical', index)}
                size="sm"
                variant="ghost"
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {data.technical.length === 0 && (
            <p className="text-gray-500 text-sm">No technical skills added yet.</p>
          )}
        </div>
      </Card>

      {/* Soft Skills */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            Soft Skills
          </h3>
          <Button onClick={() => addSkill('soft')} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Skill
          </Button>
        </div>
        <div className="space-y-2">
          {data.soft.map((skill, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={skill}
                onChange={(e) => updateSkill('soft', index, e.target.value)}
                placeholder="Leadership, Communication, Problem Solving, etc."
                className="flex-1"
              />
              <Button
                onClick={() => removeSkill('soft', index)}
                size="sm"
                variant="ghost"
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {data.soft.length === 0 && (
            <p className="text-gray-500 text-sm">No soft skills added yet.</p>
          )}
        </div>
      </Card>

      {/* Languages */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            Languages
          </h3>
          <Button onClick={addLanguage} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Language
          </Button>
        </div>
        <div className="space-y-2">
          {data.languages.map((lang, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={lang.language}
                onChange={(e) => updateLanguage(index, 'language', e.target.value)}
                placeholder="English, Spanish, etc."
                className="flex-1"
              />
              <Select value={lang.level} onValueChange={(value) => updateLanguage(index, 'level', value)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {languageLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={() => removeLanguage(index)}
                size="sm"
                variant="ghost"
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {data.languages.length === 0 && (
            <p className="text-gray-500 text-sm">No languages added yet.</p>
          )}
        </div>
      </Card>

      {/* Certifications */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Certifications
          </h3>
          <Button onClick={() => addSkill('certifications')} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Certification
          </Button>
        </div>
        <div className="space-y-2">
          {data.certifications.map((cert, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={cert}
                onChange={(e) => updateSkill('certifications', index, e.target.value)}
                placeholder="AWS Certified Developer, PMP, etc."
                className="flex-1"
              />
              <Button
                onClick={() => removeSkill('certifications', index)}
                size="sm"
                variant="ghost"
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {data.certifications.length === 0 && (
            <p className="text-gray-500 text-sm">No certifications added yet.</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SkillsForm;
