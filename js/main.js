
var req = requirejs.config({
    enforceDefine: true,
    paths: {
        jquery: 'js/jquery-1.8.2'
    }
});

require(['jquery'], function($) {

    $.extend({ 
        mask: function(options){ 
            // 扩展参数 
            var op = $.extend({ 
                opacity: 0.8, 
                z: 10000, 
                bgcolor: '#000' 
            }, options); 

            // 创建一个 Mask 层，追加到 document.body 
            var divMask = $('<div class="jquery_addmask"></div>').appendTo(document.body).css({ 
                position: 'absolute', 
                top: '0px', 
                left: '0px', 
                'z-index': op.z, 
                width: $(document).width(), 
                height: $(document).height(), 
                'background-color': op.bgcolor, 
                opacity: 0 
            }).fadeIn('slow', function(){ 
                // 淡入淡出效果 
                $(this).fadeTo('slow', op.opacity); 
            }).click(function(){ 
                // 单击事件，Mask 被销毁 
                $(this).fadeTo('slow', 0, function(){ 
                    $(this).remove(); 
                }); 
            }); 
            $(document).scroll( function() {
                var d = $(this);
                divMask.css({
                    width: d.width(),
                    height: d.height(), 
                }); 
            });
            return this; 
        } 
    }); 

    var url = location.href;
    if(url.match(/.*\.renren\.com/)) {

        //renren  search 
        var ele = document.getElementById('navSearchInput');
        ele.value = 'test';
        $.mask({
            'opacity': 0.7, 
            'bgcolor': 'black', 
            'z': 5000 
        });
    }
    

});

