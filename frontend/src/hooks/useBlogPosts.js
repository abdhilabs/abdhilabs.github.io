import { useState, useEffect } from 'react';
import { calculateReadingTime, parseFrontmatter, getYear, generateSlug } from '../utils/blogUtils';

const useBlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch the list of posts
        const listResponse = await fetch('/blog/posts.json');
        if (!listResponse.ok) throw new Error('Failed to fetch posts list');
        const postFiles = await listResponse.json();

        // Fetch each post
        const postsData = await Promise.all(
          postFiles.map(async (filename) => {
            const response = await fetch(`/blog/${filename}`);
            if (!response.ok) throw new Error(`Failed to fetch ${filename}`);
            const rawContent = await response.text();
            
            const { data, content } = parseFrontmatter(rawContent);
            const slug = generateSlug(filename);
            
            return {
              id: slug,
              slug,
              title: data.title || 'Untitled',
              excerpt: data.excerpt || '',
              date: data.date || new Date().toISOString().split('T')[0],
              year: getYear(data.date || new Date().toISOString()),
              content,
              readTime: calculateReadingTime(content)
            };
          })
        );

        // Sort by date (newest first)
        postsData.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(postsData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};

export default useBlogPosts;
