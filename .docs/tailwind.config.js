/** @type {import('tailwindcss').Config} */
module.exports = {
    corePlugins: {
        preflight: false,
        container: false,
    },
    darkMode: ["class", '[data-theme="dark"]'],
    content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
    theme: {
        extend: {
            borderRadius: {
                sm: "4px",
            },
            screens: {
                sm: "0px",
                lg: "997px",
            },
            colors: {},
        },
    },
    plugins: [require("tailwindcss-animated")],
}

