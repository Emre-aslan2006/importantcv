
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skills } from '@/types/cv';
import { Plus, X, Code, Users, Globe, Award } from 'lucide-react';

interface SkillsFormProps {
  data: Skills;
  onChange: (data: Skills) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ data, onChange }) => {
  const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newLanguageLevel, setNewLanguageLevel] = useState('');
  const [newCertification, setNewCertification] = useState('');

  const addTechnicalSkill = () => {
    if (newTechnicalSkill.trim()) {
      onChange({
        ...data,
        technical: [...data.technical, newTechnicalSkill.trim()]
      });
      setNewTechnicalSkill('');
    }
  };

  const removeTechnicalSkill = (index: number) => {
    onChange({
      ...data,
      technical: data.technical.filter((_, i) => i !== index)
    });
  };

  const addSoftSkill = () => {
    if (newSoftSkill.trim()) {
      onChange({
        ...data,
        soft: [...data.soft, newSoftSkill.trim()]
      });
      setNewSoftSkill('');
    }
  };

  const removeSoftSkill = (index: number) => {
    onChange({
      ...data,
      soft: data.soft.filter((_, i) => i !== index)
    });
  };

  const addLanguage = () => {
    if (newLanguage.trim() && newLanguageLevel) {
      onChange({
        ...data,
        languages: [...data.languages, { language: newLanguage.trim(), level: newLanguageLevel }]
      });
      setNewLanguage('');
      setNewLanguageLevel('');
    }
  };

  const removeLanguage = (index: number) => {
    onChange({
      ...data,
      languages: data.languages.filter((_, i) => i !== index)
    });
  };

  const addCertification = () => {
    if (newCertification.trim()) {
      onChange({
        ...data,
        certifications: [...data.certifications, newCertification.trim()]
      });
      setNewCertification('');
    }
  };

  const removeCertification = (index: number) => {
    onChange({
      ...data,
      certifications: data.certifications.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      {/* Technical Skills */}
      <Card className="p-4">
        <h3 className="text-lg font-medium flex items-center mb-4">
          <Code className="h-5 w-5 mr-2" />
          Technical Skills
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {data.technical.map((skill, index) => (
            <Badge key={index} variant="secondary" className="flex items-center">
              {skill}
              <Button
                onClick={() => removeTechnicalSkill(index)}
                size="sm"
                variant="ghost"
                className="h-auto p-0 ml-2 hover:bg-transparent"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
        <div className="flex space-x-2">
          <Input
            value={newTechnicalSkill}
            onChange={(e) => setNewTechnicalSkill(e.target.value)}
            placeholder="e.g., React, Python, AWS"
            onKeyPress={(e) => e.key === 'Enter' && addTechnicalSkill()}
          />
          <Button onClick={addTechnicalSkill} type="button">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Soft Skills */}
      <Card className="p-4">
        <h3 className="text-lg font-medium flex items-center mb-4">
          <Users className="h-5 w-5 mr-2" />
          Soft Skills
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {data.soft.map((skill, index) => (
            <Badge key={index} variant="outline" className="flex items-center">
              {skill}
              <Button
                onClick={() => removeSoftSkill(index)}
                size="sm"
                variant="ghost"
                className="h-auto p-0 ml-2 hover:bg-transparent"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
        <div className="flex space-x-2">
          <Input
            value={newSoftSkill}
            onChange={(e) => setNewSoftSkill(e.target.value)}
            placeholder="e.g., Leadership, Communication, Problem Solving"
            onKeyPress={(e) => e.key === 'Enter' && addSoftSkill()}
          />
          <Button onClick={addSoftSkill} type="button">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Languages */}
      <Card className="p-4">
        <h3 className="text-lg font-medium flex items-center mb-4">
          <Globe className="h-5 w-5 mr-2" />
          Languages
        </h3>
        <div className="space-y-2 mb-4">
          {data.languages.map((lang, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <span>{lang.language} - {lang.level}</span>
              <Button
                onClick={() => removeLanguage(index)}
                size="sm"
                variant="ghost"
                className="text-red-500"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Input
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
            placeholder="Language"
          />
          <Select value={newLanguageLevel} onValueChange={setNewLanguageLevel}>
            <SelectTrigger>
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Native">Native</SelectItem>
              <SelectItem value="Fluent">Fluent</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Basic">Basic</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={addLanguage} type="button">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Certifications */}
      <Card className="p-4">
        <h3 className="text-lg font-medium flex items-center mb-4">
          <Award className="h-5 w-5 mr-2" />
          Certifications
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {data.certifications.map((cert, index) => (
            <Badge key={index} variant="default" className="flex items-center">
              {cert}
              <Button
                onClick={() => removeCertification(index)}
                size="sm"
                variant="ghost"
                className="h-auto p-0 ml-2 hover:bg-transparent"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
        <div className="flex space-x-2">
          <Input
            value={newCertification}
            onChange={(e) => setNewCertification(e.target.value)}
            placeholder="e.g., AWS Certified Solutions Architect"
            onKeyPress={(e) => e.key === 'Enter' && addCertification()}
          />
          <Button onClick={addCertification} type="button">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SkillsForm;
