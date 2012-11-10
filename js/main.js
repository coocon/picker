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
            'notify': 'modules/notify',
            'storage': 'modules/storage-client'
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
                console.log(model);
                new layout(model);  
            });
        });
    })
    //test notify 
    require(['jquery', 'notify', 'storage'], function($, notify, storage){
        
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
      
    });
});
