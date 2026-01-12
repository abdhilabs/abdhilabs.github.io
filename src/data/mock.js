// Mock data for the personal portfolio website

export const profileData = {
  name: "Muhamad Riza Abdhi Purnama",
  title: "iOS Engineer",
  company: "Building apps at NBS(nbs.co.id)",
  location: "Bandung, Indonesia",
  bio: "I'm an iOS engineer passionate about building <b class=\"font-semibold text-gray-900 dark:text-gray-200\">seamless, high-performance apps</b> that prioritize <b class=\"font-semibold text-gray-900 dark:text-gray-200\">user experience</b>, while ensuring <b class=\"font-semibold text-gray-900 dark:text-gray-200\">clean, maintainable code</b>. Known for a <b class=\"font-semibold text-gray-900 dark:text-gray-200\">meticulous approach to best practices</b> and delivering <b class=\"font-semibold text-gray-900 dark:text-gray-200\">efficient, scalable, and well-structured solutions</b>. Over the past <b class=\"font-semibold text-gray-900 dark:text-gray-200\">4 years</b>, I’ve delivered and maintained iOS apps across <b class=\"font-semibold text-gray-900 dark:text-gray-200\">banking, e-commerce, fintech, media, and news</b>.",
  avatar: "https://media.licdn.com/dms/image/v2/C5103AQEXDfWt-INtIg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1582125181592?e=1769040000&v=beta&t=lxiif39ffUkWVNdDtgU-008ytoDgeAyAiZHFiE2xfNk",
  social: {
    twitter: "https://twitter.com/mrdhip",
    github: "https://github.com/abdhilabs",
    linkedin: "https://www.linkedin.com/in/rizaabdhi",
    email: "rizaabdhi@gmail.com"
  }
};

export const resumeData = {
  experience: [
    {
      id: "1",
      company: "Nusantara Beta Studio (NBS)",
      role: "Mobile Engineer – iOS",
      period: "July 2021 — Present",
      description:
        "IT consulting firm specializing in mobile and web application development, UI/UX design, and end-to-end software delivery for startups and enterprises.",
      highlights: [
        "Delivered multiple iOS applications across banking, e-commerce, fintech, media, and news domains",
        "Built several projects from scratch, from initial setup to production release",
        "Conducted regular code reviews to improve code quality, maintainability, and best practices",
        "Built reusable UI components and internal design systems to improve development speed and consistency",
        "Collaborated closely with product managers, designers, backend engineers, and QA teams",
        "Maintained and enhanced existing applications through feature improvements and bug fixes"
      ]
    },
    {
      id: "2",
      company: "Heptaco",
      role: "Mobile Developer",
      period: "December 2020 — June 2021",
      description:
        "End-to-end e-commerce enabler helping brands scale online sales through digital marketing, marketplace operations, fulfillment, and internal tools.",
      highlights: [
        "Implemented and enhanced transactional features across Dashboard and Keyboard modules, including search, voucher management, and UI improvements, while maintaining application stability through ongoing bug fixes and optimizations",
        "Built Explore Jogja App and Explore Jogja Scanner from scratch. And handled ongoing maintenance and feature enhancements post-release"
      ]
    }
  ],
  education: [
    {
      id: "1",
      school: "Apple Developer Academy @Infinite Learning",
      degree: "iOS Development Program",
      period: "2022"
    },
    {
      id: "2",
      school: "Bangkit Academy",
      degree: "Mobile Development(Android) Track",
      period: "2021"
    },
    {
      id: "3",
      school: "AMIKOM Yogyakarta University",
      degree: "Bachelor's degree in Computer Science",
      period: "2018 — 2021"
    }
  ],
  skills: [
    "Swift", "SwiftUI", "UIKit", "MVVM", "Clean Architecture", "RESTful APIs",
    "Firebase", "Core Data", "Combine", "Swift Concurrency", "Git", "Xcode",
    "CI/CD", "Unit Testing", "Code Review"
  ]
};

export const projectsData = [
  {
    id: "1",
    name: "GameRAW",
    tagline: "Browse, search, and favorite games on iOS.",
    description:
      "An iOS app that displays a list of games, lets you search games you want, and saves selected games as favorites in a local database. Features: List Games, Search Games, Favorite Games, and Game Detail.",
    icon: "🎮",
    link: "https://github.com/abdhilabs/GameRAW",
    github: "https://github.com/abdhilabs/GameRAW",
    tech: ["Swift", "SwiftUI", "Core Data", "SPM", "Modularization", "Dependency Injection"],
    featured: true
  },
  {
    id: "2",
    name: "Socgent",
    tagline: "Capture, tag, and reuse social links fast.",
    description:
      "A lightweight iOS app to capture a social link or handle, tag it by platform, and keep a recent list for quick reuse. Features: quick platform chips, recent list with tap-to-use and delete, and light/dark theme toggle.",
    icon: "🔗",
    link: "https://github.com/abdhilabs/Socgent",
    github: "https://github.com/abdhilabs/Socgent",
    tech: ["SwiftUI", "The Composable Architecture (TCA)", "SwiftData", "Moya", "SwiftLint", "XcodeGen"],
    featured: true
  }
];

export const navigationItems = [
  { name: "Home", path: "/", icon: "Home" },
  { name: "Blog", path: "/blog", icon: "PenLine" },
  { name: "Projects", path: "/projects", icon: "Layers" },
  { name: "Resume", path: "/resume", icon: "FileText" }
];
