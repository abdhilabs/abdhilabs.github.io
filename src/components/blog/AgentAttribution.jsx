import React from 'react';
import { Bot } from 'lucide-react';
import { cn } from '../../lib/utils';
import AGENT_SECTION from '../../data/agentSection.json';

export const AGENT_BADGE_TEXT = AGENT_SECTION.badge;

// Small visible label for posts written by an AI agent.
// The source is credited once, at the end of the article itself.
const AgentAttribution = ({ post, compact = false, className }) => {
  if (!post?.isAgent) return null;
  return (
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
};

export default AgentAttribution;
