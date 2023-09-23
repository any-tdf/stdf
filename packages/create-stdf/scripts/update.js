import fs from 'node:fs';
import { exec } from 'child_process';

// 封装函数，传入版本号，需要修改的 package.json 中的 devDependencies 的 key 值，需要修改的文件路径，直接修改 package.json 并重新写入
// Encapsulate the function, pass in the version number, the key value of devDependencies in package.json that needs to be modified, the file path that needs to be modified, and directly modify package.json and rewrite
const updatePackageJson = (version, key, path) => {
	const packageJson = JSON.parse(fs.readFileSync(path, 'utf-8'));
	packageJson.devDependencies[key] = `^${version}`;
	fs.writeFileSync(path, JSON.stringify(packageJson, null, 4));
	console.log(`🎉 ${path} 更新成功`);
};

// 获取 stdf 最新版本
// Get the latest version of stdf
exec(`npm show stdf version`, (error, stdout, stderr) => {
	if (error) {
		console.error(`执行命令出错: ${error.message}`);
		return;
	}
	if (stderr) {
		console.error(`命令错误: ${stderr}`);
		return;
	}
	const version = stdout.trim();
	console.log(`👉 stdf 最新版本: ${version}`);
	// 更新模板中的 package.json 的 stdf 版本号
	// Update the stdf version number in the template package.json
	updatePackageJson(version, 'stdf', 'templates/vite-tailwind/package.json');
	updatePackageJson(version, 'stdf', 'templates/vite-uno/package.json');
	updatePackageJson(version, 'stdf', 'templates/sveltekit-tailwind/package.json');
	updatePackageJson(version, 'stdf', 'templates/sveltekit-uno/package.json');
});

// 获取 rollup-plugin-stdf-icon 最新版本
// Get the latest version of rollup-plugin-stdf-icon
exec(`npm show rollup-plugin-stdf-icon version`, (errorIcon, stdoutIcon, stderrIcon) => {
	if (errorIcon) {
		console.error(`执行命令出错: ${errorIcon.message}`);
		return;
	}
	if (stderrIcon) {
		console.error(`命令错误: ${stderrIcon}`);
		return;
	}
	const version = stdoutIcon.trim();
	console.log(`👉 rollup-plugin-stdf-icon 最新版本: ${version}`);
	// 更新模板中的 package.json 的 rollup-plugin-stdf-icon 版本号
	// Update the rollup-plugin-stdf-icon version number in the template package.json
	updatePackageJson(version, 'rollup-plugin-stdf-icon', 'templates/vite-tailwind/package.json');
	updatePackageJson(version, 'rollup-plugin-stdf-icon', 'templates/vite-uno/package.json');
	updatePackageJson(version, 'rollup-plugin-stdf-icon', 'templates/sveltekit-tailwind/package.json');
	updatePackageJson(version, 'rollup-plugin-stdf-icon', 'templates/sveltekit-uno/package.json');
});
