/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                // Matrix quadrant colors
                q1: '#EF4444',      // Do First (Red)
                q2: '#3B82F6',      // Schedule (Blue)
                q3: '#F59E0B',      // Delegate (Yellow)
                q4: '#6B7280',      // Eliminate (Gray)

                // Light mode
                'light-bg': '#FFFFFF',
                'light-surface': '#F5F5F5',
                'light-text': '#1F2937',

                // Dark mode
                'dark-bg': '#1A1A1A',
                'dark-surface': '#2D2D2D',
                'dark-text': '#F9FAFB',

                // Status
                'completed': '#9CA3AF',
            },
            fontFamily: {
                sans: ['system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
    darkMode: 'class',
};
