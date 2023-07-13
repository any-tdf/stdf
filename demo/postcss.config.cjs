import tailwind from 'tailwindcss';
import tailwindConfig from './tailwind.config.cjs';
import autoprefixer from 'autoprefixer';

export default {
    plugins: [tailwind(tailwindConfig), autoprefixer],
};
