import React from 'react';
import { Briefcase, GraduationCap, Mail } from 'lucide-react';
import { resumeData, profileData } from '../data/mock';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

const ExperienceCard = ({ experience }) => {
  return (
    <div className="relative pl-6 pb-8 last:pb-0 group">
      {/* Timeline line */}
      <div className="absolute left-0 top-2 bottom-0 w-px bg-gray-200 dark:bg-gray-800 group-last:hidden" />
      {/* Timeline dot */}
      <div className="absolute left-[-3px] top-2 w-[7px] h-[7px] rounded-full bg-gray-300 dark:bg-gray-700 group-hover:bg-blue-500 transition-colors" />
      
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{experience.role}</h3>
            <p className="text-gray-600 dark:text-gray-400">{experience.company}</p>
          </div>
          <span className="text-sm text-gray-400 dark:text-gray-600 whitespace-nowrap">
            {experience.period}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {experience.description}
        </p>
        {experience.highlights && (
          <ul className="space-y-1">
            {experience.highlights.map((highlight, index) => (
              <li key={index} className="text-sm text-gray-500 dark:text-gray-500 flex items-start gap-2">
                <span className="text-gray-300 dark:text-gray-700 mt-1.5">•</span>
                {highlight}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const EducationCard = ({ education }) => {
  return (
    <div className="space-y-1">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">{education.degree}</h3>
          <p className="text-gray-600 dark:text-gray-400">{education.school}</p>
        </div>
        <span className="text-sm text-gray-400 dark:text-gray-600 whitespace-nowrap">
          {education.period}
        </span>
      </div>
      {education.description && (
        <p className="text-sm text-gray-500 dark:text-gray-500">{education.description}</p>
      )}
    </div>
  );
};

const ResumePage = () => {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12 lg:py-16">
      <header className="mb-10">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Resume</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          A summary of my professional experience and education.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-gray-200 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-white"
          onClick={() => window.open(`mailto:${profileData.social.email}`, '_blank')}
        >
          <Mail className="w-4 h-4" />
          Get in touch
        </Button>
      </header>

      {/* Experience */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Briefcase className="w-5 h-5 text-gray-400 dark:text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Experience</h2>
        </div>
        <div className="ml-2">
          {resumeData.experience.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <GraduationCap className="w-5 h-5 text-gray-400 dark:text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Education</h2>
        </div>
        <div className="space-y-4">
          {resumeData.education.map((edu) => (
            <EducationCard key={edu.id} education={edu} />
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <svg className="w-5 h-5 text-gray-400 dark:text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Skills</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 font-normal border-0"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResumePage;
