import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, PenLine, Layers, FileText, Github, Twitter, Linkedin, Mail, Menu, X } from 'lucide-react';
import { profileData, navigationItems } from '../../data/mock';
import { cn } from '../../lib/utils';
import ThemeToggle from './ThemeToggle';
import { useSidebar } from '../../context/ThemeContext';

const iconMap = {
  Home: Home,
  PenLine: PenLine,
  Layers: Layers,
  FileText: FileText
};

const Sidebar = ({ isMobileOpen, onMobileToggle }) => {
  const { isExpanded, setIsExpanded } = useSidebar();

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 z-50 flex items-center justify-between px-4">
        <span className="font-semibold text-gray-900 dark:text-gray-100">{profileData.name}</span>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            onClick={onMobileToggle}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 dark:bg-black/60 z-40 backdrop-blur-sm"
          onClick={onMobileToggle}
        />
      )}

      {/* Desktop Toggle Button - Fixed position */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "hidden lg:flex fixed top-4 left-4 z-50 items-center justify-center w-10 h-10 rounded-lg",
          "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",
          "text-gray-600 dark:text-gray-400 transition-all duration-300",
          "border border-gray-200 dark:border-gray-700"
        )}
        aria-label={isExpanded ? "Close sidebar" : "Open sidebar"}
      >
        {isExpanded ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-gray-50/95 dark:bg-black/95 backdrop-blur-md border-r border-gray-200/50 dark:border-gray-800/50 z-40 transition-all duration-300 ease-in-out",
          // Desktop: show/hide based on isExpanded
          "lg:translate-x-0",
          isExpanded ? "lg:w-64" : "lg:w-0 lg:border-r-0",
          // Mobile: show/hide based on isMobileOpen
          isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
        )}
      >
        <div className={cn(
          "flex flex-col h-full p-6 pt-20 transition-opacity duration-200",
          isExpanded || isMobileOpen ? "opacity-100" : "lg:opacity-0"
        )}>
          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={() => isMobileOpen && onMobileToggle()}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                          isActive
                            ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm dark:shadow-gray-900/50"
                            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-gray-900/60"
                        )
                      }
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Social Links & Theme Toggle */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <a
                  href={profileData.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-gray-900/60 transition-all duration-200"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={profileData.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-gray-900/60 transition-all duration-200"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={profileData.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-gray-900/60 transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${profileData.social.email}`}
                  className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-gray-900/60 transition-all duration-200"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
