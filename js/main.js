
var req = requirejs.config({
    enforceDefine: true,
    paths: {
        jquery: 'js/jquery-1.8.2'
    }
});

require(['jquery'], function($) {

    $('body').html('<em>hiiiiiiiiiiiii</em>');
    var url = location.href;
    if(url.match(/.*\.renren\.com/)) {

        alert('hi'); 
        //renren  search 
        var ele = document.getElementById('c');
        ele.value = 'test';
    }
    

});

