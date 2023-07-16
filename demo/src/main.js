import App from './App.svelte';
import './app.css';

//截取字符?后面的所有字符
// Intercept all characters after the character
let urlLang = window.location.href.split('?')[1];
let urlParams = new URLSearchParams(urlLang);
// 设置语言
// Set language
let lang = urlParams.get('lang') ? urlParams.get('lang') : sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : 'zh_CN';
sessionStorage.setItem('lang', import.meta.env.MODE === 'english' ? 'en_US' : lang);
setTimeout(() => {
    window.history.replaceState({}, 0, window.location.href.split('?')[0]);
}, 300);

// 设置主题
// Set theme
if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
} else if (localStorage.getItem('theme') === 'light') {
    document.documentElement.classList.remove('dark');
} else {
    // if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //     document.documentElement.classList.add('dark');
    // } else {
    document.documentElement.classList.remove('dark');
    // }
}
//解决ios不支持按钮:active伪类
// Solve the problem that ios does not support the button: active pseudo class
document.body.addEventListener('touchstart', function () {
    //...空函数即可
});

// 阻止双击放大
// Prevent double click zoom
document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
});
let lastTouchEnd = 0;
document.addEventListener(
    'touchend',
    function (event) {
        const now = new Date().getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    },
    false
);
// 阻止双指放大
// Prevent two finger zoom
document.addEventListener('gesturestart', function (event) {
    event.preventDefault();
});

const app = new App({
    target: document.getElementById('app'),
});

export default app;
