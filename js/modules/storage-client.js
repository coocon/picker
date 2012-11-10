/**
 *  用来本地存储的模块 this is the storage-client.js
 */

define(['jquery'], function($) {
    var config = {
        // localStorage的根目录key
        ROOT_KEY: '_picker_root',
        //自定义事件的div id名称
        CUSTOM_DIV_SERVER: '_picker_myCustomEventDiv_server',
        CUSTOM_DIV_CLIENT: '_picker_myCustomEventDiv_client',
        CUSTOM_EVENT: '_picker_myCustomEvent'
    
    };
    //事件回调存储对象
    var eventDic = {};
    //这个sync可以同步 比较storage.local强大一点
    var customEvent = document.createEvent('Event');
    customEvent.initEvent(config.CUSTOM_EVENT, true, true);

    var fireCustomEvent = function(data) {
        var hiddenDiv = document.getElementById(config.CUSTOM_DIV_SERVER);
        hiddenDiv.innerText = data;
        hiddenDiv.dispatchEvent(customEvent);
    };

    var hiddenDiv = document.getElementById(config.CUSTOM_DIV_CLIENT);
    hiddenDiv.addEventListener(config.CUSTOM_EVENT, function() {
        var eventData = this.innerText || '{}',
        json = JSON.parse(eventData);
        //{id:'',value:''}
        console.log('client data:', json);
        if(json.id && eventDic[json.id]) {
            eventDic[json.id].call(json, json.value);
        }
    });
    var storage = {
        unique: function() {
          var i = 0;
          return function() {
            return i++; 
          }
        }(),
        set: function(key, value, callback) {
            var me = this,
            callback = callback || function() {},
            id = me.unique(),
            j = {
                key: key,
                value: value,
                method: 'set',
                id: id 
            }, 
            str = JSON.stringify(j);
            //存放事件
            eventDic[id] = callback;
            fireCustomEvent(str);   
        },
        get: function(key, callback) {
            var me = this,
            callback = callback || function() {},
            id = me.unique(),

            j = {
                key: key,
                method: 'get',
                id: id
            }, str;

            str = JSON.stringify(j);
            eventDic[id] = callback;
            fireCustomEvent(str);   
        }
    };
   
    return  storage;
});
