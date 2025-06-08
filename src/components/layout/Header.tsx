
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Download, Printer, Moon, Sun, Sparkles, Brain, Target, FileText } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  completionPercentage: number;
  isGeneratingPDF: boolean;
  handleDownloadPDF: () => void;
  handlePrint: () => void;
  showCoverLetter: boolean;
  setShowCoverLetter: (show: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  toggleDarkMode,
  completionPercentage,
  isGeneratingPDF,
  handleDownloadPDF,
  handlePrint,
  showCoverLetter,
  setShowCoverLetter,
}) => {
  return (
    <div className={`backdrop-blur-md border-b sticky top-0 z-10 transition-all duration-300 ${isDarkMode ? 'bg-gray-900/95 border-gray-700/50 shadow-xl' : 'bg-white/95 border-gray-200/50 shadow-lg'}`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
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
              <h1 className={`text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent`}>
                Jobwise AI
              </h1>
              <p className={`text-xs lg:text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Elite CV Builder • ATS Optimized • AI-Powered
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 lg:space-x-4 flex-wrap">
            {/* Completion Progress - Hidden on small screens */}
            <div className={`hidden xl:flex items-center space-x-2 px-4 py-2 rounded-full ${isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              <span className="text-xs font-medium">{completionPercentage}%</span>
            </div>

            {/* Dark Mode Toggle */}
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
              <Sun className="h-4 w-4" />
              <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
              <Moon className="h-4 w-4" />
            </div>

            {/* Export PDF Button - Always Visible and Prominent */}
            <Button 
              onClick={handleDownloadPDF} 
              disabled={isGeneratingPDF}
              size="default"
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 shadow-lg disabled:opacity-50 text-white border-0 font-semibold"
            >
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{isGeneratingPDF ? 'Generating...' : 'Export PDF'}</span>
              <span className="sm:hidden">PDF</span>
            </Button>

            {/* Additional Action Buttons - Desktop Only */}
            <div className="hidden lg:flex items-center space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setShowCoverLetter(!showCoverLetter)}
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
            
            {/* ATS Ready Badge */}
            <div className="flex items-center space-x-2 text-sm px-3 py-2 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
              <Target className="h-4 w-4" />
              <span className="font-medium hidden sm:inline">ATS Ready</span>
              <span className="font-medium sm:hidden">ATS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
