/*
 * 数据
 * TODO 数据的存储 数据转化为model。 @coocon
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
