/**
 * 给 HTML 元素增加或删除 dark 类名，实现 Mode 切换
 * Add or remove the dark class name to the HTML element to implement Mode switching
 * @param {boolean} isDark 是否为 dark 模式
 * @returns {void}
 * @example
 */
export default (isDark = true) => {
	if (isDark) {
		document.documentElement.classList.add('dark');
	} else {
		document.documentElement.classList.remove('dark');
	}
};
