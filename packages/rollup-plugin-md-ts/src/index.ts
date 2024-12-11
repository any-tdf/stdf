import { marked, MarkedOptions } from 'marked';
import { createFilter } from 'rollup-pluginutils';

const ext = /\.md$/;

export type MDOptions = {
	include?: string[];
	exclude?: string[];
	marked?: MarkedOptions;
};

export default function md(options: MDOptions = {}) {
	const filter = createFilter(options.include || ['**/*.md'], options.exclude);
	if (options.marked) {
		marked.setOptions(options.marked);
	}
	return {
		name: 'md',
		// transform 是 rollup 插件必需的方法
		// 用于转换源文件内容
		transform(md: string, id: string) {
			// 检查文件是否是 .md 文件
			if (!ext.test(id)) return null;
			// 检查文件是否匹配 include/exclude 配置
			if (!filter(id)) return null;

			// 使用 marked 解析 markdown,如果没有配置 marked 则返回原始内容
			const data = options.marked ? marked.parse(md, options.marked) : md;
			return {
				// 导出解析后的内容为默认导出
				code: `export default ${JSON.stringify(data.toString())};`,
				// sourcemap 相关
				map: {
					version: 3,
					sources: [id],
					names: [],
					mappings: ''
				}
			};
		}
	};
}
