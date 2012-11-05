/**
 *  用来生成通知的模块 
 */

define(['jquery'], function($) {
    //chrome notify
    var url = localStorage.getItem('_picker_root');
    var _param = {
        title: 'notify',
        icon: url + 'images/rr-icon.png',
        content: '',
        timeout: 5000,
        //用户自定义弹框函数
        skipAlert: null
    },
    /**
     * 当chrome原生的notify 不被允许的话 调用此notify
     */
    simpleNotify = function(param) {
    
        if(param && param.content) {
            //目前先简单的alert 以后考虑好看点的弹出层
            alert(param.content); 
        } 
    }
    /**
     * show notify 
     */
    notify = function( param) {
        var notification,
        param = $.extend(_param, param);    
        //require user's permission
        if(window.webkitNotifications.checkPermission() != 0) {
            window.webkitNotifications.requestPermission( function(){
                notif(param)
            }); 
        } else if( window.webkitNotifications.checkPermission() == 0) {
            notification = webkitNotifications.createNotification(
                param.icon,  // icon url - can be relative
				param.title,  // notification title
				param.content // notification content
			);
			notification.show(param);
            if(param.timeout) {
                setTimeout(function() {
                    notification.cancel();
                }, param.timeout);
            }
			return true;
		} else {
            //不被允许 弹出chrome notify，则调用自己的notify
            simpleNotify(param);
			return false;
		}
	},
    /**
     * hide notify
     */
    hide = function() {
        if(notification && notification.cancel) {
            notification.cancel;
        } 
    };
    return {
        show: function(param) {
           notify(param); 
        },
        cancel: function() {
              hide();  
        }
    } 
});
