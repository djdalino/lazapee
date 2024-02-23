/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DIRECTUS_ENDPOINT: 'https://directus.area917.ph',
    DIRECTUS_USER_EMAIL: 'emailfortestingpurposesonly111@gmail.com',
    DIRECTUS_USER_PASSWORD: 'Ren72dVTQtZyzHbEhkg6',
  },
  images: {
    domains: ['burst.shopifycdn.com'],
  },
}

export default nextConfig
