/*
 * 入口函数。
 */
require.config({
    'enforceDefine': true,
    'paths': {
        'jquery': 'modules/jquery-1.8.2',
        'ajaxproxy': 'modules/ajaxproxy',
        'data': 'modules/data',
        'layout': 'modules/layout'
    }
});

require(['jquery', 'layout', 'data'], function($, layout, data) {
    // jquery和xn的$冲突。
    $.noConflict();
    if (!window.asyncHTMLManager) return;
    //向photo请求历史上的今天的数据
    data.getData(function(d) {
        new layout(d);  
    });
})
