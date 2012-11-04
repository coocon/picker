/*
 * 
 */

define(['jquery'], function($) {
    var _maskEl,
    mask = function(op) {
        return $('<div></div>')
        .appendTo(document.body)
        .css({
            'position': 'absolute',   
            'left': '0',
            'top': '0',
            'width': $(document).width(), 
            'height': $(document).height(), 
            'z-index': op.z,
            'background-color': op.bgcolor, 
            'opacity': 0 
        });
    },
    defaultVal = function(options) {
        return  $.extend({ 
            opacity: 0.8, 
            z: 10000, 
            bgcolor: '#000' 
        }, options); 
    };
    return {
        fadeIn: function(options, callback) {
            var op = defaultVal(options);
            _maskEl = mask(op);     
            _maskEl.fadeTo('slow', op.opacity, function() {
                callback(_maskEl);
            });
        }    
    } 
});
