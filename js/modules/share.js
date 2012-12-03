define('share', [], function() {
    var stringifyParams = function(obj) {
        var s = [];
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                obj[i] != null && s.push(i.toString() + '=' + encodeURIComponent(obj[i].toString()) || ''); 
            }
        }
        return s.join('&');
    }, 
    defaultSummary = '人人老照片，找回封尘已久的回忆！',
    getTitle = function(data) {
        var commonTitle = '我的人人网好友{userName}在{nYear}年前的今天上传了这张照片。';
        return commonTitle.replace('{userName}', data.userName).replace('{nYear}', data.nYear);
    };
    return {
        'weiboQQ': function(data) {
            var url = 'http://v.t.qq.com/share/share.php?', 
            title = getTitle(data),
            /*
             * 不展示照片描述啦，不知道放到什么地方。
             * 并且放上去容易产生误解。
             * 而且可以留下一点神秘感。
             */
            obj = {
                'url': data.url,
                'appkey': '100673398',  
                'desc': data.desc || '',
                'summary': defaultSummary,
                'title': title,
                'site': data.site,
                'pic': data.pic
            };
            window.open(url + stringifyParams(obj));
        }, 
        'qzone': function(data) {
            var url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?', 
            title = getTitle(data), 
            //针对qzone可以传的值和微博不一样。
            obj = {
                'url': data.url,
                'desc': title,
                'summary': defaultSummary,
                'title': data.desc || ' ',
                'site': data.site,
                'pics': data.pic
            };
            window.open(url + stringifyParams(obj));
        },
        'weiboSina': function(data) {
            var url = 'http://service.weibo.com/share/share.php?',
            title = getTitle(data),
            obj = {
                'type': 3,
                'url': data.url, 
                'appkey': '4120399713', 
                'title': title,
                'pic': data.pic
            };
            window.open(url + stringifyParams(obj));
        }
    }        
});
