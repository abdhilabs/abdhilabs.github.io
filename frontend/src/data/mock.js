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

// Blog posts are now loaded from markdown files in /public/blog/
// To add a new post:
// 1. Create a new .md file in /public/blog/
// 2. Add frontmatter with title, excerpt, and date
// 3. Add the filename to /public/blog/posts.json
// Reading time is calculated automatically based on word count

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
