/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configuración para Vercel
  output: 'standalone',
  // Optimizaciones para producción
  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig
