
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Skills } from '@/types/cv';
import { Plus, Trash2, Code, Brain, Globe, Award, HelpCircle, Link, ExternalLink } from 'lucide-react';

interface SkillsFormProps {
  data: Skills;
  onChange: (data: Skills) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ data, onChange }) => {
  const addSkill = (category: 'technical' | 'soft') => {
    onChange({
      ...data,
      [category]: [...data[category], '']
    });
  };

  const updateSkill = (category: 'technical' | 'soft', index: number, value: string) => {
    const newSkills = [...data[category]];
    newSkills[index] = value;
    onChange({
      ...data,
      [category]: newSkills
    });
  };

  const removeSkill = (category: 'technical' | 'soft', index: number) => {
    const newSkills = data[category].filter((_, i) => i !== index);
    onChange({
      ...data,
      [category]: newSkills
    });
  };

  const addCertification = () => {
    onChange({
      ...data,
      certifications: [...data.certifications, { name: '', link: '' }]
    });
  };

  const updateCertification = (index: number, field: 'name' | 'link', value: string) => {
    const newCertifications = [...data.certifications];
    newCertifications[index] = { ...newCertifications[index], [field]: value };
    onChange({
      ...data,
      certifications: newCertifications
    });
  };

  const removeCertification = (index: number) => {
    const newCertifications = data.certifications.filter((_, i) => i !== index);
    onChange({
      ...data,
      certifications: newCertifications
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

  const languageLevels = ['Novice', 'Intermediate', 'Advanced', 'Native'];

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Technical Skills */}
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold flex items-center text-blue-700 dark:text-blue-300">
                <Code className="h-5 w-5 mr-2" />
                Technical Skills
              </h3>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">
                    Technical skills are the specific knowledge and abilities required to perform task-based, specialized, or practical activities, often involving the use of tools, software, or techniques in a particular field.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Button onClick={() => addSkill('technical')} size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </div>
          <div className="space-y-3">
            {data.technical.map((skill, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={skill}
                  onChange={(e) => updateSkill('technical', index, e.target.value)}
                  placeholder="React, Python, SQL, Adobe Photoshop, etc."
                  className="flex-1 bg-white/80 dark:bg-gray-800/80"
                />
                <Button
                  onClick={() => removeSkill('technical', index)}
                  size="sm"
                  variant="ghost"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {data.technical.length === 0 && (
              <p className="text-gray-500 text-sm italic">No technical skills added yet. Click "Add Skill" to get started.</p>
            )}
          </div>
        </Card>

        {/* Soft Skills */}
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold flex items-center text-purple-700 dark:text-purple-300">
                <Brain className="h-5 w-5 mr-2" />
                Soft Skills
              </h3>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <div className="text-sm space-y-2">
                    <p>Soft skills are personal attributes, behaviors, and social abilities that enable people to work well with others and navigate the work environment effectively. Unlike hard skills, which are technical and job-specific, soft skills are interpersonal and character-based.</p>
                    <div className="space-y-1">
                      <p className="font-medium">Key Soft Skills Examples:</p>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Communication – speaking, writing, listening effectively</li>
                        <li>Teamwork – collaborating with others</li>
                        <li>Adaptability – adjusting to change and new situations</li>
                        <li>Problem-solving – thinking critically and resolving issues</li>
                        <li>Time management – organizing tasks efficiently</li>
                        <li>Emotional intelligence – understanding and managing emotions</li>
                        <li>Leadership – motivating and guiding individuals or teams</li>
                        <li>Work ethic – being responsible, reliable, and committed</li>
                      </ul>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
            <Button onClick={() => addSkill('soft')} size="sm" className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </div>
          <div className="space-y-3">
            {data.soft.map((skill, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={skill}
                  onChange={(e) => updateSkill('soft', index, e.target.value)}
                  placeholder="Leadership, Communication, Problem Solving, etc."
                  className="flex-1 bg-white/80 dark:bg-gray-800/80"
                />
                <Button
                  onClick={() => removeSkill('soft', index)}
                  size="sm"
                  variant="ghost"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {data.soft.length === 0 && (
              <p className="text-gray-500 text-sm italic">No soft skills added yet. Click "Add Skill" to get started.</p>
            )}
          </div>
        </Card>

        {/* Languages */}
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center text-green-700 dark:text-green-300">
              <Globe className="h-5 w-5 mr-2" />
              Languages
            </h3>
            <Button onClick={addLanguage} size="sm" className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Language
            </Button>
          </div>
          <div className="space-y-3">
            {data.languages.map((lang, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={lang.language}
                  onChange={(e) => updateLanguage(index, 'language', e.target.value)}
                  placeholder="English, Spanish, Mandarin, etc."
                  className="flex-1 bg-white/80 dark:bg-gray-800/80"
                />
                <Select value={lang.level} onValueChange={(value) => updateLanguage(index, 'level', value)}>
                  <SelectTrigger className="w-40 bg-white/80 dark:bg-gray-800/80">
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
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {data.languages.length === 0 && (
              <p className="text-gray-500 text-sm italic">No languages added yet. Click "Add Language" to get started.</p>
            )}
          </div>
        </Card>

        {/* Certifications */}
        <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center text-orange-700 dark:text-orange-300">
              <Award className="h-5 w-5 mr-2" />
              Certifications
            </h3>
            <Button onClick={addCertification} size="sm" className="bg-orange-600 hover:bg-orange-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Certification
            </Button>
          </div>
          <div className="space-y-3">
            {data.certifications.map((cert, index) => (
              <div key={index} className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={cert.name}
                    onChange={(e) => updateCertification(index, 'name', e.target.value)}
                    placeholder="AWS Certified Developer, PMP, Google Analytics, etc."
                    className="flex-1 bg-white/80 dark:bg-gray-800/80"
                  />
                  <Button
                    onClick={() => removeCertification(index)}
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2 items-center">
                  <Link className="h-4 w-4 text-gray-400" />
                  <Input
                    value={cert.link || ''}
                    onChange={(e) => updateCertification(index, 'link', e.target.value)}
                    placeholder="https://link-to-certification.com (optional)"
                    className="flex-1 bg-white/60 dark:bg-gray-800/60 text-sm"
                  />
                  {cert.link && (
                    <Button
                      onClick={() => window.open(cert.link, '_blank')}
                      size="sm"
                      variant="ghost"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
            {data.certifications.length === 0 && (
              <p className="text-gray-500 text-sm italic">No certifications added yet. Click "Add Certification" to get started.</p>
            )}
          </div>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default SkillsForm;
