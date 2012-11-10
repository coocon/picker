/**
 *  用来本地存储的模块
 */

define(['jquery'], function($) {
    //这个sync可以同步 比较storage.local强大一点
    //var _storage =  chrome.storage.sync;
    var _storage = {};
    var storage = {
        set: function(key, value, callback) {
            var callback = callback || function() {};
            _storage.set({
                key:value  
            
            }, function(){ 

                callback(); 
            }); 
            
        }, 
        setObject: function(obj, callback) {
            
            var callback = callback || function() {},
            obj = obj || {};
            _storage.set(obj, function(){ 
                callback(); 
            });        
                   
        },
        get: function(key, callback) {
           return _storage.get(key);  
        }
    
    
    };
    
    
    var customEvent = document.createEvent('Event');
    customEvent.initEvent('myCustomEvent', true, true);

    storage.fireCustomEvent = function(data) {
        var hiddenDiv = document.getElementById('myCustomEventDiv');
        if(!hiddenDiv) {
            hiddenDiv = document.createElement('div'); 
            hiddenDiv.id = 'myCustomEventDiv';
            document.body.appendChild(hiddenDiv);
        }
        hiddenDiv.innerText = data
        hiddenDiv.dispatchEvent(customEvent);
    }

    return  storage;
});
