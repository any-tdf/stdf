import fs from 'fs';

// 创建 src/docs/components 目录
// Create src/docs/components directory
const createDoc = () => {
    fs.mkdirSync('src/docs');
    fs.mkdirSync('src/docs/components');
    console.log('🎉 src/docs/components create success!');
};

// 将 ../../docs/mds/components/**/api.md 和 ../../docs/mds/components/**/api_en.md 文件复制到 src/docs/components/**/ 目录下
// Copy ../../docs/mds/components/**/api.md and ../../docs/mds/components/**/api_en.md files to src/docs/components/**/ directory
const copyDoc = () => {
    const components = fs.readdirSync('../../docs/mds/components');
    // 如果 components 有 .DS_Store 文件，删除
    // If components has .DS_Store file, delete
    if (components.includes('.DS_Store')) {
        components.splice(components.indexOf('.DS_Store'), 1);
    }

    components.forEach(component => {
        const files = fs.readdirSync(`../../docs/mds/components/${component}`);
        fs.mkdirSync('src/docs/components/' + component);
        files.forEach(file => {
            if (file === 'api.md' || file === 'api_en.md') {
                fs.copyFileSync(`../../docs/mds/components/${component}/${file}`, `src/docs/components/${component}/${file}`);
            }
        });
    });
    console.log(`🎉 Total copy ${components.length}*2 files!`);
};

// 复制 ../../docs/site/src/data/menuList.ts 文件到 src 目录下
// Copy ../../docs/site/src/data/menuList.ts file to src directory
const copyMenuList = () => {
    // 读取 ../../docs/site/src/data/menuList.ts 文件
    const menuList = fs.readFileSync('../../docs/site/src/data/menuList.ts', 'utf-8');
    console.log(menuList);
    // 将其中的部分内容替换为另一个文件中的内容
    // Replace the content of the file with the content of another file
    const newMenuList = menuList.replace(
        `export type MenuListChild = {
	title: string;
	title_zh: string;
	title_en: string;
	nav: string;
	tip: string;
	tip_en: string;
	alias: string;
};
export type MenuList = { class: string; class_en: string; childs: MenuListChild[] };

export const menuList: MenuList[] = [`,
        'export default ['
    );
    fs.writeFileSync('./src/menuList.js', newMenuList);
    console.log('🎉 menuList copy success!');
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
copyLicense();
