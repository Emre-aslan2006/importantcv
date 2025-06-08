
import React from 'react';

interface FooterProps {
  isDarkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  return (
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
  );
};

export default Footer;
