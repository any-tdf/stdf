import terser from '@rollup/plugin-terser';

export default {
    input: 'src/index.js',
    output: [{ file: 'dist/index.js', format: 'es' }],
    external: ['path', 'fs-extra', '@clack/prompts', 'kleur/colors'],
    plugins: [terser()],
};
