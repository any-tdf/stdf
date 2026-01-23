<script lang="ts">
	import { mdTextToHljs } from '../../../utils/index';
	import { isWideScreenStore } from '../../../store';

	// @ts-ignore
	import text from '../../../../../mds/guide/changelog.md';
	// @ts-ignore
	import text_en from '../../../../../mds/guide/changelog_en.md';

	const isZh = localStorage.getItem('lang') === 'zh_CN';
	//提取字符中以‘[!tag’开头且以‘]’结尾的所有字符串，组成数组，并返回数组
	const getTags = (str: string) => str.match(/\[!tag[^\]]+\]/g);
	//提取字符中以‘[!issue‘开头且以‘]’结尾的所有字符串，组成数组，并返回数组
	const getIssues = (str: string) => str.match(/\[!issue[^\]]+\]/g);
	//提取字符中以‘[!contribute‘开头且以‘]’结尾的所有字符串，组成数组，并返回数组
	const getContributes = (str: string) => str.match(/\[!contribute[^\]]+\]/g);
	const spanTextFun = (type: 'A' | 'B' | 'O', index: '1' | '2' | '3') => {
		const typeMap = { A: '💪', O: '👌' };
		const indexMap = { '1': '👊', '2': '✊', '3': '👎' };
		if (type === 'O' || type === 'A') {
			return typeMap[type];
		} else {
			return indexMap[index];
		}
	};
	//替换 Markdown 中的标签
	const mdTextToHljsFun = (string: string) => {
		//替换 tag
		const tagList = getTags(string);
		if (tagList) {
			tagList.forEach((item) => {
				const arr: string[] = item.split('|');
				const span = `<span class="mr-1">${spanTextFun(arr[1] as 'A' | 'B' | 'O', arr[2] as '1' | '2' | '3')}</span>`;
				string = string.replace(item, span);
			});
		}
		//替换 issue
		const issueList = getIssues(string);
		if (issueList) {
			issueList.forEach((item) => {
				const arr = item.split('|');
				const span = `<span><a href="https://github.com/${
					arr[1]
				}" target="_blank"><img class="w-4 h-4 ml-1 p-0 m-0 rounded-full overflow-hidden inline" src="https://avatars.githubusercontent.com/${
					arr[1]
				}" title="${isZh ? '感谢' : 'Thanks '} ${arr[1]} ${isZh ? '提出 Issue' : 'raise an Issue'}" alt=""></a></span>`;
				string = string.replace(item, span);
			});
		}
		//替换 contribute
		const contributeList = getContributes(string);
		if (contributeList) {
			contributeList.forEach((item) => {
				const arr = item.split('|');
				const span = `<span><a href="https://github.com/${
					arr[1]
				}" target="_blank"><img class="w-4 h-4 ml-1 p-0 m-0 rounded-full overflow-hidden inline" src="https://avatars.githubusercontent.com/${
					arr[1]
				}" title="${isZh ? '感谢' : 'Thanks '} ${arr[1]} ${isZh ? '贡献代码' : 'contribute code'}" alt=""></a></span>`;
				string = string.replace(item, span);
			});
		}
		return string;
	};
	const hljsText = mdTextToHljs((isZh ? text : text_en).replace(/<a href="/g, '<a target="_blank" href="'));
</script>

<article
	class="prose dark:prose-invert prose-strong:text-primary dark:prose-strong:text-dark mx-auto pb-8 text-xs {$isWideScreenStore
		? 'max-w-full'
		: 'max-w-7xl'}"
>
	<p class="mb-4 text-xs text-black/40 dark:text-white/30">
		{isZh
			? '注：此处仅展示站点更新说明或总体概述，具体组件更新内容请查看组件内部更新日志。描述后面的头像表示此项的提出者或贡献者，感谢他们。发布时间格式均为 GMT+8。'
			: 'Note: Only the site update instructions or general overview are displayed here. For the specific component update content, please refer to the update log inside the component. The avatars after the description represent the submitter or contributor, thank them for their contribution. The release time format is GMT+8.'}
	</p>
	{@html mdTextToHljsFun(hljsText)}
</article>
