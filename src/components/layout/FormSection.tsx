
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PersonalInfoForm from '@/components/cv/PersonalInfoForm';
import ExperienceForm from '@/components/cv/ExperienceForm';
import EducationForm from '@/components/cv/EducationForm';
import SkillsForm from '@/components/cv/SkillsForm';
import { CVData } from '@/types/cv';
import { Target, FileText, Printer } from 'lucide-react';

interface FormSectionProps {
  cvData: CVData;
  updateCVData: (section: keyof CVData, data: any) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  templateStyle: string;
  setTemplateStyle: (style: string) => void;
  isDarkMode: boolean;
  setShowCoverLetter: (show: boolean) => void;
  handlePrint: () => void;
}

const FormSection: React.FC<FormSectionProps> = ({
  cvData,
  updateCVData,
  activeTab,
  setActiveTab,
  templateStyle,
  setTemplateStyle,
  isDarkMode,
  setShowCoverLetter,
  handlePrint,
}) => {
  return (
    <div className="space-y-6">
      <Card className={`p-6 shadow-2xl border-0 backdrop-blur-md transition-all duration-300 ${isDarkMode ? 'bg-gray-800/80 text-white shadow-purple-500/20' : 'bg-white/80 shadow-blue-200/30'}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <Target className="h-5 w-5 mr-2 text-blue-600" />
            Build Your Elite CV
          </h2>
          <select
            value={templateStyle}
            onChange={(e) => setTemplateStyle(e.target.value)}
            className={`px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${isDarkMode ? 'bg-gray-700/80 border-gray-600 text-white' : 'border-gray-300 bg-white/80'}`}
          >
            <option value="modern">🎨 Modern Elite</option>
            <option value="classic">📋 Executive</option>
            <option value="minimal">⚡ Minimalist Pro</option>
            <option value="creative">🌟 Creative Director</option>
            <option value="dark">🌙 Dark Professional</option>
            <option value="gradient">🌈 Gradient Luxury</option>
          </select>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-gray-100/50 dark:bg-gray-700/50">
            <TabsTrigger value="personal" className="text-xs font-medium">👤 Personal</TabsTrigger>
            <TabsTrigger value="experience" className="text-xs font-medium">💼 Experience</TabsTrigger>
            <TabsTrigger value="education" className="text-xs font-medium">🎓 Education</TabsTrigger>
            <TabsTrigger value="skills" className="text-xs font-medium">⚡ Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <PersonalInfoForm 
              data={cvData.personalInfo} 
              onChange={(data) => updateCVData('personalInfo', data)} 
            />
          </TabsContent>

          <TabsContent value="experience">
            <ExperienceForm 
              data={cvData.experience} 
              onChange={(data) => updateCVData('experience', data)} 
            />
          </TabsContent>

          <TabsContent value="education">
            <EducationForm 
              data={cvData.education} 
              onChange={(data) => updateCVData('education', data)} 
            />
          </TabsContent>

          <TabsContent value="skills">
            <SkillsForm 
              data={cvData.skills} 
              onChange={(data) => updateCVData('skills', data)} 
            />
          </TabsContent>
        </Tabs>
      </Card>

      {/* Enhanced Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => {
            const tabs = ['personal', 'experience', 'education', 'skills'];
            const currentIndex = tabs.indexOf(activeTab);
            if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1]);
          }}
          disabled={activeTab === 'personal'}
          className="backdrop-blur-sm"
        >
          ← Previous
        </Button>
        <Button 
          onClick={() => {
            const tabs = ['personal', 'experience', 'education', 'skills'];
            const currentIndex = tabs.indexOf(activeTab);
            if (currentIndex < tabs.length - 1) setActiveTab(tabs[currentIndex + 1]);
          }}
          disabled={activeTab === 'skills'}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700"
        >
          Next →
        </Button>
      </div>

      {/* Mobile Action Buttons - Show on mobile only */}
      <div className="lg:hidden grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          onClick={() => setShowCoverLetter(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 hover:from-purple-700 hover:to-pink-700"
        >
          <FileText className="h-4 w-4 mr-2" />
          Cover Letter AI
        </Button>
        
        <Button variant="outline" onClick={handlePrint} className="backdrop-blur-sm">
          <Printer className="h-4 w-4 mr-2" />
          Print
        </Button>
      </div>
    </div>
  );
};

export default FormSection;
