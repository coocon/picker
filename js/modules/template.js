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
    },

    helper = {
        //调用人人的缩图服务 
        //type 代表缩图类型 
        formatUrl: function(url, type) {
            var list = {
                '252': 'p/m2w252hq85lt_',
                '400': 'p/m2w400h400q85lt_'
            }, 
            type = type ? type.toString() : '252',
            lastIndex = url.lastIndexOf('/'),
            headUrl = url.substring(0, lastIndex + 1),
            middleUrl = list[type],
            footUrl = url.substring(lastIndex + 1);
            return headUrl + middleUrl + footUrl;
             
        },  

        getYear: function(year) {
            return ({
                '1': '壹', 
                '2': '贰', 
                '3': '叁', 
                '4': '肆', 
                '5': '伍', 
                '6': '陆', 
                '7': '柒', 
                '8': '捌', 
                '9': '玖' 
            })[year];           
        },

        getYearTitle: function(year) {
            return '上传于' + year + '年前的今天'; 
        },

        getProfile: function(userId) {
            return 'http://www.renren.com/' + userId + '/profile'; 
        }
    };

    return {

        helper: helper,

        //app的框架
        frame: function(obj) {
            var t = '<div class="p-container">\
                        <div class="p-photo-list">\
                        </div>\
                        <a href="javascript:;" class="p-close" hidefocus="true" title="关闭">关闭</a>\
                     </div>'; 
            return jqtpl(t, obj);
        }, 

        //单张照片
        photo: function(obj) {
            var t = '<div class="p-photo-item">\
                        <div class="p-photo-wrapper">\
                            <img src="" style="background-image:url(<%=url%>)"/>\
                            <div class="p-photo-oper <%if (!hasTitle) {%>no-title<%}%>">\
                                <a href="<%=profile%>" target="_blank" class="p-photo-user"><%=userName%></a>\
                                <%if (hasTitle) {%>\
                                <div class="p-photo-title" title="<%=originalTitle%>"><%=title%></div>\
                                <%}%>\
                            </div>\
                        </div>\
                        <div class="p-photo-year" title="<%=yearTitle%>"><%=year%></div>\
                     </div>'; 
            return jqtpl(t, {
                'url': this.helper.formatUrl(obj.largeUrl), 
                'year': this.helper.getYear(obj.nYear),
                'yearTitle': this.helper.getYearTitle(obj.nYear),
                'hasTitle': !!obj.originalTitle ? true : false,
                'originalTitle': obj.originalTitle,
                'title': obj.title,
                'userName': obj.userName,
                'profile': this.helper.getProfile(obj.userId)
            });
        }
    };
});

