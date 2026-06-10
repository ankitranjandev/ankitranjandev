module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: [
        'http://localhost/index.html',
        'http://localhost/blog/index.html',
        'http://localhost/contact/index.html',
        'http://localhost/deep-dives/index.html',
        'http://localhost/notes/index.html',
      ],
      numberOfRuns: 3,
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 1.0 }],
        'categories:best-practices': ['error', { minScore: 1.0 }],
        'categories:seo': ['error', { minScore: 1.0 }],
        'csp-xss': 'off',
        'unused-javascript': 'off',
        'uses-long-cache-ttl': 'off',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
