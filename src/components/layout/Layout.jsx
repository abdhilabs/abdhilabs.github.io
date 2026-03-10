import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Sidebar from './Sidebar';
import { useSidebar } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';

const SITE_BASE = 'https://abdhilabs.com';
const defaultTitle = 'Abdhi | iOS Engineer';
const defaultDescription = 'Abdhi — iOS Engineer. Portfolio, writing, and projects. Building seamless, high-performance iOS apps with Swift and SwiftUI.';

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isExpanded } = useSidebar();
  const location = useLocation();
  // Exclude query params; strip trailing slash (except root) for consistency with analytics and to avoid duplicate-content signals.
  const pathname = location.pathname || '/';
  const pathnameNoTrailing = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  const canonicalUrl = `${SITE_BASE}${pathnameNoTrailing}`;

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Helmet defaultTitle={defaultTitle} titleTemplate="%s | Abdhi">
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="description" content={defaultDescription} />
      </Helmet>
      <Sidebar isMobileOpen={mobileOpen} onMobileToggle={toggleMobile} />
      
      {/* Main Content */}
      <main className={cn(
        "min-h-screen transition-all duration-300",
        isExpanded ? "lg:ml-64" : "lg:ml-0 lg:pl-16"
      )}>
        <div className="pt-16 lg:pt-0">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
