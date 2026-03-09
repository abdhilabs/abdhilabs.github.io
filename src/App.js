import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider, SidebarProvider } from "./context/ThemeContext";
import Layout from "./components/layout/Layout";
import UmamiAnalytics from "./components/analytics/UmamiAnalytics";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import ProjectsPage from "./pages/ProjectsPage";
import ResumePage from "./pages/ResumePage";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <SidebarProvider>
          <div className="App">
            <BrowserRouter>
              <UmamiAnalytics />
              <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/resume" element={<ResumePage />} />
              </Routes>
              </Layout>
            </BrowserRouter>
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
