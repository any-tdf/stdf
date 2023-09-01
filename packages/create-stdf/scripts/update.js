import fs from 'node:fs';

// 读取 ../stdf/package.json 中的 version 字段，作为最新版本号
// Read the version field in ../stdf/package.json as the latest version number
const version = JSON.parse(fs.readFileSync('../stdf/package.json', 'utf-8')).version;
console.log(`stdf 最新版本：${version}`);

// 读取 ../rollup-plugin-stdf-icon/package.json 中的 version 字段，作为最新版本号
// Read the version field in ../rollup-plugin-stdf-icon/package.json as the latest version number
const iconVersion = JSON.parse(fs.readFileSync('../rollup-plugin-stdf-icon/package.json', 'utf-8')).version;
console.log(`rollup-plugin-stdf-icon 最新版本：${iconVersion}`);

// 封装函数，传入版本号，需要修改的 package.json 中的 devDependencies 的 key 值，需要修改的文件路径，直接修改 package.json 并重新写入
// Encapsulate the function, pass in the version number, the key value of devDependencies in package.json that needs to be modified, the file path that needs to be modified, and directly modify package.json and rewrite
const updatePackageJson = (version, key, path) => {
	const packageJson = JSON.parse(fs.readFileSync(path, 'utf-8'));
	packageJson.devDependencies[key] = `^${version}`;
	fs.writeFileSync(path, JSON.stringify(packageJson, null, 4));
	console.log(`🎉 ${path} 更新成功`);
};

// 更新模板中的 package.json 的 stdf 版本号
// Update the stdf version number in the template package.json
updatePackageJson(version, 'stdf', 'templates/vite-tailwind/package.json');
updatePackageJson(version, 'stdf', 'templates/vite-uno/package.json');
updatePackageJson(version, 'stdf', 'templates/sveltekit-tailwind/package.json');
updatePackageJson(version, 'stdf', 'templates/sveltekit-uno/package.json');

// 更新模板中的 package.json 的 rollup-plugin-stdf-icon 版本号
// Update the rollup-plugin-stdf-icon version number in the template package.json
updatePackageJson(iconVersion, 'rollup-plugin-stdf-icon', 'templates/vite-tailwind/package.json');
updatePackageJson(iconVersion, 'rollup-plugin-stdf-icon', 'templates/vite-uno/package.json');
updatePackageJson(iconVersion, 'rollup-plugin-stdf-icon', 'templates/sveltekit-tailwind/package.json');
updatePackageJson(iconVersion, 'rollup-plugin-stdf-icon', 'templates/sveltekit-uno/package.json');
