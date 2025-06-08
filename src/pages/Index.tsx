import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import FormSection from '@/components/layout/FormSection';
import PreviewSection from '@/components/layout/PreviewSection';
import Footer from '@/components/layout/Footer';
import CoverLetterGenerator from '@/components/cv/CoverLetterGenerator';
import { CVData, defaultCVData } from '@/types/cv';
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

      toast({
        title: "Generating PDF...",
        description: "Please wait while we create your professional CV",
      });

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
      
      const safeName = (cvData.personalInfo.fullName || 'CV')
        .replace(/[^a-zA-Z0-9_-\s]/g, '')
        .replace(/\s+/g, '_')
        .substring(0, 50);
      const fileName = `${safeName}_Resume.pdf`;
      
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

    if (cvData.personalInfo.fullName) completed += 8;
    if (cvData.personalInfo.email) completed += 8;
    if (cvData.personalInfo.phone) completed += 8;
    if (cvData.personalInfo.location) completed += 8;
    if (cvData.personalInfo.summary) completed += 8;
    total += 40;

    if (cvData.experience.length > 0) completed += 30;
    total += 30;

    if (cvData.education.length > 0) completed += 15;
    total += 15;

    if (cvData.skills.technical.length > 0 || cvData.skills.soft.length > 0) completed += 15;
    total += 15;

    return Math.round((completed / total) * 100);
  };

  const completionPercentage = getCompletionPercentage();

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      <Header
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        completionPercentage={completionPercentage}
        isGeneratingPDF={isGeneratingPDF}
        handleDownloadPDF={handleDownloadPDF}
        handlePrint={handlePrint}
        showCoverLetter={showCoverLetter}
        setShowCoverLetter={setShowCoverLetter}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {showCoverLetter ? (
          <CoverLetterGenerator cvData={cvData} isDarkMode={isDarkMode} onClose={() => setShowCoverLetter(false)} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FormSection
              cvData={cvData}
              updateCVData={updateCVData}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              templateStyle={templateStyle}
              setTemplateStyle={setTemplateStyle}
              isDarkMode={isDarkMode}
              setShowCoverLetter={setShowCoverLetter}
              handlePrint={handlePrint}
            />

            <PreviewSection
              cvData={cvData}
              templateStyle={templateStyle}
              isDarkMode={isDarkMode}
            />
          </div>
        )}
      </div>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default Index;
