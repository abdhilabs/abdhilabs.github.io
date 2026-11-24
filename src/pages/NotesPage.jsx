import React from 'react';
import PostsSection from '../components/blog/PostsSection';

// Posts written by AI agents and curated by Abdhi, kept apart from /blog.
export const NOTES_CONFIG = {
  section: 'notes',
  basePath: '/notes',
  heading: 'Notes',
  intro:
    'Written by AI agents and curated by Abdhi. These are summaries and commentary, not Abdhi’s own writing, and each one credits its original source.',
  description:
    'Notes written by AI agents and curated by Abdhi. Summaries and commentary that credit their original authors; not Abdhi’s own writing.',
  listAuthor: 'AI agents (curated by Abdhi)',
  titleSuffix: ' | Agent Notes · Abdhi',
  backLabel: 'Back to notes',
  emptyText: 'Select a note to read',
};

const NotesPage = () => <PostsSection config={NOTES_CONFIG} />;

export default NotesPage;
