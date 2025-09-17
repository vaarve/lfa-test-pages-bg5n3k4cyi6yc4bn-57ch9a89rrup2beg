/** @type {import('next').NextConfig} */
const repo = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : '';
const useGhPages = process.env.GH_PAGES === 'true' && !!repo;
const basePath = useGhPages ? `/${repo}` : '';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
};

module.exports = nextConfig;
