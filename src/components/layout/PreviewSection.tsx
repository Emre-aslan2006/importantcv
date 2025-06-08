
import React from 'react';
import { Card } from '@/components/ui/card';
import CVPreview from '@/components/cv/CVPreview';
import { CVData } from '@/types/cv';
import { Eye } from 'lucide-react';

interface PreviewSectionProps {
  cvData: CVData;
  templateStyle: string;
  isDarkMode: boolean;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({
  cvData,
  templateStyle,
  isDarkMode,
}) => {
  return (
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
  );
};

export default PreviewSection;
