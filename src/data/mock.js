// Mock data for the personal portfolio website

export const profileData = {
  name: "Alex Chen",
  title: "iOS Engineer",
  company: "Building apps at Stripe",
  location: "San Francisco, CA",
  bio: "I'm an iOS engineer passionate about crafting delightful mobile experiences. Currently building payment infrastructure at Stripe. Previously at Apple and Airbnb.",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  social: {
    twitter: "https://twitter.com/alexchen",
    github: "https://github.com/alexchen",
    linkedin: "https://linkedin.com/in/alexchen",
    email: "alex@example.com"
  }
};

export const blogPosts = [
  {
    id: "1",
    slug: "building-better-ios-apps",
    title: "Building Better iOS Apps with SwiftUI",
    excerpt: "Lessons learned from migrating a large UIKit codebase to SwiftUI, and why it was worth the effort.",
    content: `SwiftUI has fundamentally changed how we build iOS applications. After spending the last year migrating our main app from UIKit to SwiftUI, I wanted to share some lessons learned.\n\n## The Good\n\nSwiftUI's declarative syntax makes UI code significantly more readable. What used to take 100 lines of UIKit code can often be expressed in 20 lines of SwiftUI.\n\n## The Challenges\n\nNot everything was smooth sailing. We encountered issues with:\n- Navigation complexity in larger apps\n- Performance with large lists\n- Interoperability with existing UIKit components\n\n## Key Takeaways\n\n1. Start with new features, not rewrites\n2. Build a strong component library\n3. Embrace the declarative mindset\n\nOverall, the investment has paid off in developer productivity and code maintainability.`,
    date: "2025-06-15",
    year: "2025",
    readTime: "8 min read"
  },
  {
    id: "2",
    slug: "design-systems-mobile",
    title: "Design Systems for Mobile Applications",
    excerpt: "How we built a scalable design system that works across iOS, Android, and web platforms.",
    content: `A design system is more than just a component library. It's a shared language between designers and developers that ensures consistency across your product.\n\n## Our Approach\n\nWe started by auditing our existing components and identifying patterns. This revealed:\n- 47 different button styles\n- 12 variations of input fields\n- Inconsistent spacing throughout the app\n\n## The Solution\n\nWe created a token-based system that defines:\n- Colors and themes\n- Typography scales\n- Spacing units\n- Component variants\n\nThis allowed us to maintain consistency while still allowing flexibility for edge cases.`,
    date: "2025-04-22",
    year: "2025",
    readTime: "6 min read"
  },
  {
    id: "3",
    slug: "performance-optimization",
    title: "iOS Performance Optimization Deep Dive",
    excerpt: "Techniques for identifying and fixing performance bottlenecks in iOS applications.",
    content: `Performance isn't just about speed—it's about creating a responsive experience that users trust.\n\n## Measuring Performance\n\nBefore optimizing, you need to measure. We use:\n- Instruments for profiling\n- Custom metrics for business-critical flows\n- Real-device testing across generations\n\n## Common Bottlenecks\n\n1. **Main thread blocking**: Move heavy work off the main thread\n2. **Memory pressure**: Profile and reduce allocations\n3. **Network latency**: Implement proper caching strategies\n\n## Results\n\nAfter three months of focused optimization, we reduced app launch time by 40% and eliminated 90% of frame drops.`,
    date: "2025-02-10",
    year: "2025",
    readTime: "10 min read"
  },
  {
    id: "4",
    slug: "swift-concurrency",
    title: "Embracing Swift Concurrency",
    excerpt: "A practical guide to async/await and actors in real-world iOS development.",
    content: `Swift Concurrency represents a major shift in how we write asynchronous code. Here's how we've adopted it in production.\n\n## From Callbacks to Async/Await\n\nThe transformation is dramatic. Code that was once nested callbacks is now linear and readable.\n\n## Actors for Thread Safety\n\nActors have eliminated entire categories of bugs related to data races. We've converted our core data managers to actors with excellent results.\n\n## Migration Strategy\n\nWe took an incremental approach, starting with new code and gradually migrating existing async operations.`,
    date: "2024-11-05",
    year: "2024",
    readTime: "7 min read"
  },
  {
    id: "5",
    slug: "career-growth-engineering",
    title: "Growing as a Senior Engineer",
    excerpt: "Reflections on what it means to be senior and how to continue growing in your career.",
    content: `After five years in the industry, I've been reflecting on what "senior" really means and how to keep growing.\n\n## Beyond Code\n\nSeniority isn't just about writing better code. It's about:\n- Mentoring others\n- Making technical decisions\n- Communicating effectively\n- Understanding business context\n\n## Continuous Learning\n\nThe tech industry moves fast. I dedicate time each week to:\n- Reading technical papers\n- Experimenting with new technologies\n- Contributing to open source\n\n## Finding Your Path\n\nThere's no single path to growth. Some become managers, others go deep technically. The key is intentionality.`,
    date: "2024-08-20",
    year: "2024",
    readTime: "5 min read"
  }
];

export const resumeData = {
  experience: [
    {
      id: "1",
      company: "Stripe",
      role: "Senior iOS Engineer",
      period: "2023 — Present",
      description: "Building payment infrastructure for the mobile platform. Leading the iOS SDK team and driving adoption of SwiftUI across the organization.",
      highlights: [
        "Led migration of core payment flows to SwiftUI",
        "Reduced SDK integration time by 60%",
        "Mentoring 3 junior engineers"
      ]
    },
    {
      id: "2",
      company: "Airbnb",
      role: "iOS Engineer",
      period: "2021 — 2023",
      description: "Worked on the host experience team, building features that helped millions of hosts manage their listings.",
      highlights: [
        "Shipped redesigned calendar management feature",
        "Improved app performance by 35%",
        "Contributed to design system adoption"
      ]
    },
    {
      id: "3",
      company: "Apple",
      role: "iOS Engineer",
      period: "2019 — 2021",
      description: "Part of the UIKit team, working on core framework improvements and new APIs for developers.",
      highlights: [
        "Contributed to UICollectionView diffable data sources",
        "Fixed critical accessibility bugs",
        "Authored internal documentation and guides"
      ]
    },
    {
      id: "4",
      company: "Freelance",
      role: "iOS Developer",
      period: "2017 — 2019",
      description: "Built iOS applications for startups and small businesses while completing my degree.",
      highlights: [
        "Delivered 8 apps to the App Store",
        "Worked with clients across healthcare and fintech",
        "Built lasting client relationships"
      ]
    }
  ],
  education: [
    {
      id: "1",
      school: "Stanford University",
      degree: "B.S. Computer Science",
      period: "2015 — 2019",
      description: "Focused on human-computer interaction and mobile computing."
    }
  ],
  skills: [
    "Swift", "SwiftUI", "UIKit", "Objective-C", "Xcode",
    "Core Data", "Combine", "Swift Concurrency", "Git",
    "CI/CD", "Unit Testing", "UI Testing", "Accessibility"
  ]
};

export const projectsData = [
  {
    id: "1",
    name: "Focusly",
    tagline: "Minimalist focus timer for iOS",
    description: "A beautifully simple Pomodoro timer that helps you stay focused. Features customizable sessions, statistics tracking, and Apple Watch support.",
    icon: "⏱️",
    link: "https://apps.apple.com",
    github: "https://github.com/alexchen/focusly",
    tech: ["Swift", "SwiftUI", "WidgetKit", "WatchOS"],
    featured: true
  },
  {
    id: "2",
    name: "Expense Tracker",
    tagline: "Personal finance made simple",
    description: "Track your expenses with ease. Supports multiple currencies, categories, and generates beautiful reports to help you understand your spending.",
    icon: "💰",
    link: "https://apps.apple.com",
    github: "https://github.com/alexchen/expense-tracker",
    tech: ["Swift", "Core Data", "Charts", "CloudKit"],
    featured: true
  },
  {
    id: "3",
    name: "CodeSnippets",
    tagline: "Your personal code library",
    description: "Save, organize, and sync your code snippets across all your Apple devices. Features syntax highlighting for 50+ languages.",
    icon: "📝",
    link: "https://apps.apple.com",
    github: "https://github.com/alexchen/codesnippets",
    tech: ["Swift", "SwiftUI", "iCloud", "Highlightr"],
    featured: false
  },
  {
    id: "4",
    name: "WeatherNow",
    tagline: "Hyper-local weather updates",
    description: "Get accurate weather forecasts with a beautiful, glanceable interface. Includes widgets, complications, and severe weather alerts.",
    icon: "🌤️",
    link: "https://apps.apple.com",
    tech: ["Swift", "WeatherKit", "WidgetKit", "MapKit"],
    featured: false
  },
  {
    id: "5",
    name: "swift-ui-kit",
    tagline: "Open source SwiftUI components",
    description: "A collection of reusable SwiftUI components that I've built and refined over the years. Used by 500+ developers.",
    icon: "🧩",
    github: "https://github.com/alexchen/swift-ui-kit",
    tech: ["Swift", "SwiftUI", "SPM"],
    featured: true
  }
];

export const navigationItems = [
  { name: "Home", path: "/", icon: "Home" },
  { name: "Blog", path: "/blog", icon: "PenLine" },
  { name: "Projects", path: "/projects", icon: "Layers" },
  { name: "Resume", path: "/resume", icon: "FileText" }
];
