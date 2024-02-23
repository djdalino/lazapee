/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  env: {
    DIRECTUS_ENDPOINT: 'https://directus.area917.ph',
    DIRECTUS_USER_EMAIL: 'emailfortestingpurposesonly111@gmail.com',
    DIRECTUS_USER_PASSWORD: 'Ren72dVTQtZyzHbEhkg6',
  },
  images: {
    domains: ['burst.shopifycdn.com'],
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, './src/app');
    return config;
  },
}

export default nextConfig
