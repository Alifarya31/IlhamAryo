// Contentful API Configuration EXAMPLE
// Copy file ini menjadi 'contentful-config.js' dan isi dengan API keys kamu

const CONTENTFUL_CONFIG = {
  space: "ih6v2ko0yoad", // Ganti dengan Space ID dari Contentful
  accessToken: "sD-dTOYnN5hkyBBNhWHNcsJglgoWbH-mXb7D0oHgUuA", // Ganti dengan Content Delivery API access token
};

// Contentful API endpoint
const CONTENTFUL_API = `https://cdn.contentful.com/spaces/${CONTENTFUL_CONFIG.space}/entries?access_token=${CONTENTFUL_CONFIG.accessToken}`;
