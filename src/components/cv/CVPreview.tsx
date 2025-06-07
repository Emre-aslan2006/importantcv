
import React from 'react';
import { CVData } from '@/types/cv';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar, ExternalLink } from 'lucide-react';

interface CVPreviewProps {
  data: CVData;
  template: string;
}

const CVPreview: React.FC<CVPreviewProps> = ({ data, template }) => {
  const formatDate = (dateString: string) => {
    if (!dateString || dateString === 'Invalid Date') return '';
    
    // Handle YYYY-MM format
    if (dateString.includes('-')) {
      const [year, month] = dateString.split('-');
      if (year && month) {
        const date = new Date(parseInt(year), parseInt(month) - 1);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      }
    }
    
    // Handle other formats
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString; // Return original if can't parse
    }
    
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const formatYear = (year: string) => {
    if (!year) return '';
    return year;
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
      case 'dark':
        return {
          container: 'bg-gray-900 text-white',
          header: 'bg-gradient-to-r from-gray-800 to-gray-700 text-white border-b border-gray-600',
          section: 'border-l-4 border-gray-600 pl-4 mb-6',
          accent: 'text-gray-300',
          profileSection: 'flex items-start space-x-6'
        };
      case 'gradient':
        return {
          container: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white',
          header: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900',
          section: 'border-l-4 border-yellow-400 pl-4 mb-6 bg-white/10 rounded-r-lg p-3',
          accent: 'text-yellow-300',
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
  const textColor = template === 'dark' || template === 'gradient' ? 'text-gray-300' : 'text-gray-700';
  const headingColor = template === 'dark' || template === 'gradient' ? 'text-white' : 'text-gray-900';

  const renderProfilePicture = () => {
    if (!data.personalInfo.profilePicture) return null;
    
    const sizeClass = template === 'classic' ? 'w-32 h-32 mx-auto' : 'w-24 h-24';
    
    return (
      <div className={`${sizeClass} rounded-full overflow-hidden bg-gray-200 flex-shrink-0 ring-4 ring-white/20`}>
        <img 
          src={data.personalInfo.profilePicture} 
          alt="Profile" 
          className="w-full h-full object-cover"
        />
      </div>
    );
  };

  return (
    <div className={`${styles.container} min-h-[800px] text-sm print:text-xs shadow-2xl transition-all duration-300`}>
      {/* Header */}
      <div className={`${styles.header} p-6 print:p-4`}>
        <div className={styles.profileSection}>
          {(template === 'modern' || template === 'creative' || template === 'dark' || template === 'gradient') && renderProfilePicture()}
          
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
              EXECUTIVE SUMMARY
            </h2>
            <p className={`${textColor} leading-relaxed text-justify`}>
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
            <div className="space-y-5">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className={`font-bold text-base ${headingColor}`}>{exp.jobTitle}</h3>
                      <p className={`${styles.accent} font-semibold`}>
                        {exp.company} {exp.location && `• ${exp.location}`}
                      </p>
                    </div>
                    <div className={`${textColor} text-sm flex items-center font-medium`}>
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  <ul className={`space-y-1.5 ${textColor} ml-2`}>
                    {exp.achievements.filter(ach => ach.trim()).map((achievement, index) => (
                      <li key={index} className="flex items-start">
                        <span className={`${template === 'dark' || template === 'gradient' ? 'text-gray-500' : 'text-gray-400'} mr-2 mt-1`}>•</span>
                        <span className="flex-1 leading-relaxed">{achievement}</span>
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
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`font-bold ${headingColor}`}>{edu.degree}</h3>
                      <p className={`${styles.accent} font-semibold`}>{edu.institution}</p>
                      {(edu.gpa || edu.honors) && (
                        <p className={`${textColor} text-sm`}>
                          {edu.gpa && `GPA: ${edu.gpa}`}
                          {edu.gpa && edu.honors && ' • '}
                          {edu.honors}
                        </p>
                      )}
                    </div>
                    <div className={`${textColor} text-sm font-medium`}>
                      {edu.startYear && edu.graduationYear ? 
                        `${formatYear(edu.startYear)} - ${formatYear(edu.graduationYear)}` : 
                        formatYear(edu.graduationYear)
                      }
                    </div>
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
              CORE COMPETENCIES
            </h2>
            <div className="space-y-3">
              {data.skills.technical.length > 0 && (
                <div>
                  <h4 className={`font-semibold ${headingColor} mb-1`}>Technical Expertise:</h4>
                  <p className={`${textColor} leading-relaxed`}>{data.skills.technical.join(' • ')}</p>
                </div>
              )}
              {data.skills.soft.length > 0 && (
                <div>
                  <h4 className={`font-semibold ${headingColor} mb-1`}>Professional Skills:</h4>
                  <p className={`${textColor} leading-relaxed`}>{data.skills.soft.join(' • ')}</p>
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
                <div className="space-y-2">
                  {data.skills.languages.map((lang, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className={`${headingColor} font-medium`}>{lang.language}</span>
                      <span className={`${textColor} text-sm px-2 py-1 rounded bg-gray-100 dark:bg-gray-800`}>{lang.level}</span>
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
                <ul className="space-y-2">
                  {data.skills.certifications.map((cert, index) => (
                    <li key={index} className="flex items-start">
                      <span className={`${template === 'dark' || template === 'gradient' ? 'text-gray-500' : 'text-gray-400'} mr-2 mt-1`}>•</span>
                      <div className="flex-1">
                        <span className={`${textColor} font-medium`}>{cert.name}</span>
                        {cert.link && (
                          <a 
                            href={cert.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`ml-2 inline-flex items-center ${styles.accent} hover:underline text-xs`}
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
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
