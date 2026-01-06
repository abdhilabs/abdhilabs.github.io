import React from 'react';
import { ExternalLink, Github, Briefcase, GraduationCap, Code } from 'lucide-react';
import { projectsData } from '../data/mock';
import { Badge } from '../components/ui/badge';

const ProjectCard = ({ project }) => {
  return (
    <div className="p-5 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200 group">
      <div className="flex items-start gap-4">
        <span className="text-3xl" role="img" aria-label={project.name}>
          {project.icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {project.name}
              </h3>
              <p className="text-sm text-gray-500">{project.tagline}</p>
            </div>
            <div className="flex items-center gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
                  aria-label="View on GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
                  aria-label="Visit project"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-3 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-xs font-normal bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsPage = () => {
  const featuredProjects = projectsData.filter(p => p.featured);
  const otherProjects = projectsData.filter(p => !p.featured);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 lg:py-16">
      <header className="mb-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Projects</h1>
        <p className="text-gray-600">
          A collection of apps and open source projects I've built over the years.
        </p>
      </header>

      {/* Featured Projects */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Featured
        </h2>
        <div className="space-y-4">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Other Projects
          </h2>
          <div className="space-y-4">
            {otherProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProjectsPage;
