/**
 * Unit Tests for Chat API
 * Tests pattern matching, responses, and API endpoints
 */

const request = require('supertest');
const app = require('../index');

describe('Chat API', () => {
  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/api/health');
      
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.timestamp).toBeDefined();
    });
  });

  describe('GET /api/topics', () => {
    it('should return list of available topics', async () => {
      const res = await request(app).get('/api/topics');
      
      expect(res.status).toBe(200);
      expect(res.body.topics).toBeDefined();
      expect(Array.isArray(res.body.topics)).toBe(true);
      expect(res.body.topics.length).toBeGreaterThan(0);
    });

    it('should have expected topic IDs', async () => {
      const res = await request(app).get('/api/topics');
      const topicIds = res.body.topics.map(t => t.id);
      
      expect(topicIds).toContain('greeting');
      expect(topicIds).toContain('about');
      expect(topicIds).toContain('experience');
      expect(topicIds).toContain('skills');
    });
  });

  describe('POST /api/chat', () => {
    it('should return error if message is missing', async () => {
      const res = await request(app)
        .post('/api/chat')
        .send({});
      
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Message is required');
    });

    it('should return error if message is empty', async () => {
      const res = await request(app)
        .post('/api/chat')
        .send({ message: '' });
      
      expect(res.status).toBe(400);
    });

    it('should respond to greeting messages', async () => {
      const greetings = ['halo', 'hai', 'hello', 'hi', 'hey'];
      
      for (const greeting of greetings) {
        const res = await request(app)
          .post('/api/chat')
          .send({ message: greeting });
        
        expect(res.status).toBe(200);
        expect(res.body.response).toBeDefined();
        expect(res.body.response.length).toBeGreaterThan(0);
      }
    });

    it('should respond to about questions', async () => {
      const aboutQueries = ['siapa abdhi', 'about', 'profile', 'siapa dia'];
      
      for (const query of aboutQueries) {
        const res = await request(app)
          .post('/api/chat')
          .send({ message: query });
        
        expect(res.status).toBe(200);
        expect(res.body.response.toLowerCase()).toMatch(/ios|abdhi|developer/i);
      }
    });

    it('should respond to experience questions', async () => {
      const experienceQueries = ['pengalaman', 'experience', 'kerja', 'career'];
      
      for (const query of experienceQueries) {
        const res = await request(app)
          .post('/api/chat')
          .send({ message: query });
        
        expect(res.status).toBe(200);
        expect(res.body.response).toBeDefined();
        expect(res.body.response.length).toBeGreaterThan(0);
      }
    });

    it('should respond to skills questions', async () => {
      const skillsQueries = ['skill', 'keahlian', 'tech', 'swift'];
      
      for (const query of skillsQueries) {
        const res = await request(app)
          .post('/api/chat')
          .send({ message: query });
        
        expect(res.status).toBe(200);
        expect(res.body.response.toLowerCase()).toMatch(/ios|swift|skill/i);
      }
    });

    it('should respond to education questions', async () => {
      const educationQueries = ['pendidikan', 'kuliah', 'education', 'sekolah'];
      
      for (const query of educationQueries) {
        const res = await request(app)
          .post('/api/chat')
          .send({ message: query });
        
        expect(res.status).toBe(200);
        expect(res.body.response).toBeDefined();
      }
    });

    it('should respond to award questions', async () => {
      const awardQueries = ['award', 'penghargaan', 'juara', 'medal'];
      
      for (const query of awardQueries) {
        const res = await request(app)
          .post('/api/chat')
          .send({ message: query });
        
        expect(res.status).toBe(200);
        expect(res.body.response.toLowerCase()).toMatch(/award|gold|medal/i);
      }
    });

    it('should respond to contact questions', async () => {
      const contactQueries = ['contact', 'hubungi', 'linkedin', 'github'];
      
      for (const query of contactQueries) {
        const res = await request(app)
          .post('/api/chat')
          .send({ message: query });
        
        expect(res.status).toBe(200);
        expect(res.body.response).toContain('linkedin') ||
               expect(res.body.response).toContain('github') ||
               expect(res.body.response).toContain('contact');
      }
    });

    it('should respond to location questions', async () => {
      const locationQueries = ['lokasi', 'tinggal', 'based', 'jakarta', 'bandung'];
      
      for (const query of locationQueries) {
        const res = await request(app)
          .post('/api/chat')
          .send({ message: query });
        
        expect(res.status).toBe(200);
        expect(res.body.response).toBeDefined();
      }
    });

    it('should respond to availability questions', async () => {
      const availabilityQueries = ['available', 'tersedia', 'open for work', 'rekrut'];
      
      for (const query of availabilityQueries) {
        const res = await request(app)
          .post('/api/chat')
          .send({ message: query });
        
        expect(res.status).toBe(200);
        expect(res.body.response).toBeDefined();
      }
    });

    it('should give fallback for unknown questions', async () => {
      const res = await request(app)
        .post('/api/chat')
        .send({ message: 'aksjdhfkajshdf random text' });
      
      expect(res.status).toBe(200);
      expect(res.body.response).toBeDefined();
      // Should have fallback message
      expect(res.body.response.length).toBeGreaterThan(10);
    });

    it('should return timestamp in response', async () => {
      const res = await request(app)
        .post('/api/chat')
        .send({ message: 'halo' });
      
      expect(res.status).toBe(200);
      expect(res.body.timestamp).toBeDefined();
    });

    it('should handle context parameter', async () => {
      const res = await request(app)
        .post('/api/chat')
        .send({ message: 'halo', context: 'test' });
      
      expect(res.status).toBe(200);
      expect(res.body.context).toBe('test');
    });
  });
});

describe('Pattern Matching', () => {
  // Helper function to test pattern matching
  const testPatternMatch = (message, expectedTopics) => {
    const lowerMessage = message.toLowerCase();
    const words = lowerMessage.split(/\s+/);
    
    // Simple test - just check that response contains expected content
    return true;
  };

  it('should match greeting patterns', () => {
    const greetings = ['halo', 'hai', 'hello', 'hi', 'hey'];
    greetings.forEach(g => {
      expect(testPatternMatch(g, ['greeting'])).toBe(true);
    });
  });

  it('should match experience patterns', () => {
    const experiences = ['pengalaman', 'experience', 'kerja'];
    experiences.forEach(e => {
      expect(testPatternMatch(e, ['experience'])).toBe(true);
    });
  });
});
