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
  console.warn('⚠️ Knowledge base not found, using default');
  knowledgeBase = `
    Muhamad Riza Abdhi Purnama adalah iOS Developer dengan 4+ tahun pengalaman.
    Saat ini bekerja di NBS (Nusantara Beta Studio) sebagai Mobile Engineer - iOS sejak Juli 2021.
    Lulusan Apple Developer Academy @ Infinite Learning (2022).
    Lulusan AMIKOM Yogyakarta, Informatika, GPA 3.61 (2018-2021).
    memiliki pengalaman di berbagai perusahaan: HEPTACO, KECILIN, Widya Edu, Credeva, Teman Kajian.
    Skill utama: iOS Development (Swift, SwiftUI), Android Development.
    Awards: ASEAN Outstanding Invention Award, Gold Medal Asian Youth Innovation Awards, Gold Medal Thailand Inventors Day.
  `;
}

// Simple keyword matching for now (replace with OpenClaw integration later)
function generateResponse(message) {
  const lowerMessage = message.toLowerCase();

  const responses = {
    'about': `Muhamad Riza Abdhi Purnama adalah iOS Developer dengan 4+ tahun pengalaman. Dia passionate tentang building seamless, high-performance apps yang memprioritaskan user experience dengan clean, maintainable code.`,

    'experience': `Pengalamannya:\n- Mobile Engineer - iOS @ NBS (Jul 2021 - Sekarang)\n- Mobile Developer @ HEPTACO (Dec 2020 - Jun 2021)\n- iOS/Android Developer @ KECILIN\n- Android Developer @ Widya Edu, Credeva, Teman Kajian`,

    'skills': `Tech Skills:\n- Primary: iOS Development (Swift, SwiftUI)\n- Secondary: Android Development (Kotlin, Java)\n- Focus: Mobile architecture, clean code, user experience`,

    'education': `Education:\n- Apple Developer Academy @ Infinite Learning (2022)\n- AMIKOM Yogyakarta - Informatika, GPA 3.61 (2018-2021)\n- Bangkit Academy led by Google (2021)\n- Dicoding Academy`,

    'contact': `Cara menghubungi Abdhi:\n- LinkedIn: linkedin.com/in/rizaabdhi\n- GitHub: github.com/abdhilabs\n- Website: abdhilabs.com`,

    'projects': `Projects:\n- PPM One - Android app untuk monitoring acara PPM di AMIKOM\n- Various iOS apps selama di Apple Developer Academy`,

    'awards': `Awards & Achievements:\n- ASEAN Outstanding Invention Award (Thailand Inventors Day 2020)\n- Gold Medal - Asian Youth Innovation Awards (Malaysia 2020)\n- 1st Winner IT Competition IFest 2020 (Unpad)\n- The Top 42 - SejutaCita Scholarship\n- The Top 25 - Beasiswa Tunai Bumi 2020`,

    'volunteer': `Volunteering:\n- Group Lead @ WWDC Community Week (May-Jun 2021)\n- Core Team Lead @ DSC AmIKOM Yogyakarta (2020-2021)\n- Speaker @ HMIF Dedicated To School 2021\n- Computer Lab Assistant @ Forum Asisten (2019-2020)`,

    'location': `Based di Jakarta/Bandung area, Indonesia. Open untuk career opportunities terutama roles iOS.`,

    'availability': `Abdhi terbuka untuk:\n- Full-time iOS developer roles\n- Freelance projects\n- Kolaborasi tech`,

    'greeting': `Hai! Saya asisten AI Abdhi. Tanya saja tentang:\n- Pengalamannya (experience)\n- Skill & expertise\n- Education & background\n- Awards & achievements\n- Cara menghubungi\n\nApa yang ingin kamu tahu?`,

    'help': `Saya bisa jawab pertanyaan tentang:\n- About & background\n- Work experience\n- Skills & expertise\n- Education\n- Projects\n- Awards & recognition\n- Contact info\n- Availability\n\nTanya aja! 😊`
  };

  // Check keywords
  if (lowerMessage.includes('halo') || lowerMessage.includes('hai') || lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
    return responses.greeting;
  }

  if (lowerMessage.includes('bantu') || lowerMessage.includes('help') || lowerMessage.includes('bisa apa')) {
    return responses.help;
  }

  if (lowerMessage.includes('about') || lowerMessage.includes('siapa') || lowerMessage.includes('profile')) {
    return responses.about;
  }

  if (lowerMessage.includes('pengalaman') || lowerMessage.includes('experience') || lowerMessage.includes('kerja') || lowerMessage.includes('kerjaan')) {
    return responses.experience;
  }

  if (lowerMessage.includes('skill') || lowerMessage.includes('keahlian') || lowerMessage.includes('teknologi') || lowerMessage.includes('tech')) {
    return responses.skills;
  }

  if (lowerMessage.includes('pendidikan') || lowerMessage.includes('education') || lowerMessage.includes('sekolah') || lowerMessage.includes('kuliah')) {
    return responses.education;
  }

  if (lowerMessage.includes('contact') || lowerMessage.includes('hubungi') || lowerMessage.includes('email') || lowerMessage.includes('linkedin')) {
    return responses.contact;
  }

  if (lowerMessage.includes('project') || lowerMessage.includes('porto') || lowerMessage.includes('portfolio')) {
    return responses.projects;
  }

  if (lowerMessage.includes('award') || lowerMessage.includes('penghargaan') || lowerMessage.includes('juara')) {
    return responses.awards;
  }

  if (lowerMessage.includes('volunteer') || lowerMessage.includes('organisasi') || lowerMessage.includes('komunitas')) {
    return responses.volunteer;
  }

  if (lowerMessage.includes('lokasi') || lowerMessage.includes('domisili') || lowerMessage.includes('tinggal')) {
    return responses.location;
  }

  if (lowerMessage.includes('available') || lowerMessage.includes('tersedia') || lowerMessage.includes('lowongan') || lowerMessage.includes('rekrut')) {
    return responses.availability;
  }

  // Default response with knowledge base context
  return `Maaf, saya belum terlalu paham pertanyaan itu. Tapi saya bisa bantu jawab tentang:\n\n${responses.help}\n\nAtau coba pertanyaan lain ya! 😊`;
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log(`💬 Chat request: ${message}`);

    // Generate response (replace with OpenClaw MCP call later)
    const response = generateResponse(message);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    res.json({
      response,
      context: context || 'general',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🤖 Chat API server running on port ${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
