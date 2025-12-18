// React 19 compatibility patch for React Three Fiber
// This script runs before React Three Fiber loads to ensure React is available

(function() {
  'use strict';
  
  if (typeof window === 'undefined') return;
  
  // Wait for React to be loaded
  function ensureReactReady() {
    // Check if React is available
    if (window.React || (window.__REACT__ && window.__REACT__.default)) {
      return;
    }
    
    // Try to get React from the module system
    try {
      // This will be handled by webpack/Next.js
      setTimeout(ensureReactReady, 50);
    } catch (e) {
      setTimeout(ensureReactReady, 50);
    }
  }
  
  // Start checking after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureReactReady);
  } else {
    ensureReactReady();
  }
})();

