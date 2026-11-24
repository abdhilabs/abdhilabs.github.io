import React from 'react';
import PostsSection from '../components/blog/PostsSection';

// Abdhi's own writing. Agent-written posts live in the Reads section
// (src/data/agentSection.json) instead.
export const BLOG_CONFIG = {
  section: 'blog',
  basePath: '/blog',
  heading: 'Writing',
  description:
    'Writing by Abdhi — iOS Engineer. Articles on iOS development, Swift, and software engineering.',
  titleSuffix: ' | Abdhi',
  backLabel: 'Back to posts',
  emptyText: 'Select a post to read',
};

const BlogPage = () => <PostsSection config={BLOG_CONFIG} />;

export default BlogPage;
