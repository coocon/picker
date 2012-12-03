/*
 * 
 */

define(['jquery'], function($) {
    var _maskEl,
    mask = function(op) {
        return $('<div class="p-mask"></div>')
        .appendTo(document.body)
        .css({
            'width': $(window).width(), 
            'height': $(window).height(), 
            'z-index': op.z,
            'background-color': op.bgcolor, 
            'opacity': 0 
        });
    },
    defaultVal = function(options) {
        return  $.extend({ 
            opacity: 0.8, 
            z: 6666, 
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
        },    

        fadeOut: function(callback) {
            callback = callback || function() {};
            _maskEl.fadeTo('slow', 0, function() {
                callback();
                _maskEl.remove();      
            }); 
        }
    } 
});
