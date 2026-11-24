import {
  parseDate,
  formatDate,
  getYear,
  parseFrontmatter,
  isAgentAuthor,
  getSourceHandle,
} from './blogUtils';

describe('date-only strings', () => {
  it('parse as local calendar dates, not UTC midnight', () => {
    const date = parseDate('2026-11-24');
    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(10);
    expect(date.getDate()).toBe(24);
  });

  it('format without shifting a day', () => {
    expect(formatDate('2026-01-01')).toBe('January 1, 2026');
    expect(getYear('2026-01-01')).toBe('2026');
  });
});

describe('frontmatter', () => {
  it('keeps colons inside values such as URLs', () => {
    const { data, content } = parseFrontmatter(
      '---\ntitle: A: B\nauthor: agent\nsource_url: https://x.com/a/status/1\n---\n\nBody'
    );
    expect(data.title).toBe('A: B');
    expect(data.source_url).toBe('https://x.com/a/status/1');
    expect(isAgentAuthor(data.author)).toBe(true);
    expect(content).toBe('Body');
  });
});

describe('attribution helpers', () => {
  it('only treats author: agent as an agent post', () => {
    expect(isAgentAuthor('Agent')).toBe(true);
    expect(isAgentAuthor('Abdhi')).toBe(false);
    expect(isAgentAuthor(undefined)).toBe(false);
  });

  it('extracts the @handle from source_author', () => {
    expect(getSourceHandle('charu (@charureadss)')).toBe('@charureadss');
    expect(getSourceHandle('Jane Doe')).toBe('Jane Doe');
  });
});
