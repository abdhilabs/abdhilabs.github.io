import React from 'react';
import { Bot, ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils';
import { getSourceHandle } from '../../utils/blogUtils';

export const AGENT_BADGE_TEXT = 'Written by AI agent, curated by Abdhi';

// Visible label for posts written by an AI agent.
export const AgentBadge = ({ compact = false, className }) => (
  <span
    className={cn(
      'inline-flex items-center gap-1.5 rounded-full border font-medium',
      'border-amber-200 bg-amber-50 text-amber-800',
      'dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300',
      compact ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
      className
    )}
  >
    <Bot className={compact ? 'w-3 h-3' : 'w-3.5 h-3.5'} aria-hidden="true" />
    {AGENT_BADGE_TEXT}
  </span>
);

// "Based on a post by @handle", linking to the original post.
export const SourceCredit = ({ sourceAuthor, sourceUrl, compact = false, className }) => {
  if (!sourceAuthor && !sourceUrl) return null;
  const handle = getSourceHandle(sourceAuthor) || 'the original author';

  return (
    <p
      className={cn(
        'text-gray-500 dark:text-gray-400',
        compact ? 'text-xs' : 'text-sm',
        className
      )}
    >
      Based on a post by{' '}
      {sourceUrl ? (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => event.stopPropagation()}
          className="inline-flex items-center gap-0.5 font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          {handle}
          <ExternalLink className="w-3 h-3" aria-hidden="true" />
        </a>
      ) : (
        <span className="font-medium">{handle}</span>
      )}
    </p>
  );
};

const AgentAttribution = ({ post, compact = false, className }) => {
  if (!post?.isAgent) return null;
  return (
    <div className={cn('flex flex-col items-start', compact ? 'gap-1.5' : 'gap-2', className)}>
      <AgentBadge compact={compact} />
      <SourceCredit
        sourceAuthor={post.sourceAuthor}
        sourceUrl={post.sourceUrl}
        compact={compact}
      />
    </div>
  );
};

export default AgentAttribution;
