/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['s.gravatar.com'], // Add the required domain(s) here
    },  
}

module.exports = nextConfig
module.exports = {
  experimental: {
    esmExternals: 'loose',
  },
};
