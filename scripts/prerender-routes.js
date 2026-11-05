/**
 * After `craco build`, write one HTML shell per route so crawlers see a unique
 * title, description, canonical URL, and Open Graph / Twitter tags before JS.
 * Also writes sitemap.xml and robots.txt from the real routes and posts.
 * The React bundle is unchanged; Helmet still updates tags after hydration.
 */
const fs = require('fs');
const path = require('path');

const SITE = 'https://abdhilabs.com';
const BUILD_DIR = path.join(__dirname, '..', 'build');

const HOME_DESCRIPTION =
  'Abdhi — iOS Engineer. Portfolio, writing, and projects. Building seamless, high-performance iOS apps with Swift and SwiftUI.';

const STATIC_PAGES = [
  {
    route: '/',
    title: 'Abdhi | iOS Engineer',
    description: HOME_DESCRIPTION,
    output: 'index.html',
  },
  {
    route: '/blog',
    title: 'Writing | Abdhi',
    description:
      'Writing by Abdhi — iOS Engineer. Articles on iOS development, Swift, and software engineering.',
    output: path.join('blog', 'index.html'),
  },
  {
    route: '/projects',
    title: 'Projects | Abdhi',
    description:
      'Projects by Abdhi — iOS Engineer. Apps and open source projects built with Swift, SwiftUI, and more.',
    output: path.join('projects', 'index.html'),
  },
  {
    route: '/resume',
    title: 'Resume | Abdhi',
    description:
      'Resume of Abdhi — iOS Engineer. Experience, education, and skills in Swift, SwiftUI, and mobile development.',
    output: path.join('resume', 'index.html'),
  },
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    return { data: {}, content };
  }

  const data = {};
  match[1].split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      data[key.trim()] = valueParts.join(':').trim();
    }
  });

  return { data, content: content.slice(match[0].length).trim() };
}

function canonicalUrl(route) {
  return route === '/' ? `${SITE}/` : `${SITE}${route}`;
}

function loadPosts() {
  const postsDir = path.join(BUILD_DIR, 'blog');
  const listPath = path.join(postsDir, 'posts.json');
  const filenames = JSON.parse(fs.readFileSync(listPath, 'utf8'));
  if (!Array.isArray(filenames) || filenames.length === 0) {
    throw new Error('public blog posts.json did not list any posts');
  }

  return filenames
    .map((filename) => {
      const raw = fs.readFileSync(path.join(postsDir, filename), 'utf8');
      const { data } = parseFrontmatter(raw);
      const slug = filename.replace(/\.md$/, '');
      const title = data.title || 'Untitled';
      return {
        slug,
        title,
        description: data.excerpt || `${title} — by Abdhi, iOS Engineer.`,
        date: data.date || '',
        route: `/blog/${slug}`,
        output: path.join('blog', slug, 'index.html'),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

function applyMeta(template, page) {
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const url = escapeHtml(page.url);
  const ogType = page.ogType || 'website';

  let html = template;
  const replacements = [
    [/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`],
    [
      /<meta name="description" content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${description}" />`,
    ],
    [
      /<meta property="og:type" content="[^"]*"\s*\/?>/,
      `<meta property="og:type" content="${ogType}" />`,
    ],
    [
      /<meta property="og:url" content="[^"]*"\s*\/?>/,
      `<meta property="og:url" content="${url}" />`,
    ],
    [
      /<meta property="og:title" content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${title}" />`,
    ],
    [
      /<meta property="og:description" content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${description}" />`,
    ],
    [
      /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:title" content="${title}" />`,
    ],
    [
      /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:description" content="${description}" />`,
    ],
  ];

  replacements.forEach(([pattern, value]) => {
    if (!pattern.test(html)) {
      throw new Error(`Built index.html is missing a tag matching ${pattern}`);
    }
    html = html.replace(pattern, value);
  });

  const canonical = `<link rel="canonical" href="${url}" />`;
  if (/<link rel="canonical" href="[^"]*"\s*\/?>/.test(html)) {
    html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, canonical);
  } else {
    if (!html.includes('<title>')) {
      throw new Error('Built index.html has no <title>');
    }
    html = html.replace('<title>', `${canonical}\n    <title>`);
  }

  return html;
}

function writePage(template, page) {
  const dest = path.join(BUILD_DIR, page.output);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const html = applyMeta(template, page);
  fs.writeFileSync(dest, html);
  assertPage(dest, page);
}

function assertPage(file, page) {
  const html = fs.readFileSync(file, 'utf8');
  const expected = [
    `<title>${escapeHtml(page.title)}</title>`,
    `<meta name="description" content="${escapeHtml(page.description)}"`,
    `<link rel="canonical" href="${escapeHtml(page.url)}"`,
    `<meta property="og:url" content="${escapeHtml(page.url)}"`,
    `<meta property="og:title" content="${escapeHtml(page.title)}"`,
    `<meta property="og:description" content="${escapeHtml(page.description)}"`,
    `<meta name="twitter:title" content="${escapeHtml(page.title)}"`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}"`,
    `<meta property="og:type" content="${page.ogType || 'website'}"`,
  ];

  expected.forEach((snippet) => {
    if (!html.includes(snippet)) {
      throw new Error(`${file} is missing ${snippet}`);
    }
  });
}

function writeSitemap(pages) {
  const urls = pages
    .map((page) => {
      const loc = `    <loc>${escapeXml(page.url)}</loc>`;
      const lastmod =
        page.date && /^\d{4}-\d{2}-\d{2}$/.test(page.date)
          ? `\n    <lastmod>${page.date}</lastmod>`
          : '';
      return `  <url>\n${loc}${lastmod}\n  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  const dest = path.join(BUILD_DIR, 'sitemap.xml');
  fs.writeFileSync(dest, xml);

  pages.forEach((page) => {
    if (!xml.includes(`<loc>${escapeXml(page.url)}</loc>`)) {
      throw new Error(`sitemap.xml is missing ${page.url}`);
    }
  });
  if (!xml.startsWith('<?xml') || !xml.includes('http://www.sitemaps.org/schemas/sitemap/0.9')) {
    throw new Error('sitemap.xml is not a urlset document');
  }
}

function writeRobots() {
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`;
  fs.writeFileSync(path.join(BUILD_DIR, 'robots.txt'), body);
}

function main() {
  const templatePath = path.join(BUILD_DIR, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error('build/index.html not found. Run this after craco build.');
  }

  const template = fs.readFileSync(templatePath, 'utf8');
  const posts = loadPosts();
  const pages = [
    ...STATIC_PAGES.map((page) => ({
      ...page,
      url: canonicalUrl(page.route),
      ogType: 'website',
    })),
    ...posts.map((post) => ({
      ...post,
      title: `${post.title} | Abdhi`,
      url: canonicalUrl(post.route),
      ogType: 'article',
    })),
  ];

  pages.forEach((page) => writePage(template, page));
  writeSitemap(pages);
  writeRobots();

  const markdownLeft = fs
    .readdirSync(path.join(BUILD_DIR, 'blog'))
    .filter((name) => name.endsWith('.md'));
  if (markdownLeft.length !== posts.length) {
    throw new Error('Prerender removed or hid blog markdown files');
  }

  console.log(`Prerendered ${pages.length} routes`);
  pages.forEach((page) => console.log(`  ${page.url} -> ${page.output}`));
  console.log('Wrote sitemap.xml and robots.txt');
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
