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
        },

        getShareData: function(obj) {
            var url = 'http://photo.renren.com/photo/' + obj.userId + '/photo-' + obj.photoId;
            //返回的JSON语法必须符合JSON的语法规范，否则使用JSON.parse在浏览器解析的时候会报错哦
            //先将title使用encodeURIComponent转化，否则有些特殊字符无法转化。
            return '{&quot;site&quot;:&quot;人人网&quot;,&quot;pic&quot;:&quot;' + obj.mainUrl + '&quot;,&quot;desc&quot;:&quot;' + encodeURIComponent(obj.title) + '&quot;,&quot;url&quot;:&quot;' + url + '&quot;,&quot;userName&quot;:&quot;' +obj.userName+ '&quot;,&quot;nYear&quot;:&quot;' + obj.nYear + '&quot;}'; 
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
                            <img src="http://s.xnimg.cn/a.gif" data-original="<%=url%>" class="lazy"/>\
                            <div class="p-photo-oper <%if (!hasTitle) {%>no-title<%}%>">\
                                <a href="<%=profile%>" target="_blank" class="p-photo-user"><%=userName%></a>\
                                <%if (hasTitle) {%>\
                                <div class="p-photo-title" title="<%=originalTitle%>"><%=title%></div>\
                                <%}%>\
                                <div class="p-photo-share" data-share="<%=shareData%>">\
                                    <ul class="p-photo-share-list">\
                                        <li class="p-photo-share-item share-action share-weiboSina" title="分享到新浪微博" data-sharename="weiboSina"></li>\
                                        <li class="p-photo-share-item share-action share-weiboQQ" title="分享到腾讯微博" data-sharename="weiboQQ"></li>\
                                        <li class="p-photo-share-item share-action share-qzone" title="分享到QQ空间" data-sharename="qzone"></li>\
                                    </ul>\
                                </div>\
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
                'profile': this.helper.getProfile(obj.userId),
                'shareData': this.helper.getShareData(obj)
            });
        }
    };
});

