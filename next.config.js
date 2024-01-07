/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/(@[a-zA-Z0-9]+)/:username*',
                destination: "/profile/:username*",
            }
        ]
    },
}

module.exports = nextConfig
