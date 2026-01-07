import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { profileData, projectsData } from '../data/mock';
import useBlogPosts from '../hooks/useBlogPosts';
import { formatDate } from '../utils/blogUtils';

const HomePage = () => {
  const { posts, loading } = useBlogPosts();
  const recentPosts = posts.slice(0, 3);
  const featuredProjects = projectsData.filter(p => p.featured).slice(0, 3);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 lg:py-16">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="flex items-start gap-5 mb-6">
          <img
            src={profileData.avatar}
            alt={profileData.name}
            className="w-20 h-20 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-800"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {profileData.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-2">{profileData.company}</p>
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-500">
              <MapPin className="w-3.5 h-3.5" />
              <span>{profileData.location}</span>
            </div>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
          {profileData.bio}
        </p>
      </section>

      {/* Recent Writing */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Writing</h2>
          <Link
            to="/blog"
            className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
          >
            View all
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        <div className="space-y-1">
          {loading ? (
            <div className="text-gray-500 dark:text-gray-500">Loading posts...</div>
          ) : (
            recentPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="block group"
              >
                <article className="p-4 -mx-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900/80 transition-colors duration-200">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-500 line-clamp-1">
                        {post.excerpt}
                      </p>
                    </div>
                    <time className="text-sm text-gray-400 dark:text-gray-600 whitespace-nowrap">
                      {formatDate(post.date, { month: 'short', day: 'numeric', year: undefined })}
                    </time>
                  </div>
                </article>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* Featured Projects */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Featured Projects</h2>
          <Link
            to="/projects"
            className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
          >
            View all
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        <div className="space-y-1">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="p-4 -mx-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900/80 transition-colors duration-200 group"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl" role="img" aria-label={project.name}>
                  {project.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{project.tagline}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
