/** @type {import('next').NextConfig} */
const API_SERVER = "http://localhost:8000";

module.exports = {
  reactStrictMode: true,
  rewrites: async function () {
    return [
      {
        source: "/api/:path*",
        destination: `${API_SERVER}/api/:path*`,
      },
    ];
  },
};
