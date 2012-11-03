/*
 * 将require.js插入到页面中，定义data-main执行main.js。
 */
function inject() {
    var s = document.createElement('script');
    s.src = chrome.extension.getURL('js/require.js');
    s.setAttribute('data-main', chrome.extension.getURL('js/main'));
    s.onload = function(){};
    (document.head||document.documentElement).appendChild(s);
}
inject();
