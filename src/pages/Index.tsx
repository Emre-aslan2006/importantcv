
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PersonalInfoForm from '@/components/cv/PersonalInfoForm';
import ExperienceForm from '@/components/cv/ExperienceForm';
import EducationForm from '@/components/cv/EducationForm';
import SkillsForm from '@/components/cv/SkillsForm';
import CVPreview from '@/components/cv/CVPreview';
import { CVData, defaultCVData } from '@/types/cv';
import { Download, Eye, FileText, Palette, Zap, Printer, Share2 } from 'lucide-react';

const Index = () => {
  const [cvData, setCvData] = useState<CVData>(defaultCVData);
  const [activeTab, setActiveTab] = useState('personal');
  const [templateStyle, setTemplateStyle] = useState('modern');

  const updateCVData = (section: keyof CVData, data: any) => {
    setCvData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handlePrint = () => {
    const printContent = document.getElementById('cv-preview');
    if (printContent) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>CV - ${cvData.personalInfo.fullName}</title>
              <style>
                body { margin: 0; font-family: Arial, sans-serif; }
                @media print {
                  body { margin: 0; }
                  .no-print { display: none; }
                }
              </style>
            </head>
            <body>
              ${printContent.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const handleDownloadPDF = () => {
    // Trigger browser's print dialog which can save as PDF
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `CV - ${cvData.personalInfo.fullName}`,
          text: 'Check out my professional CV',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('CV link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Professional CV Builder
                </h1>
                <p className="text-sm text-gray-600">Create ATS-optimized resumes in minutes</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handleShare} className="hidden md:flex">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" onClick={handlePrint} className="hidden md:flex">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button onClick={handleDownloadPDF} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Zap className="h-4 w-4 text-green-500 mr-1" />
                  ATS Optimized
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <Card className="p-6 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <Palette className="h-5 w-5 mr-2 text-blue-600" />
                  Build Your CV
                </h2>
                <select
                  value={templateStyle}
                  onChange={(e) => setTemplateStyle(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="modern">Modern</option>
                  <option value="classic">Classic</option>
                  <option value="minimal">Minimal</option>
                  <option value="creative">Creative</option>
                </select>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="personal" className="text-xs">Personal</TabsTrigger>
                  <TabsTrigger value="experience" className="text-xs">Experience</TabsTrigger>
                  <TabsTrigger value="education" className="text-xs">Education</TabsTrigger>
                  <TabsTrigger value="skills" className="text-xs">Skills</TabsTrigger>
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

            {/* Navigation */}
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => {
                  const tabs = ['personal', 'experience', 'education', 'skills'];
                  const currentIndex = tabs.indexOf(activeTab);
                  if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1]);
                }}
                disabled={activeTab === 'personal'}
              >
                Previous
              </Button>
              <Button 
                onClick={() => {
                  const tabs = ['personal', 'experience', 'education', 'skills'];
                  const currentIndex = tabs.indexOf(activeTab);
                  if (currentIndex < tabs.length - 1) setActiveTab(tabs[currentIndex + 1]);
                }}
                disabled={activeTab === 'skills'}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Next
              </Button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <Card className="p-6 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-green-600" />
                  Live Preview
                </h2>
                <div className="text-sm text-gray-600">
                  {templateStyle.charAt(0).toUpperCase() + templateStyle.slice(1)} Template
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div id="cv-preview">
                  <CVPreview data={cvData} template={templateStyle} />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
