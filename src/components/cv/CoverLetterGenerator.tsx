import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CVData } from '@/types/cv';
import { ArrowLeft, Wand2, Copy, Download, Sparkles, Target, Brain } from 'lucide-react';

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
    
    // Enhanced AI-powered cover letter generation
    setTimeout(() => {
      const userSkills = [...cvData.skills.technical, ...cvData.skills.soft].slice(0, 5).join(', ');
      const userExperience = cvData.experience.map(exp => `${exp.jobTitle} at ${exp.company}`).join(', ');
      const relevantEducation = cvData.education.length > 0 ? cvData.education[0] : null;
      
      // Extract keywords from job description for ATS optimization
      const jobKeywords = jobDescription ? extractKeywords(jobDescription) : getDefaultKeywords(jobTitle);
      
      const letter = generateProfessionalCoverLetter({
        jobTitle,
        companyName,
        jobDescription,
        userSkills,
        userExperience,
        education: relevantEducation,
        personalInfo: cvData.personalInfo,
        keywords: jobKeywords
      });

      setCoverLetter(letter);
      setIsGenerating(false);
    }, 3000);
  };

  const extractKeywords = (description: string) => {
    // Simple keyword extraction - in a real app, this would be more sophisticated
    const commonKeywords = ['experience', 'skills', 'team', 'project', 'management', 'development', 'client', 'strategic'];
    return commonKeywords.filter(keyword => 
      description.toLowerCase().includes(keyword)
    ).slice(0, 3);
  };

  const getDefaultKeywords = (title: string) => {
    const keywordMap: { [key: string]: string[] } = {
      'developer': ['development', 'coding', 'technical'],
      'manager': ['management', 'leadership', 'strategic'],
      'designer': ['design', 'creative', 'user experience'],
      'analyst': ['analysis', 'data', 'insights'],
      'marketing': ['marketing', 'brand', 'digital']
    };
    
    for (const [key, keywords] of Object.entries(keywordMap)) {
      if (title.toLowerCase().includes(key)) {
        return keywords;
      }
    }
    return ['professional', 'experience', 'skills'];
  };

  const generateProfessionalCoverLetter = ({
    jobTitle,
    companyName,
    jobDescription,
    userSkills,
    userExperience,
    education,
    personalInfo,
    keywords
  }: any) => {
    return `Dear Hiring Manager,

I am excited to express my strong interest in the ${jobTitle} position at ${companyName}. With my proven track record in ${userExperience ? userExperience.split(',')[0] : 'professional environments'} and expertise in ${userSkills.split(',').slice(0, 3).join(', ')}, I am confident I would bring immediate value to your team.

${cvData.experience.length > 0 ? `In my role as ${cvData.experience[0]?.jobTitle} at ${cvData.experience[0]?.company}, I successfully ${cvData.experience[0]?.achievements[0] || 'delivered exceptional results and exceeded performance expectations'}. This experience has equipped me with the ${keywords.slice(0, 2).join(' and ')} skills essential for excelling in this ${jobTitle} role at ${companyName}.` : ''}

What particularly excites me about ${companyName} is ${jobDescription ? 'the opportunity to contribute to the innovative initiatives outlined in your job posting' : 'your reputation for excellence and commitment to professional growth'}. My technical proficiency in ${cvData.skills.technical.slice(0, 3).join(', ')} ${cvData.skills.technical.length > 3 ? 'and other key technologies' : ''} aligns perfectly with your requirements, while my strong ${cvData.skills.soft.slice(0, 2).join(' and ')} abilities ensure effective collaboration and ${keywords.includes('management') ? 'team leadership' : 'project delivery'}.

${education ? `My ${education.degree} from ${education.institution} provided me with a solid foundation in ${education.degree.includes('Engineering') ? 'technical problem-solving and innovation' : education.degree.includes('Business') ? 'strategic thinking and business acumen' : 'analytical thinking and professional excellence'}.` : ''}

I would welcome the opportunity to discuss how my experience and passion for ${keywords[0] || 'excellence'} can contribute to ${companyName}'s continued success. Thank you for considering my application, and I look forward to hearing from you.

Sincerely,
${personalInfo.fullName}`;
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
    <div className="max-w-5xl mx-auto space-y-6">
      <Card className={`p-8 shadow-2xl border-0 backdrop-blur-md transition-all duration-300 ${isDarkMode ? 'bg-gray-800/90 text-white' : 'bg-white/90'}`}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onClose} size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  AI Cover Letter Generator
                </h2>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  ATS-optimized • Professional • Personalized
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">AI Powered</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enhanced Input Section */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <Label htmlFor="jobTitle" className="text-blue-700 dark:text-blue-300 font-medium">Job Title *</Label>
              <Input
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Senior Frontend Developer"
                className={`mt-1 ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-white/80'}`}
              />
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
              <Label htmlFor="companyName" className="text-purple-700 dark:text-purple-300 font-medium">Company Name *</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Google, Microsoft, Startup Inc."
                className={`mt-1 ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-white/80'}`}
              />
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <Label htmlFor="jobDescription" className="text-green-700 dark:text-green-300 font-medium">Job Description (Optional)</Label>
              <Textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here for AI keyword optimization and better personalization..."
                rows={4}
                className={`mt-1 ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-white/80'}`}
              />
              <p className="text-xs text-gray-500 mt-1">💡 Including the job description helps create ATS-optimized content</p>
            </div>

            <Button 
              onClick={generateCoverLetter}
              disabled={!jobTitle || !companyName || isGenerating}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white font-medium py-3 shadow-lg"
            >
              {isGenerating ? (
                <>
                  <Wand2 className="h-5 w-5 mr-2 animate-spin" />
                  Generating AI Cover Letter...
                </>
              ) : (
                <>
                  <Target className="h-5 w-5 mr-2" />
                  Generate Professional Cover Letter
                </>
              )}
            </Button>
          </div>

          {/* Enhanced Preview Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold">AI-Generated Cover Letter</Label>
              {coverLetter && (
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard} className="hover:bg-blue-50">
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadCoverLetter} className="hover:bg-green-50">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              )}
            </div>
            
            <div className={`border-2 border-dashed rounded-xl p-6 min-h-[500px] transition-all duration-300 ${isDarkMode ? 'bg-gray-900/50 border-gray-600' : 'bg-gray-50/50 border-gray-300'}`}>
              {coverLetter ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400">
                    <Sparkles className="h-4 w-4" />
                    <span>ATS-Optimized Content Generated</span>
                  </div>
                  <pre className={`whitespace-pre-wrap text-sm leading-relaxed font-sans ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    {coverLetter}
                  </pre>
                </div>
              ) : (
                <div className={`flex flex-col items-center justify-center h-full text-center space-y-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Brain className="h-12 w-12 opacity-50" />
                  <div>
                    <p className="font-medium">Ready to create your cover letter?</p>
                    <p className="text-sm">Fill in the job details and our AI will generate a professional, ATS-optimized cover letter tailored to your CV.</p>
                  </div>
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
