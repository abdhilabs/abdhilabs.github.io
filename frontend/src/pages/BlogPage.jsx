import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import useBlogPosts from '../hooks/useBlogPosts';
import { cn } from '../lib/utils';
import { formatDate } from '../utils/blogUtils';

const BlogList = ({ posts, selectedSlug }) => {
  // Group posts by year
  const postsByYear = posts.reduce((acc, post) => {
    if (!acc[post.year]) acc[post.year] = [];
    acc[post.year].push(post);
    return acc;
  }, {});

  const years = Object.keys(postsByYear).sort((a, b) => b - a);

  return (
    <div className="space-y-8">
      {years.map((year) => (
        <div key={year}>
          <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-wider mb-4">
            {year}
          </h3>
          <div className="space-y-1">
            {postsByYear[year].map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className={cn(
                  "block p-3 -mx-3 rounded-lg transition-all duration-200",
                  selectedSlug === post.slug
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-50 dark:hover:bg-gray-900/80 text-gray-900 dark:text-gray-100"
                )}
              >
                <h4 className="font-medium mb-1 line-clamp-2">{post.title}</h4>
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
                  <time>
                    {formatDate(post.date, { month: 'short', day: 'numeric', year: undefined })}
                  </time>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const BlogPost = ({ post }) => {
  const navigate = useNavigate();

  if (!post) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-500">
        <p>Select a post to read</p>
      </div>
    );
  }

  return (
    <article className="max-w-2xl">
      <button
        onClick={() => navigate('/blog')}
        className="lg:hidden flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to posts
      </button>

      <header className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
          <time>{formatDate(post.date)}</time>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </span>
        </div>
      </header>

      <div className="prose prose-gray dark:prose-invert max-w-none
        prose-headings:font-semibold
        prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-gray-900 dark:prose-h2:text-white
        prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-gray-900 dark:prose-h3:text-white
        prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-relaxed prose-p:my-4
        prose-li:text-gray-600 dark:prose-li:text-gray-400 prose-li:my-1
        prose-ul:my-4 prose-ol:my-4
        prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
        prose-code:text-sm prose-code:font-mono prose-code:text-gray-800 dark:prose-code:text-gray-200 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:my-6 prose-pre:p-4 prose-pre:overflow-x-auto
        prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
        prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-700 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
        prose-hr:border-gray-200 dark:prose-hr:border-gray-800
      ">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
};

const BlogPage = () => {
  const { slug } = useParams();
  const { posts, loading, error } = useBlogPosts();
  const selectedPost = slug ? posts.find(p => p.slug === slug) : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        <p>Error loading posts: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Post List */}
        <div
          className={cn(
            "w-full lg:w-80 lg:border-r border-gray-100 dark:border-gray-800/50 lg:h-screen lg:sticky lg:top-0 overflow-y-auto",
            slug ? "hidden lg:block" : "block"
          )}
        >
          <div className="p-6">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Writing</h1>
            <BlogList posts={posts} selectedSlug={slug} />
          </div>
        </div>

        {/* Post Content */}
        <div
          className={cn(
            "flex-1 p-6 lg:p-12",
            !slug ? "hidden lg:flex lg:items-center lg:justify-center" : "block"
          )}
        >
          <BlogPost post={selectedPost} />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
