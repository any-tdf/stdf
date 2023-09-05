const fs = require('fs');

// 创建 src/doc/components 目录
// Create src/doc/components directory
const createDoc = () => {
	fs.mkdirSync('src/doc');
	fs.mkdirSync('src/doc/components');
	console.log('🎉 src/doc/components create success!');
};

// 将 ../../doc/components/**/api.md 和 ../../doc/components/**/api_en.md 文件复制到 src/doc/components/**/ 目录下
// Copy ../../doc/components/**/api.md and ../../doc/components/**/api_en.md files to src/doc/components/**/ directory
const copyDoc = () => {
	const components = fs.readdirSync('../../doc/components');
	// 如果 components 有 .DS_Store 文件，删除
	// If components has .DS_Store file, delete
	if (components.includes('.DS_Store')) {
		components.splice(components.indexOf('.DS_Store'), 1);
	}

	components.forEach(component => {
		const files = fs.readdirSync(`../../doc/components/${component}`);
		fs.mkdirSync('src/doc/components/' + component);
		files.forEach(file => {
			if (file === 'api.md' || file === 'api_en.md') {
				fs.copyFileSync(`../../doc/components/${component}/${file}`, `src/doc/components/${component}/${file}`);
			}
		});
	});
	console.log(`🎉 Total copy ${components.length}*2 files!`);
};

// 复制 ../../demo/src/data/menuList.js 文件到 src 目录下
// Copy ../../demo/src/data/menuList.js file to src directory
const copyMenuList = () => {
	fs.copyFileSync('../../demo/src/data/menuList.js', './src/menuList.js');
	console.log('🎉 menuList copy success!');
};

// 将 src/menuList.js 文件中的第一行替换为 module.exports = [
// Replace the first line of the src/menuList.js file with module.exports = [
const replaceMenuList = () => {
	const data = fs.readFileSync('./src/menuList.js', 'utf8');
	const dataArray = data.split('\n');
	dataArray.splice(0, 1, 'module.exports = [');
	const result = dataArray.join('\n');
	fs.writeFileSync('./src/menuList.js', result, 'utf8');
	console.log('🎉 menuList replace success!');
};

// 复制 ../../packages/stdf/package.json 文件到 src/doc 目录下
// Copy ../../packages/stdf/package.json file to src/doc directory
const copyPackageJson = () => {
	fs.copyFileSync('../../packages/stdf/package.json', './src/doc/package.json');
	console.log('🎉 package.json copy success!');
};

// 复制 ../../LICENSE 文件到 ./ 目录下
// Copy ../../LICENSE file to ./ directory
const copyLicense = () => {
	fs.copyFileSync('../../LICENSE', './LICENSE');
	console.log('🎉 LICENSE copy success!');
};

createDoc();
copyDoc();
copyMenuList();
replaceMenuList();
copyPackageJson();
copyLicense();
