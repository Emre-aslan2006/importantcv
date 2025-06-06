
import React from 'react';
import { CVData } from '@/types/cv';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar } from 'lucide-react';

interface CVPreviewProps {
  data: CVData;
  template: string;
}

const CVPreview: React.FC<CVPreviewProps> = ({ data, template }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const getTemplateStyles = () => {
    switch (template) {
      case 'modern':
        return {
          container: 'bg-white',
          header: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
          section: 'border-l-4 border-blue-500 pl-4',
          accent: 'text-blue-600',
          profileSection: 'flex items-start space-x-6'
        };
      case 'classic':
        return {
          container: 'bg-white',
          header: 'bg-gray-900 text-white',
          section: 'border-b-2 border-gray-200 pb-2',
          accent: 'text-gray-700',
          profileSection: 'text-center'
        };
      case 'minimal':
        return {
          container: 'bg-white',
          header: 'bg-white text-gray-900 border-b-2 border-gray-900',
          section: 'mb-6',
          accent: 'text-gray-900',
          profileSection: 'flex items-center justify-between'
        };
      case 'creative':
        return {
          container: 'bg-gradient-to-br from-purple-50 to-pink-50',
          header: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
          section: 'border-l-4 border-purple-500 pl-4 bg-white rounded-r-lg p-3 mb-4',
          accent: 'text-purple-600',
          profileSection: 'flex items-start space-x-6'
        };
      default:
        return {
          container: 'bg-white',
          header: 'bg-blue-600 text-white',
          section: 'border-l-4 border-blue-500 pl-4',
          accent: 'text-blue-600',
          profileSection: 'flex items-start space-x-6'
        };
    }
  };

  const styles = getTemplateStyles();

  const renderProfilePicture = () => {
    if (!data.personalInfo.profilePicture) return null;
    
    const sizeClass = template === 'classic' ? 'w-32 h-32 mx-auto' : 'w-24 h-24';
    
    return (
      <div className={`${sizeClass} rounded-full overflow-hidden bg-gray-200 flex-shrink-0`}>
        <img 
          src={data.personalInfo.profilePicture} 
          alt="Profile" 
          className="w-full h-full object-cover"
        />
      </div>
    );
  };

  return (
    <div className={`${styles.container} min-h-[800px] text-sm print:text-xs shadow-lg`}>
      {/* Header */}
      <div className={`${styles.header} p-6 print:p-4`}>
        <div className={styles.profileSection}>
          {(template === 'modern' || template === 'creative') && renderProfilePicture()}
          
          <div className={template === 'classic' ? 'space-y-3' : 'flex-1'}>
            {template === 'classic' && renderProfilePicture()}
            
            <h1 className={`${template === 'classic' ? 'text-center mt-4' : ''} text-3xl print:text-2xl font-bold mb-2`}>
              {data.personalInfo.fullName || 'Your Name'}
            </h1>
            
            <div className={`flex flex-wrap gap-4 text-sm print:text-xs opacity-90 ${
              template === 'classic' ? 'justify-center' : ''
            }`}>
              {data.personalInfo.email && (
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  {data.personalInfo.email}
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  {data.personalInfo.phone}
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {data.personalInfo.location}
                </div>
              )}
              {data.personalInfo.linkedin && (
                <div className="flex items-center">
                  <Linkedin className="h-4 w-4 mr-1" />
                  {data.personalInfo.linkedin}
                </div>
              )}
              {data.personalInfo.website && (
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-1" />
                  {data.personalInfo.website}
                </div>
              )}
            </div>
          </div>
          
          {template === 'minimal' && renderProfilePicture()}
        </div>
      </div>

      <div className="p-6 print:p-4 space-y-6">
        {/* Professional Summary */}
        {data.personalInfo.summary && (
          <div className={styles.section}>
            <h2 className={`text-lg print:text-base font-bold ${styles.accent} mb-3`}>
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {data.personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className={styles.section}>
            <h2 className={`text-lg print:text-base font-bold ${styles.accent} mb-3`}>
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900">{exp.jobTitle}</h3>
                      <p className={`${styles.accent} font-medium`}>
                        {exp.company} {exp.location && `• ${exp.location}`}
                      </p>
                    </div>
                    <div className="text-gray-600 text-xs flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  <ul className="space-y-1 text-gray-700">
                    {exp.achievements.filter(ach => ach.trim()).map((achievement, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span className="flex-1">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className={styles.section}>
            <h2 className={`text-lg print:text-base font-bold ${styles.accent} mb-3`}>
              EDUCATION
            </h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                      <p className={`${styles.accent} font-medium`}>{edu.institution}</p>
                      {(edu.gpa || edu.honors) && (
                        <p className="text-gray-600 text-xs">
                          {edu.gpa && `GPA: ${edu.gpa}`}
                          {edu.gpa && edu.honors && ' • '}
                          {edu.honors}
                        </p>
                      )}
                    </div>
                    <div className="text-gray-600 text-xs">{edu.graduationYear}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {(data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
          <div className={styles.section}>
            <h2 className={`text-lg print:text-base font-bold ${styles.accent} mb-3`}>
              SKILLS
            </h2>
            <div className="space-y-3">
              {data.skills.technical.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Technical Skills:</h4>
                  <p className="text-gray-700">{data.skills.technical.join(' • ')}</p>
                </div>
              )}
              {data.skills.soft.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Core Competencies:</h4>
                  <p className="text-gray-700">{data.skills.soft.join(' • ')}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Languages & Certifications */}
        {(data.skills.languages.length > 0 || data.skills.certifications.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.skills.languages.length > 0 && (
              <div className={styles.section}>
                <h2 className={`text-lg print:text-base font-bold ${styles.accent} mb-3`}>
                  LANGUAGES
                </h2>
                <div className="space-y-1">
                  {data.skills.languages.map((lang, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-900">{lang.language}</span>
                      <span className="text-gray-600">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.skills.certifications.length > 0 && (
              <div className={styles.section}>
                <h2 className={`text-lg print:text-base font-bold ${styles.accent} mb-3`}>
                  CERTIFICATIONS
                </h2>
                <ul className="space-y-1">
                  {data.skills.certifications.map((cert, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-gray-400 mr-2">•</span>
                      <span className="text-gray-700">{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CVPreview;
