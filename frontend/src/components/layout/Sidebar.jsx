import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, PenLine, Layers, FileText, Github, Twitter, Linkedin, Mail, Menu, X } from 'lucide-react';
import { profileData, navigationItems } from '../../data/mock';
import { cn } from '../../lib/utils';

const iconMap = {
  Home: Home,
  PenLine: PenLine,
  Layers: Layers,
  FileText: FileText
};

const Sidebar = ({ isOpen, onToggle }) => {
  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50 flex items-center justify-between px-4">
        <span className="font-semibold text-gray-900">{profileData.name}</span>
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 z-40"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-gray-50/80 backdrop-blur-sm border-r border-gray-100 z-50 transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-6">
          {/* Profile Section */}
          <div className="mb-8 pt-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={profileData.avatar}
                alt={profileData.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h1 className="font-semibold text-gray-900 text-sm">{profileData.name}</h1>
                <p className="text-xs text-gray-500">{profileData.title}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={() => onToggle && window.innerWidth < 1024 && onToggle()}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                          isActive
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                        )
                      }
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Social Links */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <a
                href={profileData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-white/50 transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profileData.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-white/50 transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={profileData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-white/50 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profileData.social.email}`}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-white/50 transition-all duration-200"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
