import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const UMAMI_URL = process.env.REACT_APP_UMAMI_URL;
const UMAMI_WEBSITE_ID = process.env.REACT_APP_UMAMI_WEBSITE_ID;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

function normalizePath(pathname, search) {
  const path = pathname || '/';
  const normalized = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
  return normalized + (search || '');
}

function trackPageView(url, title) {
  if (typeof window.umami === 'undefined') return;
  const payloadUrl = url ?? normalizePath(window.location.pathname, window.location.search);
  const payloadTitle = title ?? (document.title || '');
  window.umami.track((props) => ({ ...props, url: payloadUrl, title: payloadTitle }));
}

/**
 * Umami analytics: injects script, tracks SPA route changes, production-only.
 * Set REACT_APP_UMAMI_URL and REACT_APP_UMAMI_WEBSITE_ID to enable.
 */
export default function UmamiAnalytics() {
  const location = useLocation();
  const scriptInjected = useRef(false);
  const lastTracked = useRef(null);
  const initialTrackDone = useRef(false);

  // Inject script when idle (production only), track first pageview on load
  useEffect(() => {
    if (!IS_PRODUCTION || !UMAMI_URL || !UMAMI_WEBSITE_ID || scriptInjected.current) return;

    const injectAndTrack = () => {
      if (scriptInjected.current) return;
      scriptInjected.current = true;

      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src = `${UMAMI_URL.replace(/\/$/, '')}/umami.js`;
      script.setAttribute('data-website-id', UMAMI_WEBSITE_ID);
      script.setAttribute('data-auto-track', 'false');
      script.setAttribute('data-do-not-track', 'true');
      script.onload = () => {
        if (!initialTrackDone.current) {
          initialTrackDone.current = true;
          const url = normalizePath(window.location.pathname, window.location.search);
          lastTracked.current = url;
          trackPageView(url, document.title);
        }
      };
      document.head.appendChild(script);
    };

    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(injectAndTrack, { timeout: 2500 });
    } else {
      setTimeout(injectAndTrack, 0);
    }
  }, []);

  // Track only on route change (not on first load; script onload handles that)
  useEffect(() => {
    if (!IS_PRODUCTION || !UMAMI_WEBSITE_ID) return;

    const url = normalizePath(location.pathname, location.search);
    if (lastTracked.current === url) return;
    lastTracked.current = url;

    if (typeof window.umami !== 'undefined') {
      trackPageView(url, document.title);
    }
  }, [location.pathname, location.search]);

  return null;
}
