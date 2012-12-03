/*
 * 布局
 * 程序主逻辑，包括事件的监听和响应。
 */
define(['jquery', 'template', 'Events', 'mask', 'share'], function($, template, Events, mask, share) {
    var layout = function(model) {
        this.model = model;
        this.bindEvent();
        this.trigger('open', this);
    };

    layout.prototype = {

        template: template,

        eventSplitter: /^(\w+)\s*(.*)$/,

        elements: {
            '.p-photo-list': 'listEl'
        },

        events: {
            'click .p-close': 'close',
            'click .share-action': 'doShare'
        },

        init: function() {
            this.view = $(this.template.frame({}))
                .css({
                    'height': $(window).height()     
                })
                .appendTo(document.body);
            this.refreshElements();
            this.delegateEvents();
            this.initList();
        },

        //自定义事件
        bindEvent: function() {
            this.bind('open', function(me) {
                mask.fadeIn({}, function() {      
                    $(document.body).css({                                                                                    
                        'overflow': 'hidden'                                                                                  
                    });  
                    me.init();
                });
            });  
            this.bind('close', function() {
                mask.fadeOut();  
                $(document.body).css({                                                                                
                    'overflow': 'auto'                                                                                
                });   
            });
        },

        refreshElements: function() {
            for (var key in this.elements) {
                this[this.elements[key]] = $(key, this.view); 
            }
            this.trigger('render', this);
        },

        delegateEvents: function() {
            for (var key in this.events) {
                var methodName = this.events[key],
                method = $.proxy(this[methodName], this),
                match = key.match(this.eventSplitter),
                selector = match[2],
                eventName = match[1];
                if (selector === '') {
                    this.view.bind(eventName, method);
                } else {
                    this.view.delegate(selector, eventName, method);
                }
            }       
        },

        initList: function() {
            for (var i=0,len=this.model.length; i<len; i++) {
                $(this.template.photo(this.model[i]))
                .appendTo(this.listEl); 
            }
        },

        close: function() {
            this.trigger('close', this);
            this.view.remove();
        },

        doShare: function(e) {
            var target = e.target,
            shareName = target.getAttribute('data-sharename'), 
            shareData = JSON.parse(target.parentNode.parentNode.getAttribute('data-share'));
            //decode一下，否则是乱码。
            shareData.desc = decodeURIComponent(shareData.desc);
            //调用share module的方法。
            share[shareName](shareData);
        },
    };
    $.extend(layout.prototype, Events);
    return layout;
});
