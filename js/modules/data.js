/*
 * 获取数据
 */

define(['ajaxproxy'], function(ajaxproxy) {
    var urlMap = {
        'getData': 'http://photo.renren.com/photo/latesdPhoto'
    };
    return {
        'getData': function(success, error) {
            ajaxproxy({
                'url': urlMap['getData'],  
                'type': 'get',
                'success': success || function() {},
                'error': error || function() {}
            });
        } 
    }    
});
