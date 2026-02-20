/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class", '[data-theme="dark"]'],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                outfit: ["Outfit", "sans-serif"],
            },
            colors: {
                primary: "var(--primary)",
                success: "var(--success)",
                lime: "var(--lime)",
                warning: "var(--warning)",
                accent: "var(--accent)",

                bgMain: "var(--bg-main)",
                bgCard: "var(--bg-card)",
                bgSidebar: "var(--bg-sidebar)",
                textMain: "var(--text-main)",
                textMuted: "var(--text-muted)",
            },
            borderColor: {
                glass: "var(--glass-border)",
            },
            boxShadow: {
                glass: "var(--glass-shadow)",
            }
        },
    },
    plugins: [],
}