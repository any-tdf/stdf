/**
 * 切换主题
 * 通过修改 data-theme 属性切换预定义的主题
 *
 * Switch theme
 * Switch predefined themes by modifying data-theme attribute
 *
 * @param themeName - 主题名称，对应 CSS 中 @plugin "stdf/theme" { name: "xxx" } 定义的名称
 *                    Theme name, corresponds to the name defined in @plugin "stdf/theme" { name: "xxx" } in CSS
 *
 * @example
 * // CSS 中定义主题
 * // Define themes in CSS
 * @plugin "stdf/theme" {
 *   name: "Nintendo";
 *   --color-primary: oklch(0.581 0.238 27.862);
 * }
 *
 * // JS 中切换主题
 * // Switch theme in JS
 * import { switchTheme } from 'stdf/theme';
 * switchTheme('Nintendo');
 */
const switchTheme = (themeName: string): void => {
	document.documentElement.setAttribute('data-theme', themeName);
};

/**
 * 切换亮暗模式
 * 通过修改 data-mode 属性切换亮色/暗色模式
 *
 * Switch mode
 * Switch primary/dark mode by modifying data-mode attribute
 *
 * @param mode - 模式名称：'primary' | 'dark'
 *               Mode name: 'primary' | 'dark'
 *
 * @example
 * import { switchMode } from 'stdf/theme';
 * switchMode('dark'); // 切换到暗色模式
 * switchMode('primary'); // 切换到亮色模式
 */
const switchMode = (mode: 'primary' | 'dark'): void => {
	document.documentElement.setAttribute('data-mode', mode);
};

/**
 * 获取当前主题
 * Get current theme
 *
 * @returns 当前主题名称 / Current theme name
 */
const getTheme = (): string | null => {
	return document.documentElement.getAttribute('data-theme');
};

/**
 * 获取当前模式
 * Get current mode
 *
 * @returns 当前模式 / Current mode
 */
const getMode = (): string | null => {
	return document.documentElement.getAttribute('data-mode');
};

export { switchTheme, switchMode, getTheme, getMode };
export default switchTheme;
