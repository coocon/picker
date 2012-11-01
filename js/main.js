
var req = requirejs.config({
    enforceDefine: true,
    paths: {
        jquery: 'js/jquery-1.8.2'
    }
});

require(['jquery'], function($) {

        $('body').html('<em>hiiiiiiiiiiiii</em>');

});

