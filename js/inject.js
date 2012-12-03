/*
 * 将require.js插入到页面中，定义data-main执行main.js。
 */
(function() {
    //添加JS
    var s = document.createElement('script');
    s.src = chrome.extension.getURL('js/require.js');
    s.setAttribute('data-main', chrome.extension.getURL('js/main'));
    s.onload = function(){
        var root = chrome.extension.getURL('');
        localStorage.setItem('_picker_root', root);
    };
    (document.head||document.documentElement).appendChild(s);
    //添加CSS
    var c = document.createElement('style');
    c.setAttribute('type', 'text/css');
    var cssstring = ['.p-photo-year{background-image:url(' + chrome.extension.getURL('images/year-icon.png') + ');}',
                     '.p-close{background-image:url(' + chrome.extension.getURL('images/close-icon.png') + ');}', 
                     '.p-photo-wrapper{background-image:url(' + chrome.extension.getURL('images/loading-icon.gif') + ');}',
                     '.p-photo-share-item{background-image:url(' + chrome.extension.getURL('images/share-icon.png') + ');}'
                    ].join('');
    c.appendChild(document.createTextNode(cssstring));
    (document.head||document.documentElement).appendChild(c);
})();
