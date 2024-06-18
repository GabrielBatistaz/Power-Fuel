/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['m.media-amazon.com', 'lh3.googleusercontent.com',"firebasestorage.googleapis.com/v0/b/power-fuel-943bb.appspot.com", 'firebasestorage.googleapis.com','power-fuel-943bb.appspot.com'],
  },
  webpack: (config) => {
    config.externals = [...config.externals, 'bcrypt'];
    return config;
  },
};

module.exports = nextConfig;
