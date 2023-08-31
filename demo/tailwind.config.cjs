/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.svelte', './node_modules/stdf/**/*.svelte', '../packages/stdf/components/**/*.svelte'],
    theme: {
        colors: {
            // 主题色
            // Theme Color
            primary: '#0B24FB',
            dark: '#FFC043',
            blue: '#0B24FB', // primary 别名 alias
            yellow: '#FFC043', // dark 别名 alias

            // 扩展色
            // Extended Color
            purple: '#7356BF',
            green: '#05944F',
            orange: '#FF6937',

            // 功能色
            // Functional Color
            success: '#11BB8D',
            warning: '#B95000',
            error: '#DA1414',
            info: '#2E5AAC',

            // 中性色
            // Neutral Color
            black: '#000000',
            white: '#fff',
            gray1: '#23262B',
            gray2: '#2A2B2F',
            gray3: '#303239',
            gray4: '#373940',
            gray5: '#414249',
            gray6: '#747B84',
            gray7: '#DADEE3',
            gray8: '#EBEEF2',
            gray9: '#F4F6F9',
            gray10: '#FAFAFB',
            transparent: 'transparent',
        },
        extend: {
            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
                path: {
                    '0%': { 'stroke-dashoffset': 400, fill: 'transparent' },
                    '30%': { 'stroke-dashoffset': 0, fill: 'transparent' },
                    '32%': { 'stroke-dashoffset': 0, fill: 'currentColor' },
                    '33%': { opacity: 0 },
                    '35%': { opacity: 1 },
                    '37%': { opacity: 0 },
                    '39%': { opacity: 1 },
                    '40%': { 'stroke-dashoffset': 0, fill: 'currentColor' },
                    '99%': { 'stroke-dashoffset': 0, fill: 'currentColor' },
                    '100%': { 'stroke-dashoffset': 400, fill: 'transparent' },
                },
            },
            animation: {
                wiggle: 'wiggle 1s ease-in-out infinite',
                path: 'path 3s linear infinite',
            },
        },
    },
    darkMode: 'class',
    plugins: [],
};
