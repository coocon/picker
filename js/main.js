/*
 * 入口函数。
 */
require.config({
    'enforceDefine': true,
    'paths': {
        'jquery': 'modules/jquery-1.8.2',
        'layout': 'modules/layout'
    }
});

require(['jquery', 'layout'], function($, layout) {
    // jquery和xn的$冲突。
    $.noConflict();
});

