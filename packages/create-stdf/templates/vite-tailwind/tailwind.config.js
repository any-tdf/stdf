/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.svelte', './node_modules/stdf/src/**/*.svelte'],
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
        extend: {},
    },
    darkMode: 'class',
    plugins: [],
};
