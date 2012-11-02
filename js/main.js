/*
 * 入口函数。
 */
require.config({
    'enforceDefine': true,
    'paths': {
        'jquery': 'modules/jquery-1.8.2',
        'ajaxproxy': 'modules/ajaxproxy',
        'layout': 'modules/layout'
    }
});

require(['jquery', 'layout', 'ajaxproxy'], function($, layout, ajaxproxy) {
    // jquery和xn的$冲突。
    $.noConflict();
    if (!window.asyncHTMLManager) return;
})
