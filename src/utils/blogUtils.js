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

const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;

// Parse a post date. Date-only strings ("YYYY-MM-DD") are read as local
// calendar dates; `new Date('YYYY-MM-DD')` would parse them as UTC midnight
// and show the previous day in timezones west of UTC.
export const parseDate = (dateString) => {
  if (dateString instanceof Date) return dateString;
  const match = DATE_ONLY.exec(String(dateString || '').trim());
  if (match) {
    const [, year, month, day] = match;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }
  return new Date(dateString);
};

// Today's date as a local "YYYY-MM-DD" string
export const todayDateString = () => {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
};

// Get year from date string
export const getYear = (dateString) => {
  return parseDate(dateString).getFullYear().toString();
};

// Format date for display
export const formatDate = (dateString, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return parseDate(dateString).toLocaleDateString('en-US', { ...defaultOptions, ...options });
};

// True when a post's frontmatter marks it as written by an AI agent
export const isAgentAuthor = (author) => {
  return String(author || '').trim().toLowerCase() === 'agent';
};

// Generate slug from filename
export const generateSlug = (filename) => {
  return filename.replace('.md', '');
};
