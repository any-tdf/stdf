import svgSprite from '../dist/index.js';

// 将会在 test 目录下生成 symbol.svg 文件，内容为 test/icons 目录下所有 svg 文件的 symbol
// Let the symbol.svg file be generated in the test directory, and the content is the symbol of all svg files in the test/icons directory
svgSprite([{ inFile: 'test/icons', outFile: 'test', fileName: 'symbol', simple: true }]);
