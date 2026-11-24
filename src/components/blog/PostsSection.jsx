import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Clock, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import useBlogPosts from '../../hooks/useBlogPosts';
import { cn } from '../../lib/utils';
import { formatDate } from '../../utils/blogUtils';
import AgentAttribution from './AgentAttribution';

const SITE_BASE = 'https://abdhilabs.com';

// Honest author line for SEO metadata.
export const postAuthorName = (post) =>
  post.isAgent ? 'AI agent (curated by Abdhi)' : 'Abdhi';

// Fallback description when a post has no excerpt.
export const postMetaDescription = (post) => {
  if (post.excerpt) return post.excerpt;
  return post.isAgent
    ? `${post.title} — written by an AI agent, curated by Abdhi.`
    : `${post.title} — by Abdhi, iOS Engineer.`;
};

const PostList = ({ posts, selectedSlug, basePath }) => {
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
              <div
                key={post.id}
                className={cn(
                  "p-3 -mx-3 rounded-lg transition-all duration-200",
                  selectedSlug === post.slug
                    ? "bg-blue-50 dark:bg-blue-900/30"
                    : "hover:bg-gray-50 dark:hover:bg-gray-900/80"
                )}
              >
                <Link
                  to={`${basePath}/${post.slug}`}
                  className={cn(
                    "block",
                    selectedSlug === post.slug
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-900 dark:text-gray-100"
                  )}
                >
                  <h4 className="font-medium mb-1 line-clamp-2">{post.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
                    <time dateTime={post.date}>
                      {formatDate(post.date, { month: 'short', day: 'numeric', year: undefined })}
                    </time>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </Link>
                <AgentAttribution post={post} compact className="mt-2" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const PostView = ({ post, config }) => {
  const navigate = useNavigate();

  if (!post) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-500">
        <p>{config.emptyText}</p>
      </div>
    );
  }

  const metaDescription = postMetaDescription(post);
  const author = postAuthorName(post);
  const pageTitle = `${post.title}${config.titleSuffix}`;

  return (
    <>
      <Helmet titleTemplate="%s">
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="author" content={author} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
      </Helmet>
      <article className="max-w-2xl">
      <button
        onClick={() => navigate(config.basePath)}
        className="lg:hidden flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {config.backLabel}
      </button>

      <header className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </span>
        </div>
        <AgentAttribution post={post} className="mt-4" />
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
    </>
  );
};

const PostsSection = ({ config }) => {
  const { slug } = useParams();
  const { posts, loading, error } = useBlogPosts(config.section);
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

  const isPostView = Boolean(slug && selectedPost);

  return (
    <div className="min-h-screen">
      {!slug && (
        <Helmet titleTemplate="%s | Abdhi">
          <title>{config.heading}</title>
          <meta name="description" content={config.description} />
          {config.listAuthor && <meta name="author" content={config.listAuthor} />}
        </Helmet>
      )}
      {slug && !selectedPost && (
        <Helmet titleTemplate="%s | Abdhi">
          <title>Post not found</title>
          <meta name="description" content="The post you’re looking for doesn’t exist or has been moved." />
          <meta name="robots" content="noindex" />
          <link rel="canonical" href={`${SITE_BASE}${config.basePath}`} />
        </Helmet>
      )}
      <div className="flex">
        {/* Post List */}
        <div
          className={cn(
            "w-full lg:w-80 lg:border-r border-gray-100 dark:border-gray-800/50 lg:h-screen lg:sticky lg:top-0 overflow-y-auto",
            slug ? "hidden lg:block" : "block"
          )}
        >
          <div className="p-6">
            {isPostView ? (
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{config.heading}</h2>
            ) : (
              <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{config.heading}</h1>
            )}
            {config.intro && (
              <p className="-mt-3 mb-6 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {config.intro}
              </p>
            )}
            <PostList posts={posts} selectedSlug={slug} basePath={config.basePath} />
          </div>
        </div>

        {/* Post Content */}
        <div
          className={cn(
            "flex-1 p-6 lg:p-12",
            !slug ? "hidden lg:flex lg:items-center lg:justify-center" : "block"
          )}
        >
          <PostView post={selectedPost} config={config} />
        </div>
      </div>
    </div>
  );
};

export default PostsSection;
