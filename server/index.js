const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Load knowledge base
const knowledgeBasePath = path.join(__dirname, 'knowledge-base', 'riza-abdhi-linkedin.md');
let knowledgeBase = '';

try {
  knowledgeBase = fs.readFileSync(knowledgeBasePath, 'utf-8');
  console.log('✅ Knowledge base loaded');
} catch (error) {
  console.warn('⚠️ Knowledge base not found');
  knowledgeBase = '';
}

// ============ ENHANCED PATTERN MATCHING SYSTEM ============

// Q&A patterns dengan multiple keywords dan scores
const qaPatterns = [
  {
    id: 'greeting',
    keywords: ['halo', 'hai', 'hi', 'hello', 'hey', 'p', 'halo', 'hy'],
    responses: [
      "Hai! 👋 Saya asisten AI Abdhi. Tanya saja tentang:\n\n• Pengalaman kerja\n• Skills & expertise\n• Education & background\n• Awards & achievements\n• Cara menghubungi\n\nApa yang ingin kamu tahu?",
      "Halo! 🙌 Senang chat sama kamu! Mau tahu apa tentang Abdhi?",
      "Hai! 😊 Saya siap jawab pertanyaan tentang Abdhi. Mulai aja!"
    ]
  },
  {
    id: 'about',
    keywords: ['siapa', 'about', 'profile', 'perkenalkan', 'kenalan', 'abdhi itu siapa', 'dia siapa', 'nama', 'fullname', 'nama lengkap'],
    responses: [
      "**Muhamad Riza Abdhi Purnama** adalah iOS Developer dengan **4+ tahun pengalaman** dalam membangun aplikasi mobile berkualitas.\n\nPassion-nya: building seamless, high-performance apps yang memprioritaskan user experience dengan clean, maintainable code. Selaluup-to-date dengan latest tech trends! 🚀",
      "Abdhi adalah Mobile Engineer yang meticulous, passionate tentang best practices, dan terus berkembang di dunia iOS development. Alumni Apple Developer Academy 2022! 🍎"
    ]
  },
  {
    id: 'experience',
    keywords: ['pengalaman', 'experience', 'kerja', 'kerjaan', 'pekerjaan', 'karir', 'career', 'job', ' pernah kerja di', 'last job', 'currently working', 'sekarang kerja dimana'],
    responses: [
      "**Experience Abdhi:**\n\n📱 **Mobile Engineer - iOS @ NBS** (Jul 2021 - Sekarang)\n├── Working di Jakarta Selatan\n├── Fokus iOS development\n└── 4+ tahun di role ini\n\n📱 Mobile Developer @ HEPTACO (Dec 2020 - Jun 2021)\n📱 iOS/Android Developer @ KECILIN (Feb - May 2021)\n📱 Android Developer @ Widya Edu (Oct - Dec 2020)\n📱 Android Developer @ Credeva (Jun - Oct 2020)\n📱 Android Developer @ Teman Kajian (May - Jun 2020)",
      "Abdhi sudah through 7 companies dalam 2 tahun - move fast! 🚀\n\nCurrent: NBS (Nusantara Beta Studio) sebagai Mobile Engineer - iOS\nPrevious: HEPTACO, KECILIN, Widya Edu, Credeva, Teman Kajian"
    ]
  },
  {
    id: 'skills',
    keywords: ['skill', 'skills', 'keahlian', 'teknologi', 'tech', 'programming', 'coding', 'bahasa', '擅长的', 'expertise', ' expert'],
    responses: [
      "**Tech Skills:**\n\n🍎 **Primary:** iOS Development\n├── Swift\n├── SwiftUI\n└── Clean Architecture\n\n🤖 **Secondary:** Android Development\n├── Kotlin\n└── Java\n\n🎯 **Focus Areas:**\n├── Mobile architecture\n├── Clean code\n├── User experience (UX)\n└── Best practices",
      "Abdhi specialized di **iOS development** dengan Swift & SwiftUI. Punya solid foundation di mobile architecture dan UX. Also experienced di Android (Kotlin/Java). Certified dari Apple Developer Academy & Bangkit Academy! 💪"
    ]
  },
  {
    id: 'education',
    keywords: ['pendidikan', 'education', 'sekolah', 'kuliah', 'university', 'universitas', 'graduate', 'alumni', 'sarjana', 's1', 'gpa', 'ipk', 'kuliah dimana'],
    responses: [
      "**Education:**\n\n🍎 **Apple Developer Academy @ Infinite Learning** (2022)\n├── 10-month intensive program\n├── Fokus: iOS, design, professional skills\n└── Developed own apps\n\n🎓 **AMIKOM Yogyakarta** (2018 - 2021)\n├── Bachelor's degree, Informatics\n├── GPA: **3.61** 🌟\n└── Treasurer @ BEM AMIKOM\n\n🎓 **Bangkit Academy led by Google** (2021)\n└── Mobile Development (Android)\n\n📚 **Dicoding Academy** (2018 - 2021)\n└── Android & iOS Developer Path",
      "Abdhi graduate dari **Apple Developer Academy 2022** - program intensif 10 bulan dari Apple! 🎓\n\nSebelum itu: AMIKOM Yogyakarta, Informatika, GPA 3.61. Also alumni Bangkit Academy (Google-led) dan Dicoding Academy. Solid education background! 📚"
    ]
  },
  {
    id: 'certifications',
    keywords: ['sertifikasi', 'certification', 'certificate', 'bootcamp', 'academy', 'kursus', 'training'],
    responses: [
      "**Certifications & Programs:**\n\n🍎 Apple Developer Academy @ Infinite Learning (2022)\n🎓 Bangkit Academy led by Google (2021)\n📚 Dicoding Academy - Android & iOS Path\n🏅 Google Developers Kejar (2019)",
      "Abdhi punya credentials impressive:\n- Apple Developer Academy graduate 🍎\n- Bangkit Academy (Google-led) graduate\n- Complete Android & iOS path dari Dicoding\n- Google Developers Kejar participant"
    ]
  },
  {
    id: 'awards',
    keywords: ['award', 'awards', 'penghargaan', 'juara', 'achievement', 'prestasi', 'winner', 'medal', 'gold', 'seleksi'],
    responses: [
      "**Awards & Achievements:**\n\n🏆 **ASEAN Outstanding Invention & Innovation Award**\n   Thailand Inventors Day 2020 | National Research Council of Thailand\n\n🥇 **Gold Medal** - Asian Youth Innovation Awards 2020\n   Malaysia Technology Expo 2020\n\n🥇 **Gold Medal** - Thailand Inventors Day 2020\n   National Research Council of Thailand\n\n🏅 **1st Winner** - IT Competition IFest 2020\n   HIMATIF FMIPA Universitas Padjadjaran Bandung\n\n🎖️ **The Top 42** - SejutaCita Scholarship (Mar 2021)\n🎖️ **The Top 25** - Beasiswa Tunai Bumi 2020",
      "Abdhi punya **7 prestigious awards** - including international! 🏆\n\nHighlights:\n- Gold Medal Malaysia Technology Expo 2020 🥇\n- ASEAN Award Thailand 2020 🏆\n- 1st Winner IT Competition Unpad 2020 🏅\n- Multiple scholarship selections"
    ]
  },
  {
    id: 'volunteer',
    keywords: ['volunteer', 'volunteering', 'organisasi', 'organisasi', 'komunitas', 'community', 'lead', 'leadership', 'event', 'acara'],
    responses: [
      "**Volunteering & Leadership:**\n\n🎤 **WWDC Community Week** - Group Lead (May-Jun 2021)\n├── Led Asian Group Get Together\n├── Sourced & selected speakers\n└── Coordinated content & logistics\n\n👥 **DSC AmIKOM Yogyakarta** - Core Team Lead (Aug 2020 - Jun 2021)\n├── Organized events from planning to delivery\n├── Curated event materials\n├── Served as event moderator\n\n🎓 **HMIF Dedicated To School 2021** - Speaker\n└── Delivered Android development sessions\n\n💻 **Forum Asisten** - Computer Lab Assistant (Sep 2019 - Jan 2020)\n└── Mobile Programming, Algorithm, Client-Server",
      "Abdhi aktif di community - **5+ leadership roles**! 🎯\n\nLed WWDC Community Week Asian group, Core Team di DSC AmIKOM, Speaker di HMIF event, dan Computer Lab Assistant. Passionate tentang tech community! 🤝"
    ]
  },
  {
    id: 'projects',
    keywords: ['project', 'projects', 'porto', 'portfolio', 'app', 'aplikasi', 'develop', 'punya app apa', 'bikin apa'],
    responses: [
      "**Projects:**\n\n📱 **PPM One** (Mar 2020 - Aug 2020)\n├── Android app untuk AMIKOM University\n├── Monitoring jadwal & profil peserta PPM\n├── Available di Play Store\n└── Link: bit.ly/ppmone\n\n📱 **Various iOS apps** - Apple Developer Academy\n└── Developed multiple apps during academy",
      "Abdhi portfolio includes:\n- **PPM One** - Android app monitoring system (Play Store) 📲\n- **Various iOS apps** from Apple Developer Academy\n- Plus experience building apps across 7 companies!"
    ]
  },
  {
    id: 'contact',
    keywords: ['contact', 'hubungi', 'email', 'whatsapp', 'phone', 'telepon', 'linkedin', 'github', 'sosial media', 'reach', 'connect'],
    responses: [
      "**Contact Abdhi:**\n\n💼 **LinkedIn:** linkedin.com/in/rizaabdhi\n💻 **GitHub:** github.com/abdhilabs\n🌐 **Website:** abdhilabs.com\n📧 **Email:** Check LinkedIn untuk updated contact info\n\nReady untuk collaboration atau career opportunities! 🤝",
      "Connect dengan Abdhi:\n• LinkedIn: @rizaabdhi 💼\n• GitHub: @abdhilabs 💻\n• Website: abdhilabs.com 🌐"
    ]
  },
  {
    id: 'location',
    keywords: ['lokasi', 'location', 'domisili', 'tinggal', 'based', 'base', ' jakarta', 'bandung', 'indonesia', 'where'],
    responses: [
      "**Location:**\n\n📍 Based di **Jakarta/Bandung area**, Indonesia\n🌏 Open untuk remote work atau opportunities abroad\n💼 Currently working di Jakarta Selatan",
      "Abdhi based di Indonesia - Jakarta/Bandung area. Open untuk relocation atau remote opportunities! 🌍"
    ]
  },
  {
    id: 'availability',
    keywords: ['available', 'availability', 'tersedia', 'lowongan', 'rekrut', 'hire', 'hiring', 'open for work', 'freelance', 'part time', 'fulltime', ' ок'],
    responses: [
      "**Availability:**\n\n✅ **Open untuk:**\n├── Full-time iOS developer roles\n├── Freelance/contract projects\n├── Remote opportunities\n└── Relocation (siap abroad!)\n\n💡 Currently employed di NBS tapi terbuka untuk right opportunity!",
      "Abdhi **open untuk opportunities**! 🎯\n\n• Full-time iOS roles ✅\n• Freelance projects ✅\n• Remote work ✅\n• Relocation - YES! 🌍\n\nInterested recruiters: reach out via LinkedIn! 📩"
    ]
  },
  {
    id: 'salary',
    keywords: ['salary', 'gaji', 'expectation', 'expected', 'range', 'tarif', 'ongkos'],
    responses: [
      "Untuk salary discussion, lebih baik via LinkedIn direct message ya! 💼\n\nAbdhi terbuka untuk negosiasi yang fair berdasarkan role, responsibilities, dan company size. Langsung chat di LinkedIn untuk discuss lebih lanjut!",
      "Salary expectations лучше discuss via LinkedIn! 💬\n\nSetiap role berbeda - langsung DM di linkedin.com/in/rizaabdhi untuk explore opportunities!"
    ]
  },
  {
    id: 'help',
    keywords: ['help', 'bantu', 'bisa apa', 'what can you do', 'fungsi', 'guna'],
    responses: [
      "**Saya bisa bantu jawab tentang:**\n\n🤖 About Abdhi (siapa, background)\n💼 Work experience & career\n🎓 Education & certifications\n🏆 Awards & achievements\n💻 Skills & expertise\n📱 Projects & portfolio\n📍 Location & availability\n📬 Contact & how to reach\n\nTanya aja bebas! 😊",
      "Saya asisten personal brand Abdhi! 🙌\n\nTanya apapun tentang:\n- Pengalaman kerja\n- Skills & background\n- Education & awards\n- Cara menghubungi\n\nSiap membantu! 🚀"
    ]
  },
  {
    id: 'thanks',
    keywords: ['thanks', 'thank you', 'makasih', 'terima kasih', 'thx', 'ty'],
    responses: [
      "Sama-sama! 🙌\n\nKalau ada pertanyaan lagi tentang Abdhi, feel free untuk ask anytime! 😊",
      "You're welcome! 🌟\n\nHappy to help dengan info tentang Abdhi. Ada lagi yang mau ditanyakan?"
    ]
  },
  {
    id: 'goodbye',
    keywords: ['bye', 'dadah', 'sampai jumpa', 'see you', 'selamat tinggal', 'ciao'],
    responses: [
      "Sampai jumpa! 👋\n\nSemoga info-nya helpful. Come back anytime! 😊",
      "Bye! 👋\n\nGood luck dengan apapun yang kamu cari! 🚀"
    ]
  }
];

// Simple keyword matching with scoring
function findBestMatch(message) {
  const lowerMessage = message.toLowerCase();
  const words = lowerMessage.split(/\s+/);
  
  let bestMatch = null;
  let bestScore = 0;

  for (const pattern of qaPatterns) {
    let score = 0;
    
    for (const keyword of pattern.keywords) {
      if (lowerMessage.includes(keyword)) {
        // Exact word match = higher score
        if (words.includes(keyword)) {
          score += 10;
        } else {
          score += 5;
        }
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = pattern;
    }
  }

  return { match: bestMatch, score: bestScore };
}

function generateResponse(message) {
  const { match, score } = findBestMatch(message);
  
  // Threshold untuk dianggap match (score > 5)
  if (match && score > 5) {
    const responses = match.responses;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Fallback responses
  const fallbacks = [
    "Hmm, belum terlalu paham pertanyaan itu 😅\n\nTapi saya bisa bantu tentang:\n• About & background\n• Work experience\n• Skills & expertise\n• Education & awards\n• Contact info\n\nCoba pertanyaan lain ya! 😊",
    "Maaf, saya kurang yakin maksudmu 🤔\n\nTapi tenang, saya bisa jawab tentang Abdhi!\nTanya tentang experience, skills, education, projects, atau cara menghubungi! 💬",
    "Belum ngerti nih 😅\n\nMau tahu apa tentang Abdhi? Coba:\n• \"Apa experience-nya?\"\n• \"Skill apa aja?\"\n• \"Education di mana?\"\n• \"Cara hubungi?\""
  ];

  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

// ============ API ENDPOINTS ============

app.post('/api/chat', async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log(`💬 Chat: "${message}"`);

    // Generate response with enhanced pattern matching
    const response = generateResponse(message);

    // Simulate minimal delay for UX
    await new Promise(resolve => setTimeout(resolve, 300));

    res.json({
      response,
      context: context || 'general',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      fallback: 'Maaf, terjadi kesalahan. Coba lagi ya! 😊'
    });
  }
});

// Get all available topics
app.get('/api/topics', (req, res) => {
  const topics = qaPatterns.map(p => ({
    id: p.id,
    keywords: p.keywords.slice(0, 3) // First 3 keywords as examples
  }));
  res.json({ topics });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    knowledgeBase: knowledgeBase ? 'loaded' : 'not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🤖 Chat API v2.0 running on port ${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
  console.log(`   Topics: http://localhost:${PORT}/api/topics`);
});

module.exports = app;
