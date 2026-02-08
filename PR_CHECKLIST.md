# PR Release Checklist

## Pre-Merge Checklist

Run this checklist before merging PR #3 (Jatevo GLM-4.7 integration).

### 1. Secrets & Environment

- [ ] **`.env` is gitignored**
  ```bash
  git status --porcelain | grep -E "^\?\? .*\.env" || echo "No .env untracked"
  ```
  Expected: `.env` files should NOT appear

- [ ] **API key not committed**
  ```bash
  git log -p --all -S "JATEVO_API_KEY" -- "*.env*" "*.js" "*.json"
  ```
  Expected: No actual API key values in commit history

- [ ] **`.env.example` exists** (template for local dev)
  ```bash
  cat .env.example
  ```

### 2. Production Configuration

- [ ] **`NODE_ENV=production` in prod**
  ```bash
  grep -r "NODE_ENV.*production" docker-compose.yml
  ```
  Expected: Environment variable set in docker-compose.yml or deployment

- [ ] **CORS origin restricted**
  ```bash
  grep -A2 "cors(" server/index.js
  ```
  Expected: Production origin should be `https://abdhilabs.com` (not `true`)

### 3. Rate Limiting & DoS Protection

- [ ] **Rate limiter configured**
  ```bash
  grep -A3 "rateLimit" server/index.js
  ```
  Expected: `max: 100` (or lower) per 15 minutes for `/api`

### 4. Dependencies Audit

- [ ] **Server dependencies safe**
  ```bash
  cd server && npm audit --omit=dev
  ```
  Expected: `0 vulnerabilities`

- [ ] **Frontend dependencies (GitHub Dependabot)**
  - Check: https://github.com/abdhilabs/abdhilabs.github.io/security/dependabot

### 5. Testing

- [ ] **All tests pass**
  ```bash
  cd server && npm test
  ```
  Expected: All tests passing (19 tests)

- [ ] **Health check endpoint works**
  ```bash
  curl http://localhost:3002/api/health
  ```
  Expected: `{"jatevoConfigured":true,"model":"glm-4.7"}`

### 6. Deployment

- [ ] **GitHub Actions pass**
  - Check: https://github.com/abdhilabs/abdhilabs.github.io/actions

- [ ] **Docker image builds successfully**
  ```bash
  docker build -t abdhilabs-site:test .
  ```
  Expected: Build succeeds

---

## Post-Merge Actions

After merging to `main`:

1. [ ] Tag release (optional)
2. [ ] GitHub Actions auto-deploys to production
3. [ ] Verify chatbot works on abdhilabs.com
4. [ ] Check logs for errors
   ```bash
   # If using cloudflared tunnel
   tail -f /path/to/cloudflared.log
   ```

---

## Quick One-Liner Checklist

```bash
echo "=== PRE-MERGE CHECK ===" && \
echo "1. .env ignored:" && git status --porcelain | grep -E "^\?\? .*\.env" || echo "   ✅ OK" && \
echo "2. Server audit:" && cd server && npm audit --omit=dev 2>&1 | grep -E "found|0 vulnerabilities" && \
echo "3. Tests:" && npm test 2>&1 | grep -E "passed|Tests:" && \
echo "=== DONE ==="
```

Expected output:
```
=== PRE-MERGE CHECK ===
1. .env ignored:    ✅ OK
2. Server audit:   found 0 vulnerabilities
3. Tests:          19 passed
=== DONE ===
```
