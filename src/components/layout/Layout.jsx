import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { useSidebar } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isExpanded } = useSidebar();

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
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
