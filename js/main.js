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
            'Events': 'modules/events',
            'notify': 'modules/notify',
            'storage': 'modules/storage-client'
        }
    });

    require(['jquery', 'layout', 'data'], function($, layout, data) {
        // jquery和xn的$冲突。
        $.noConflict();
        if (!window.asyncHTMLManager) return;
        //向photo请求历史上的今天的数据
        data.getData(function(model) {
            new layout(model)
            .bind('render', function(me) {
                requirejs.load({
                    'onScriptLoad': function() {
                        jQuery('img.lazy').lazyload({
                            'container': me.view,    
                            'effect': 'fadeIn'
                        }); 
                    }     
                }, 'lazyload', requirejs.toUrl('modules/jquery.lazyload.js'));
            });
        });
    })
    //test notify 
    /*require(['jquery', 'notify', 'storage'], function($, notify, storage){
        
        $.noConflict();
        $(document).click(function() {
            if(notify) {
                notify.show({
                    title:'hi',
                    content: 'hello,world'
                }); 
            }  
            //test storage 
            storage.set('hello', 'world' + (new Date()).getTime(), function(i) {
                console.log('client save ok:',i);
            });
            storage.get('hello', function(v){
                console.log('client  have got value:', v); 
            });
        });
      
    });*/
});
