/*
 * 模板
 * 模板引擎:jqtpl
 */
define([], function() {  
    var jqtpl = function (str, data) {
        var cache = {};
        var _inner = function (str, data) {
            var fn = !/\W/.test(str) ? cache[str] = cache[str] ||
            jqtpl(document.getElementById(str).innerHTML) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};" +
            "with(obj){p.push('" +
            str.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") +
            "');}return p.join('');");

            return data ? fn(data) : fn;
        };
        return _inner(str, data);
    };

    return {
        //app的框架
        frame: function(obj) {
            var t = '<div class="">\
                     </div>'; 
            return jqtpl(t, obj);
        }, 

        //单张照片
        photo: function(obj) {
            var t = '<div class="" style="width:200px;height:200px;margin-right:10px;float:left;">\
                        <img src="<%=mainUrl%>"/>\
                     </div>'; 
            return jqtpl(t, obj);
        }
    };
});

