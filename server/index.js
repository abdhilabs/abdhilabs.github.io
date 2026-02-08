require('dotenv').config();

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3002;

// ============ CONFIG ============

const JATEVO_API_URL = process.env.JATEVO_API_URL || 'https://inference.jatevo.id/v1/chat/completions';
const JATEVO_API_KEY = process.env.JATEVO_API_KEY;
const MODEL_ID = 'glm-4.7';

// ============ SECURITY MIDDLEWARE ============

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://abdhilabs.com' 
    : true
}));

const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.json({ limit: '10kb' }));
app.use('/api', chatLimiter);

// ============ KNOWLEDGE BASE ============

const knowledgeBasePath = path.join(__dirname, 'knowledge-base', 'riza-abdhi-linkedin.md');
let knowledgeBase = '';

try {
  knowledgeBase = fs.readFileSync(knowledgeBasePath, 'utf-8');
  console.log('✅ Knowledge base loaded');
} catch (error) {
  console.warn('⚠️ Knowledge base not found');
}

// ============ CONVERSATION MEMORY ============

const conversationHistories = new Map();
const MAX_HISTORY_LENGTH = 10;
const HISTORY_EXPIRY_MS = 30 * 60 * 1000; // 30 minutes

function getHistory(sessionId) {
  const now = Date.now();
  let history = conversationHistories.get(sessionId);
  
  if (!history || (now - history.lastActivity) > HISTORY_EXPIRY_MS) {
    history = {
      messages: [],
      lastActivity: now
    };
    conversationHistories.set(sessionId, history);
  } else {
    history.lastActivity = now;
  }
  
  return history;
}

function addToHistory(sessionId, role, content) {
  const history = getHistory(sessionId);
  history.messages.push({ role, content });
  
  // Keep only last N messages
  if (history.messages.length > MAX_HISTORY_LENGTH) {
    history.messages = history.messages.slice(-MAX_HISTORY_LENGTH);
  }
}

function clearHistory(sessionId) {
  conversationHistories.delete(sessionId);
}

// ============ JATEVO API CLIENT ============

async function callJatevoAPI(messages, sessionId) {
  if (!JATEVO_API_KEY) {
    console.warn('⚠️ JATEVO_API_KEY not set');
    return null;
  }

  console.log(`🚀 Calling Jatevo API (${messages.length} messages)...`);

  try {
    const response = await fetch(JATEVO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JATEVO_API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL_ID,
        messages: messages,
        stream: false,
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    console.log(`📡 Jatevo API response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Jatevo API HTTP error: ${response.status}`, errorText.substring(0, 200));
      return null;
    }

    const data = await response.json();
    console.log(`✅ Jatevo API response received`);
    console.log(`🔍 Response structure:`, JSON.stringify(data, null, 2).substring(0, 500));
    return data.choices[0]?.message?.content || null;
  } catch (error) {
    console.error(`❌ Jatevo API exception:`, error.message);
    return null;
  }
}

// ============ PERSONALITY & SYSTEM PROMPT ============

function getSystemPrompt() {
  return `Kamu adalah "Anak Intern" - asisten digital personal brand untuk Muhamad Riza Abdhi Purnama.

Tentang Abdhi:
- iOS Engineer dengan 4+ tahun pengalaman
- Alumni Apple Developer Academy @ Infinite Learning (2022)
- Sekarang kerja di NBS (Nusantara Beta Studio) sebagai Mobile Engineer - iOS
- Based di Jakarta/Bandung, Indonesia
- Open untuk remote work dan relocation

Gaya komunikasi:
- Friendly, hangat, tapi profesional
- Gunakan emoji secukupnya
- Responsnya natural dan conversational
- Bahasa Indonesia (atau mix dengan English kalau appropriate)
- Jangan terlalu formal

Penting:
- Jawab pertanyaan tentang Abdhi dengan informatif
- kalau ditanya hal di luar Abdhi, tetap friendly tapi bilang fokusnya tentang Abdhi
- kalau ga tau jawabannya, bilang dengan jujur
- Jangan bikin klaim yang ga akurat tentang Abdhi

Knowledge base: ${knowledgeBase || 'Tidak ada knowledge base'}`;
}

// ============ PATTERN MATCHING (FALLBACK) ============

const qaPatterns = [
  {
    id: 'greeting',
    keywords: ['halo', 'hai', 'hi', 'hello', 'hey', 'p', 'hy'],
    responses: [
      "Hai! 👋 Saya Anak Intern, asisten digital Abdhi. Tanya aja tentang:\n\n• Pengalaman kerja\n• Skills & expertise\n• Education & background\n• Awards & achievements\n• Cara menghubungi\n\nApa yang ingin kamu tahu?",
      "Halo! 🙌 Senang chat sama kamu! Mau tahu apa tentang Abdhi?",
      "Hai! 😊 Saya siap jawab pertanyaan tentang Abdhi. Mulai aja!"
    ]
  },
  {
    id: 'about',
    keywords: ['siapa', 'about', 'profile', 'perkenalkan', 'kenalan', 'abdhi itu siapa', 'dia siapa', 'nama', 'fullname', 'nama lengkap'],
    responses: [
      "**Muhamad Riza Abdhi Purnama** adalah iOS Developer dengan **4+ tahun pengalaman** dalam membangun aplikasi mobile berkualitas.\n\nPassion-nya: building seamless, high-performance apps yang memprioritaskan user experience dengan clean, maintainable code.",
      "Abdhi adalah Mobile Engineer yang meticulous, passionate tentang best practices, dan terus berkembang di dunia iOS development. Alumni Apple Developer Academy 2022! 🍎"
    ]
  },
  {
    id: 'experience',
    keywords: ['pengalaman', 'experience', 'kerja', 'kerjaan', 'pekerjaan', 'karir', 'career', 'job', 'last job', 'currently working', 'sekarang kerja dimana'],
    responses: [
      "**Experience Abdhi:**\n\n📱 **Mobile Engineer - iOS @ NBS** (Jul 2021 - Sekarang)\n├── Working di Jakarta Selatan\n├── Fokus iOS development\n└── 4+ tahun di role ini\n\n📱 Mobile Developer @ HEPTACO (Dec 2020 - Jun 2021)\n📱 iOS/Android Developer @ KECILIN\n📱 Android Developer @ Widya Edu, Credeva, Teman Kajian",
      "Abdhi sudah through 7 companies dalam 2 tahun - move fast! 🚀\n\nCurrent: NBS (Nusantara Beta Studio) sebagai Mobile Engineer - iOS"
    ]
  },
  {
    id: 'skills',
    keywords: ['skill', 'skills', 'keahlian', 'teknologi', 'tech', 'programming', 'coding', 'bahasa', 'expertise'],
    responses: [
      "**Tech Skills:**\n\n🍎 **Primary:** iOS Development (Swift, SwiftUI, Clean Architecture)\n🤖 **Secondary:** Android Development (Kotlin, Java)\n\n🎯 **Focus:** Mobile architecture, Clean code, User experience (UX)",
      "Abdhi specialized di **iOS development** dengan Swift & SwiftUI. Certified dari Apple Developer Academy! 💪"
    ]
  },
  {
    id: 'education',
    keywords: ['pendidikan', 'education', 'sekolah', 'kuliah', 'university', 'universitas', 'graduate', 'alumni', 'sarjana', 's1', 'gpa', 'ipk'],
    responses: [
      "**Education:**\n\n🍎 Apple Developer Academy @ Infinite Learning (2022)\n🎓 AMIKOM Yogyakarta - Informatika, GPA 3.61 🌟\n🎓 Bangkit Academy led by Google (2021)\n📚 Dicoding Academy",
      "Abdhi graduate dari **Apple Developer Academy 2022** - program intensif 10 bulan dari Apple! 🎓"
    ]
  },
  {
    id: 'contact',
    keywords: ['contact', 'hubungi', 'email', 'whatsapp', 'phone', 'telepon', 'linkedin', 'github', 'sosial media', 'reach', 'connect'],
    responses: [
      "**Contact Abdhi:**\n\n💼 LinkedIn: linkedin.com/in/rizaabdhi\n💻 GitHub: github.com/abdhilabs\n🌐 Website: abdhilabs.com",
      "Connect dengan Abdhi:\n• LinkedIn: @rizaabdhi 💼\n• GitHub: @abdhilabs 💻"
    ]
  },
  {
    id: 'location',
    keywords: ['lokasi', 'location', 'domisili', 'tinggal', 'based', 'base', 'jakarta', 'bandung', 'indonesia', 'where'],
    responses: [
      "**Location:**\n\n📍 Based di **Jakarta/Bandung area**, Indonesia\n🌏 Open untuk remote work atau opportunities abroad",
      "Abdhi based di Indonesia - Jakarta/Bandung area. Open untuk relocation! 🌍"
    ]
  },
  {
    id: 'availability',
    keywords: ['available', 'availability', 'tersedia', 'lowongan', 'rekrut', 'hire', 'hiring', 'open for work', 'freelance', 'part time', 'fulltime'],
    responses: [
      "**Availability:**\n\n✅ Open untuk:\n├── Full-time iOS developer roles\n├── Freelance/contract projects\n├── Remote opportunities\n└── Relocation (siap abroad!)\n\nCurrently employed di NBS tapi terbuka untuk right opportunity!",
      "Abdhi **open untuk opportunities**! 🎯\n• Full-time iOS roles ✅\n• Freelance projects ✅\n• Remote work ✅\n• Relocation - YES! 🌍"
    ]
  },
  {
    id: 'thanks',
    keywords: ['thanks', 'thank you', 'makasih', 'terima kasih', 'thx', 'ty'],
    responses: [
      "Sama-sama! 🙌\n\nKalau ada pertanyaan lagi tentang Abdhi, feel free untuk ask anytime! 😊",
      "You're welcome! 🌟\nHappy to help!"
    ]
  },
  {
    id: 'goodbye',
    keywords: ['bye', 'dadah', 'sampai jumpa', 'see you', 'selamat tinggal', 'ciao'],
    responses: [
      "Sampai jumpa! 👋\n\nSemoga info-nya helpful. Come back anytime! 😊",
      "Bye! 👋\nGood luck dengan apapun yang kamu cari! 🚀"
    ]
  }
];

function findBestMatch(message) {
  const lowerMessage = message.toLowerCase();
  const words = lowerMessage.split(/\s+/);
  
  let bestMatch = null;
  let bestScore = 0;

  for (const pattern of qaPatterns) {
    let score = 0;
    for (const keyword of pattern.keywords) {
      if (lowerMessage.includes(keyword)) {
        score += words.includes(keyword) ? 10 : 5;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = pattern;
    }
  }

  return { match: bestMatch, score: bestScore };
}

function generateFallbackResponse(message) {
  const { match, score } = findBestMatch(message);
  
  if (match && score > 5) {
    const responses = match.responses;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  return `Hmm, belum terlalu paham pertanyaan itu 😅

Tapi saya bisa bantu tentang:
• Pengalaman kerja
• Skills & expertise
• Education & awards
• Contact info

Coba pertanyaan lain ya! 😊`;
}

// ============ API ENDPOINTS ============

app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId: clientSessionId, context } = req.body;
    const sessionId = clientSessionId || 'default';

    // Validate message
    const MAX_MESSAGE_LENGTH = 1000;
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({ error: 'Message too long' });
    }

    console.log(`💬 Chat [${sessionId}]: "${message.substring(0, 50)}..."`);

    // Add user message to history
    addToHistory(sessionId, 'user', message);

    // Build messages for Jatevo
    const history = getHistory(sessionId);
    const jatevoMessages = [
      { role: 'system', content: getSystemPrompt() },
      ...history.messages.slice(-5) // Last 5 messages for context
    ];

    // Try Jatevo API first
    let response = null;
    if (JATEVO_API_KEY) {
      response = await callJatevoAPI(jatevoMessages, sessionId);
    }

    // Fallback to pattern matching if API fails
    if (!response) {
      console.log('⚠️ Using fallback pattern matching');
      response = generateFallbackResponse(message);
    }

    // Add bot response to history
    addToHistory(sessionId, 'assistant', response);

    res.json({
      response,
      sessionId,
      context,
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

// Clear conversation history
app.post('/api/chat/clear', (req, res) => {
  const { sessionId } = req.body;
  clearHistory(sessionId || 'default');
  res.json({ success: true, message: 'Conversation history cleared' });
});

// Get conversation history
app.get('/api/chat/history', (req, res) => {
  const { sessionId } = req.query;
  const history = getHistory(sessionId || 'default');
  res.json({ messages: history.messages });
});

// Get all available topics
app.get('/api/topics', (req, res) => {
  const topics = qaPatterns.map(p => ({
    id: p.id,
    keywords: p.keywords.slice(0, 3)
  }));
  res.json({ topics });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    knowledgeBase: knowledgeBase ? 'loaded' : 'not found',
    jatevoConfigured: !!JATEVO_API_KEY,
    model: JATEVO_API_KEY ? MODEL_ID : null
  });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🤖 Chat API v3.0 running on port ${PORT}`);
    console.log(`   Health: http://localhost:${PORT}/api/health`);
    console.log(`   Jatevo API: ${JATEVO_API_KEY ? '✅ Configured' : '❌ Not configured'}`);
  });
}

module.exports = app;
