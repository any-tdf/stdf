import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/index.js',
    output: [
        { file: 'dist/index.js', format: 'es' },
        { file: 'dist/index.mjs', format: 'esm' },
    ],
    external: ['path', 'fs-extra', '@clack/prompts', 'kleur/colors'],
    plugins: [terser()],
};
