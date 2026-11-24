import { useState, useEffect } from 'react';
import {
  calculateReadingTime,
  parseFrontmatter,
  parseDate,
  getYear,
  generateSlug,
  todayDateString,
  isAgentAuthor,
} from '../utils/blogUtils';

// Loads markdown posts listed in `/<section>/posts.json`.
// `section` is "blog" for Abdhi's own writing and "notes" for agent-written posts.
const useBlogPosts = (section = 'blog') => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch the list of posts
        const listResponse = await fetch(`/${section}/posts.json`);
        if (!listResponse.ok) throw new Error('Failed to fetch posts list');
        const postFiles = await listResponse.json();

        // Fetch each post
        const postsData = await Promise.all(
          postFiles.map(async (filename) => {
            const response = await fetch(`/${section}/${filename}`);
            if (!response.ok) throw new Error(`Failed to fetch ${filename}`);
            const rawContent = await response.text();

            const { data, content } = parseFrontmatter(rawContent);
            const slug = generateSlug(filename);
            const date = data.date || todayDateString();

            return {
              id: slug,
              slug,
              title: data.title || 'Untitled',
              excerpt: data.excerpt || '',
              date,
              year: getYear(date),
              author: data.author || '',
              isAgent: isAgentAuthor(data.author),
              sourceAuthor: data.source_author || '',
              sourceUrl: data.source_url || '',
              content,
              readTime: calculateReadingTime(content)
            };
          })
        );

        // Sort by date (newest first)
        postsData.sort((a, b) => parseDate(b.date) - parseDate(a.date));
        if (!cancelled) setPosts(postsData);
      } catch (err) {
        if (!cancelled) setError(err.message);
        console.error('Error fetching blog posts:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchPosts();
    return () => {
      cancelled = true;
    };
  }, [section]);

  return { posts, loading, error };
};

export default useBlogPosts;
