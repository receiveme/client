/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        // added because tronweb package was giving error
        // Module not found: ESM packages (@noble/secp256k1) need to be imported. Use 'import' to reference the package instead. https://nextjs.org/docs/messages/import-esm-externals

        esmExternals: "loose",
    },
};

module.exports = nextConfig;
