/*
 * 布局
 */
define(['jquery', 'template'], function($, template) {
    var layout = function(model) {
        this.model = model;
        this.init(); 
    };

    layout.prototype = {

        template: template,

        elements: {
            '.p-photo-list': 'listEl'
        },

        init: function() {
            this.view = $(this.template.frame({}))
                        .css({
                            'height': $(window).height()     
                        })
                        .appendTo(document.body);
            this.refreshElements();
            this.initList();
        },

        refreshElements: function() {
            for (var key in this.elements) {
                this[this.elements[key]] = $(key, this.view); 
            }
        },

        initList: function() {
            for (var i=0,len=this.model.length; i<len; i++) {
                $(this.template.photo(this.model[i]))
                .appendTo(this.listEl); 
            }
        }
    };
    return layout;
});
