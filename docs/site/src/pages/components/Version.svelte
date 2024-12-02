<script>
    // @ts-nocheck

    import { mdTextToHljs } from '../../utils/index';

    export let guide = 'button';
    const isZh = localStorage.getItem('lang') === 'zh_CN';

    let loading = true;

    //提取字符中以‘[!tag’开头且以‘]’结尾的所有字符串，组成数组，并返回数组
    const getTags = str => {
        return str.match(/\[!tag[^\]]+\]/g);
    };

    //提取字符中以‘[!issue‘开头且以‘]’结尾的所有字符串，组成数组，并返回数组
    const getIssues = str => {
        return str.match(/\[!issue[^\]]+\]/g);
    };

    //提取字符中以‘[!contribute‘开头且以‘]’结尾的所有字符串，组成数组，并返回数组
    const getContributes = str => {
        return str.match(/\[!contribute[^\]]+\]/g);
    };

    // 传入 tag 类型和 index，返回对应的 emoji
    const spanTextFun = (type, index) => {
        if (type === 'O') {
            return '👏';
        }
        if (type === 'A') {
            return '💪';
        }
        switch (index) {
            case '1':
                return '👊';
            case '2':
                return '✊';
            case '3':
                return '👎';
            default:
                return '👎';
        }
    };
    //替换Markdown中的标签
    const mdTextToHljsFun = string => {
        //替换tag
        const tagList = getTags(string);
        if (tagList) {
            tagList.forEach(item => {
                const arr = item.split('|');
                // const span = `<span class="w-2 h-2 text-xs inline-block rounded-full mr-1 ${bgClassFun(arr[1], arr[2])}"></span>`;
                const span = `<span class="mr-1">${spanTextFun(arr[1], arr[2])}</span>`;
                string = string.replace(item, span);
            });
        }
        //替换issue
        const issueList = getIssues(string);
        if (issueList) {
            issueList.forEach(item => {
                const arr = item.split('|');
                const span = `<span><a href="https://github.com/${
                    arr[1]
                }" target="_blank"><img class="w-4 h-4 ml-1 p-0 m-0 rounded-full overflow-hidden inline" src="https://avatars.githubusercontent.com/${
                    arr[1]
                }" title="${isZh ? '感谢' : 'Thanks'} ${arr[1]} ${isZh ? '提出 Issue' : 'raise an Issue'}" alt=""></a></span>`;
                string = string.replace(item, span);
            });
        }
        //替换contribute
        const contributeList = getContributes(string);
        if (contributeList) {
            contributeList.forEach(item => {
                const arr = item.split('|');
                const span = `<span><a href="https://github.com/${
                    arr[1]
                }" target="_blank"><img class="w-4 h-4 ml-1 p-0 m-0 rounded-full overflow-hidden inline" src="https://avatars.githubusercontent.com/${
                    arr[1]
                }" title="${isZh ? '感谢' : 'Thanks'} ${arr[1]} ${isZh ? '贡献代码' : 'contribute code'}" alt=""></a></span>`;
                string = string.replace(item, span);
            });
        }
        return string;
    };

    const getMdStrFunc = async nav => {
        loading = true;
        const rawObj = await import(`../../../../mds/components/${nav}/version${isZh ? '' : '_en'}.md`);
        const mdStr = rawObj.default;
        loading = false;
        return mdTextToHljs(mdStr.replace(/<a href="/g, '<a target="_blank" href="'));
    };
    $: guideText = getMdStrFunc(guide).then(res => {
        // @ts-ignore
        guideText = mdTextToHljsFun(res);
    });
</script>

<div class="text-xs mb-4 text-black/40 dark:text-white/30 max-w-5xl">
    {isZh
        ? '注：👊、✊、👎 分别表示严重、一般、轻微三个等级的 BUG，👏 表示优化，💪 表示新增。描述后面的头像表示此项的提出者或贡献者，感谢他们。'
        : 'Note: 👊, ✊, and 👎 represent three levels of severity for bugs, with 👊 being the most severe and 👎 the least severe. 👏 means optimization, and 💪 means new feature. The avatar after the description represents the proposer or contributor of the item. We thank them for their contributions. '}
</div>
<article
    class="prose dark:prose-invert max-w-none pb-12 prose-table:break-all overflow-x-auto prose-td:whitespace-nowrap md:prose-td:whitespace-normal"
>
    {#if loading}
        {isZh ? '请等待...' : 'Please wait...'}
    {:else}
        {@html guideText}
    {/if}
</article>
<div class="pb-8 text-xs flex gap-2">
    <a
        href={'https://github.com/any-tdf/stdf/edit/main/doc/components/' + guide + '/version' + (isZh ? '' : '_en') + '.md'}
        class="flex text-primary dark:text-dark"
        target="_blank"
    >
        <span class="h-4 w-4 mr-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4" style="fill: currentColor;">
                <path
                    d="M12.8995 6.85431L17.1421 11.0969L7.24264 20.9964H3V16.7538L12.8995 6.85431ZM14.3137 5.44009L16.435 3.31877C16.8256 2.92825 17.4587 2.92825 17.8492 3.31877L20.6777 6.1472C21.0682 6.53772 21.0682 7.17089 20.6777 7.56141L18.5563 9.68273L14.3137 5.44009Z"
                />
            </svg>
        </span>
        {isZh ? '在 GitHub 上编辑' : 'Edit on GitHub'}
    </a>
</div>
