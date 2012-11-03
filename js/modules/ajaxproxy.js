/*
 * 人人网跨域请求数据。(尽量模仿jquery) 
 * 通过IFrame跨域文件，取到XMLHttpRequest进行跨域。
 * 强烈鄙视IE。
 * Firefox Safari Chrome Opera
 */
define([], function() {
    /*
     * 返回一个跨域的XMLHttpRequest
     */
    function proxyXHR(url, callBack) {
        var tmpA = document.createElement('a'),
        hostname, protocol;
        tmpA.href = url;
        hostname = tmpA.hostname;
        protocol = tmpA.protocol;
        if (hostname && (hostname != location.hostname)) {
            var iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            document.body.insertBefore(iframe, document.body.firstChild);
            iframe.src = protocol + '//' + hostname + '/ajaxproxy.htm';
            iframe.onload = function() {
                try {
                    callBack(iframe.contentWindow.getTransport());     
                } catch(e) {
                    console.log(e.message); 
                }
                //用后干掉。
                /*document.body.removeChild(iframe);
                iframe = null;*/
            };
        } else {
            //同时支持同域下调用。
            callBack(new XMLHttpRequest());
        }
    }        

    function param(a, key) {
        var rt=[], t;
        for (var k in a) {
            t=a[k];
            if (typeof t=='function') {
                continue;
            }
            if (typeof t=='object') {
                rt.push(arguments.callee(t, k));
            } else {
                if (/^\d+$/.test(k)) {
                    rt.push((key||k) + '=' + encodeURIComponent(t));
                } else {
                    rt.push(k + '=' + encodeURIComponent(t));
                }
            }
        }
        return rt.join("&");
    }
    
    return function(options) {
        options = options || {};
        var url = options.url || '',
        type = options.type || 'get',
        data = options.data || null,
        success = options.success,
        error = options.error,
        complete = options.complete;
        proxyXHR(url, function(xhr) {
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) { 
                    if (xhr.status === undefined || xhr.status === 0 || (xhr.status >= 200 && xhr.status < 300)) {
                        //直接转化为json；
                        if (success) success(JSON.parse(xhr.responseText));
                    } else {
                        if (error) error(xhr); 
                    }
                    if (complete) complete(xhr);
                }
            }
            if (data && typeof data !== "string") {
                data = param(data); 
            }
            if (data && type == 'get') {
                url += (url.indexOf('?') != -1 ? '&' : '?') + data;
                data = null;
            }
            xhr.open(type, url, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(data);
        });
    };
});
