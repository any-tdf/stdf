import './app.css';
import App from './App.svelte';

const app = new App({
    target: document.getElementById('app'),
});

//解决ios不支持按钮:active伪类
// Solve the problem that ios does not support the button: active pseudo class
document.body.addEventListener('touchstart', function () {
    //...空函数即可
    // ... Empty function is OK
});

export default app;
