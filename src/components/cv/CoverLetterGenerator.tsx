
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CVData } from '@/types/cv';
import { ArrowLeft, Wand2, Copy, Download } from 'lucide-react';

interface CoverLetterGeneratorProps {
  cvData: CVData;
  isDarkMode: boolean;
  onClose: () => void;
}

const CoverLetterGenerator: React.FC<CoverLetterGeneratorProps> = ({ cvData, isDarkMode, onClose }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCoverLetter = () => {
    setIsGenerating(true);
    
    // Simulate AI generation with a template-based approach
    setTimeout(() => {
      const letter = `Dear Hiring Manager,

I am writing to express my strong interest in the ${jobTitle} position at ${companyName}. With my background in ${cvData.personalInfo.summary || 'professional experience'}, I am confident that I would be a valuable addition to your team.

${cvData.experience.length > 0 ? `In my previous role as ${cvData.experience[0]?.jobTitle} at ${cvData.experience[0]?.company}, I ${cvData.experience[0]?.achievements[0] || 'successfully contributed to key projects and initiatives'}. This experience has prepared me well for the challenges and opportunities at ${companyName}.` : ''}

${cvData.skills.technical.length > 0 ? `My technical skills in ${cvData.skills.technical.slice(0, 3).join(', ')} align perfectly with the requirements outlined in your job posting.` : ''} I am particularly excited about the opportunity to ${jobDescription ? 'contribute to the initiatives mentioned in your job description' : 'bring my expertise to your organization'}.

${cvData.education.length > 0 ? `My educational background in ${cvData.education[0]?.degree} from ${cvData.education[0]?.institution} has provided me with a strong foundation for this role.` : ''}

I would welcome the opportunity to discuss how my experience and enthusiasm can contribute to ${companyName}'s continued success. Thank you for considering my application.

Sincerely,
${cvData.personalInfo.fullName}`;

      setCoverLetter(letter);
      setIsGenerating(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(coverLetter);
  };

  const downloadCoverLetter = () => {
    const element = document.createElement('a');
    const file = new Blob([coverLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Cover_Letter_${companyName || 'Company'}_${jobTitle || 'Position'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className={`p-6 shadow-lg border-0 backdrop-blur-sm transition-colors duration-300 ${isDarkMode ? 'bg-gray-800/90 text-white' : 'bg-white/90'}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" onClick={onClose} size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-2xl font-bold flex items-center">
              💬 Cover Letter Generator
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="jobTitle">Job Title *</Label>
              <Input
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Frontend Developer"
                className={isDarkMode ? 'bg-gray-700 border-gray-600' : ''}
              />
            </div>

            <div>
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Tech Corp"
                className={isDarkMode ? 'bg-gray-700 border-gray-600' : ''}
              />
            </div>

            <div>
              <Label htmlFor="jobDescription">Job Description (Optional)</Label>
              <Textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here for better customization..."
                rows={4}
                className={isDarkMode ? 'bg-gray-700 border-gray-600' : ''}
              />
            </div>

            <Button 
              onClick={generateCoverLetter}
              disabled={!jobTitle || !companyName || isGenerating}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isGenerating ? (
                <>
                  <Wand2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate Cover Letter
                </>
              )}
            </Button>
          </div>

          {/* Preview Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Generated Cover Letter</Label>
              {coverLetter && (
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadCoverLetter}>
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              )}
            </div>
            
            <div className={`border rounded-lg p-4 min-h-[400px] transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              {coverLetter ? (
                <pre className={`whitespace-pre-wrap text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {coverLetter}
                </pre>
              ) : (
                <div className={`flex items-center justify-center h-full ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  <p>Fill in the job details and click "Generate Cover Letter" to see your personalized cover letter here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CoverLetterGenerator;
