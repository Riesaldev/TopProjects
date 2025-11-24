/** @type {import('next').NextConfig} */
const nextConfig = {
  // Deshabilitar turbopack temporalmente para evitar errores
  webpack: ( config, { isServer } ) => {
    return config;
  },
};

export default nextConfig;
