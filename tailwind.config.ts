import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                banner: "url('/img/socials/banner.jpeg')",

                sunbanner: "url('/img/socials/sunswap_banner.png')",
                dcloudbanner: "url('/img/socials/dcloud-bg.png')",
            },
            colors: {
                primary: "#9D44B5",
            },
        },
        screens: {
            xs: "500px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
        },
    },
    plugins: [],
    safelist: [
        "from-yellow-300",
        "from-green-300",
        "from-blue-400",
        "from-red-500",
        "from-orange-600",
    ],
};
export default config;
