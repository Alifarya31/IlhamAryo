// Contentful API Configuration
// NOTE: Content Delivery API keys are safe to expose in frontend
// They are read-only and meant for public use

const CONTENTFUL_CONFIG = {
  space: 'ih6v2ko0yoad',
  accessToken: 'sD-dTOYnN5hkyBBNhWHNcsJglgoWbH-mXb7D0oHgUuA',
};

// Contentful API endpoint
const CONTENTFUL_API = `https://cdn.contentful.com/spaces/${CONTENTFUL_CONFIG.space}/entries?access_token=${CONTENTFUL_CONFIG.accessToken}`;
