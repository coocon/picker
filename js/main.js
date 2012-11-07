/*
 * 入口函数。
 */
define(function() {
    require.config({
        'enforceDefine': true,
        'paths': {
            'jquery': 'modules/jquery-1.8.2',
            'mask': 'modules/mask',
            'ajaxproxy': 'modules/ajaxproxy',
            'data': 'modules/data',
            'template': 'modules/template',
            'layout': 'modules/layout',
            'Events': 'modules/events'
        }
    });

    require(['jquery', 'mask', 'layout', 'data'], function($, mask, layout, data) {
        // jquery和xn的$冲突。
        $.noConflict();
        if (!window.asyncHTMLManager) return;
        //向photo请求历史上的今天的数据
        data.getData(function(model) {
            mask.fadeIn({}, function() {
                $(document.body).css({
                    'overflow': 'hidden' 
                }); 
                new layout(model)
                .bind('close', function() {
                    mask.fadeOut();
                    $(document.body).css({
                        'overflow': 'auto' 
                    }); 
                });
            });
        });
    })
});
