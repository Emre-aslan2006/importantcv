
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import PersonalInfoForm from '@/components/cv/PersonalInfoForm';
import ExperienceForm from '@/components/cv/ExperienceForm';
import EducationForm from '@/components/cv/EducationForm';
import SkillsForm from '@/components/cv/SkillsForm';
import CVPreview from '@/components/cv/CVPreview';
import CoverLetterGenerator from '@/components/cv/CoverLetterGenerator';
import { CVData, defaultCVData } from '@/types/cv';
import { Download, Eye, Printer, Moon, Sun, Sparkles, Brain, Target, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Index = () => {
  const [cvData, setCvData] = useState<CVData>(defaultCVData);
  const [activeTab, setActiveTab] = useState('personal');
  const [templateStyle, setTemplateStyle] = useState('modern');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showCoverLetter, setShowCoverLetter] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const { toast } = useToast();

  const updateCVData = (section: keyof CVData, data: any) => {
    setCvData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handlePrint = () => {
    const printContent = document.getElementById('cv-preview');
    if (printContent) {
      const printWindow = window.open('', '_blank', 'noopener,noreferrer');
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

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    
    try {
      const element = document.getElementById('cv-preview');
      if (!element) {
        throw new Error('CV preview not found');
      }

      // Show loading toast
      toast({
        title: "Generating PDF...",
        description: "Please wait while we create your professional CV",
      });

      // Capture the element as canvas with high quality
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight,
      });

      const imgData = canvas.toDataURL('image/png');
      
      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      // Generate filename with security in mind - sanitize user input
      const safeName = (cvData.personalInfo.fullName || 'CV')
        .replace(/[^a-zA-Z0-9_-\s]/g, '')
        .replace(/\s+/g, '_')
        .substring(0, 50); // Limit length
      const fileName = `${safeName}_Resume.pdf`;
      
      // Download the PDF
      pdf.save(fileName);
      
      toast({
        title: "PDF Downloaded Successfully! 🎉",
        description: `Your professional CV has been saved as ${fileName}`,
      });

    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error Generating PDF",
        description: "Please try again or use the print function as an alternative",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const getCompletionPercentage = () => {
    let completed = 0;
    let total = 0;

    // Personal info (40% weight)
    if (cvData.personalInfo.fullName) completed += 8;
    if (cvData.personalInfo.email) completed += 8;
    if (cvData.personalInfo.phone) completed += 8;
    if (cvData.personalInfo.location) completed += 8;
    if (cvData.personalInfo.summary) completed += 8;
    total += 40;

    // Experience (30% weight)
    if (cvData.experience.length > 0) completed += 30;
    total += 30;

    // Education (15% weight)
    if (cvData.education.length > 0) completed += 15;
    total += 15;

    // Skills (15% weight)
    if (cvData.skills.technical.length > 0 || cvData.skills.soft.length > 0) completed += 15;
    total += 15;

    return Math.round((completed / total) * 100);
  };

  const completionPercentage = getCompletionPercentage();

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      {/* Enhanced Header */}
      <div className={`backdrop-blur-md border-b sticky top-0 z-10 transition-all duration-300 ${isDarkMode ? 'bg-gray-900/95 border-gray-700/50 shadow-xl' : 'bg-white/95 border-gray-200/50 shadow-lg'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-3 rounded-xl shadow-lg">
                  <Brain className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1">
                  <Sparkles className="h-3 w-3 text-gray-900" />
                </div>
              </div>
              <div>
                <h1 className={`text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent`}>
                  Jobwise AI
                </h1>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Elite CV Builder • ATS Optimized • AI-Powered
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Completion Progress */}
              <div className={`hidden md:flex items-center space-x-2 px-4 py-2 rounded-full ${isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
                <span className="text-xs font-medium">{completionPercentage}%</span>
              </div>

              <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                <Sun className="h-4 w-4" />
                <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
                <Moon className="h-4 w-4" />
              </div>
              
              <Button 
                variant="outline" 
                onClick={() => setShowCoverLetter(!showCoverLetter)}
                className="hidden md:flex bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 hover:from-purple-700 hover:to-pink-700"
              >
                <FileText className="h-4 w-4 mr-2" />
                Cover Letter AI
              </Button>
              
              <Button variant="outline" onClick={handlePrint} className="hidden md:flex backdrop-blur-sm">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              
              <Button 
                onClick={handleDownloadPDF} 
                disabled={isGeneratingPDF}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 shadow-lg disabled:opacity-50"
              >
                <Download className="h-4 w-4 mr-2" />
                {isGeneratingPDF ? 'Generating...' : 'Export PDF'}
              </Button>
              
              <div className="flex items-center space-x-2 text-sm px-3 py-2 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                <Target className="h-4 w-4" />
                <span className="font-medium">ATS Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {showCoverLetter ? (
          <CoverLetterGenerator cvData={cvData} isDarkMode={isDarkMode} onClose={() => setShowCoverLetter(false)} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Enhanced Form Section */}
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
            </div>

            {/* Enhanced Preview Section */}
            <div className="space-y-6">
              <Card className={`p-6 shadow-2xl border-0 backdrop-blur-md transition-all duration-300 ${isDarkMode ? 'bg-gray-800/80 text-white shadow-purple-500/20' : 'bg-white/80 shadow-blue-200/30'}`}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Eye className="h-5 w-5 mr-2 text-green-600" />
                    Live Preview
                  </h2>
                  <div className={`text-sm px-3 py-1 rounded-full ${isDarkMode ? 'text-gray-300 bg-gray-700/50' : 'text-gray-600 bg-gray-100/50'}`}>
                    {templateStyle.charAt(0).toUpperCase() + templateStyle.slice(1)} Template
                  </div>
                </div>
                <div className={`border rounded-xl overflow-hidden transition-all duration-300 shadow-inner ${isDarkMode ? 'bg-gray-900/50 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div id="cv-preview">
                    <CVPreview data={cvData} template={templateStyle} />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className={`mt-16 py-8 border-t backdrop-blur-md transition-all duration-300 ${isDarkMode ? 'bg-gray-900/80 border-gray-700/50' : 'bg-white/80 border-gray-200/50'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Made by <strong>Emre Aslan</strong> · <a 
              href="https://www.linkedin.com/in/emreaslan2006" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline transition-colors"
            >
              LinkedIn
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
