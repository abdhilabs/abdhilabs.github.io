// Utility to calculate reading time based on word count
// Average reading speed: 200-250 words per minute
export const calculateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// Parse frontmatter from markdown content
export const parseFrontmatter = (content) => {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }
  
  const frontmatterString = match[1];
  const body = content.slice(match[0].length).trim();
  
  const data = {};
  frontmatterString.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      const value = valueParts.join(':').trim();
      data[key.trim()] = value;
    }
  });
  
  return { data, content: body };
};

// Get year from date string
export const getYear = (dateString) => {
  return new Date(dateString).getFullYear().toString();
};

// Format date for display
export const formatDate = (dateString, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return new Date(dateString).toLocaleDateString('en-US', { ...defaultOptions, ...options });
};

// Generate slug from filename
export const generateSlug = (filename) => {
  return filename.replace('.md', '');
};
