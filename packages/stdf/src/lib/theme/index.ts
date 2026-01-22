import { switchTheme, switchMode, getTheme, getMode } from './switchTheme.js';
import stdfThemePlugin, { themes, generateColorScale } from './plugin.js';
import type { ThemeConfig, ThemeOptions } from './plugin.js';

export { switchTheme, switchMode, getTheme, getMode, stdfThemePlugin, themes, generateColorScale };
export type { ThemeConfig, ThemeOptions };
export default stdfThemePlugin;
