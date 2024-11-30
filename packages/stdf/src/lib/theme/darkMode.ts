/**
 * 给 HTML 元素增加或删除 dark 类名，实现 Mode 切换
 * Add or remove the dark class name to the HTML element to implement Mode switching
 * @example
 * darkMode(true) // 开启 dark 模式
 * darkMode(false) // 关闭 dark 模式
 */
const darkMode = (isDark: boolean = true): void => {
	if (isDark) {
		document.documentElement.classList.add('dark');
	} else {
		document.documentElement.classList.remove('dark');
	}
};

export default darkMode;
