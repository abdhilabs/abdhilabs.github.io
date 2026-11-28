import React from 'react';
import PostsSection from '../components/blog/PostsSection';
import AGENT_SECTION from '../data/agentSection.json';

// Posts written by an AI agent and curated by Abdhi, kept apart from /blog.
// The section name, route and labels live in src/data/agentSection.json.
export const READS_CONFIG = {
  section: AGENT_SECTION.slug,
  basePath: `/${AGENT_SECTION.slug}`,
  heading: AGENT_SECTION.name,
  intro: AGENT_SECTION.intro,
  description: AGENT_SECTION.description,
  listAuthor: AGENT_SECTION.listAuthor,
  titleSuffix: AGENT_SECTION.titleSuffix,
  backLabel: AGENT_SECTION.backLabel,
  emptyText: AGENT_SECTION.emptyText,
};

const ReadsPage = () => <PostsSection config={READS_CONFIG} />;

export default ReadsPage;
