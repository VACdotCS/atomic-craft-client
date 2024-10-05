/** @type {import('next').NextConfig} */

module.exports = {
    env: {
      API_URL: 'http://localhost:5000/api',
      IMAGES_URL: 'http://localhost:5000/images',
      DOMAIN_URL_IMAGES: 'http://localhost:5000/images',
      CAPTCHA_KEY: '6LfD6b8nAAAAAHVshZGXb4TJFOOan_SsYNfM9HqI',
      UMONEY_CLIENT_ID: '8389FCF4F1D0296A8BA4900B866AF053DC6AB3EE9263EEBC0F380BCA81E2F01E',
    },
    reactStrictMode: true,
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'topcraft.club',
                port: '',
                pathname: '/media/**'
            },
            {
                protocol: 'http',
                hostname: 'localhost',
		port: '5000',
                pathname: '/images/**',
            },
        ],
    },
    experimental: {
        appDir: true,
        async headers() {
            return [
                {
                    // matching all API routes
                    // https://vercel.com/guides/how-to-enable-cors
                    source: "http://localhost:5000/api/:path*",
                    headers: [
                        { key: "Access-Control-Allow-Credentials", value: "true" },
                        { key: "Access-Control-Allow-Origin", value: "*" },
                        {
                            key: "Access-Control-Allow-Methods",
                            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
                        },
                        {
                            key: "Access-Control-Allow-Headers",
                            value:
                                "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
                        },
                        {
                            key: 'X-DNS-Prefetch-Control',
                            value: 'on'
                        },

                    ],
                },
            ];
        },
    },
}
