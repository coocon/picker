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
    alert(layout);
});

