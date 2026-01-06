import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { blogPosts } from '../data/mock';
import { cn } from '../lib/utils';

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
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            {year}
          </h3>
          <div className="space-y-2">
            {postsByYear[year].map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className={cn(
                  "block p-3 -mx-3 rounded-lg transition-all duration-200",
                  selectedSlug === post.slug
                    ? "bg-blue-50 text-blue-600"
                    : "hover:bg-gray-50 text-gray-900"
                )}
              >
                <h4 className="font-medium mb-1 line-clamp-2">{post.title}</h4>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <time>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
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
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>Select a post to read</p>
      </div>
    );
  }

  return (
    <article className="max-w-2xl">
      <button
        onClick={() => navigate('/blog')}
        className="lg:hidden flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to posts
      </button>

      <header className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <time>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </span>
        </div>
      </header>

      <div className="prose prose-gray max-w-none">
        {post.content.split('\n\n').map((paragraph, index) => {
          if (paragraph.startsWith('## ')) {
            return (
              <h2 key={index} className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                {paragraph.replace('## ', '')}
              </h2>
            );
          }
          if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
            const items = paragraph.split('\n');
            return (
              <ul key={index} className="list-disc list-inside space-y-2 my-4 text-gray-600">
                {items.map((item, i) => (
                  <li key={i}>{item.replace(/^[\d\-\.\s]+/, '')}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={index} className="text-gray-600 leading-relaxed mb-4">
              {paragraph}
            </p>
          );
        })}
      </div>
    </article>
  );
};

const BlogPage = () => {
  const { slug } = useParams();
  const selectedPost = slug ? blogPosts.find(p => p.slug === slug) : null;

  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Post List - Hidden on mobile when viewing a post */}
        <div
          className={cn(
            "w-full lg:w-80 lg:border-r border-gray-100 lg:h-screen lg:sticky lg:top-0 overflow-y-auto",
            slug ? "hidden lg:block" : "block"
          )}
        >
          <div className="p-6">
            <h1 className="text-xl font-bold text-gray-900 mb-6">Writing</h1>
            <BlogList posts={blogPosts} selectedSlug={slug} />
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
