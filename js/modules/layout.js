/*
 * 布局
 */
define(['jquery', 'template'], function($, template) {
    var layout = function(view, model) {
        this.view = view;
        this.model = model;
        this.init(); 
    };

    layout.prototype = {

        template: template,

        init: function() {
            this.list = $(this.template.frame({})).appendTo(this.view);
            this.initList();
        },

        initList: function() {
            for (var i=0,len=this.model.length; i<len; i++) {
                $(this.template.photo(this.model[i])).appendTo(this.list); 
            }
        }
    };
    return layout;
});
