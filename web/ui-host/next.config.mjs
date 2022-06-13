/** @type {import('next').NextConfig} */
import remarkFrontmatter from "remark-frontmatter";
import rehypeHighlight from "rehype-highlight";

const API_SERVER = "http://localhost:8000";

export default {
  reactStrictMode: true,
  rewrites: async function () {
    return [
      {
        source: "/api/:path*",
        destination: `${API_SERVER}/api/:path*`,
      },
    ];
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          options: {
            providerImportSource: "@mdx-js/react",
            remarkPlugins: [remarkFrontmatter],
            rehypePlugins: [rehypeHighlight],
          },
        },
      ],
    });

    return config;
  },
  pageExtensions: ["js", "jsx", "md", "mdx"],
  images: {
    loader: "imgix",
    path: "https://images.unsplash.com/",
  },
};
