/*
 * 将storage-server.js用来存储数据的server。
 */
(function() {
    var config = {
        // localStorage的根目录key
        ROOT_KEY: '_picker_root',
        //自定义事件的div id名称
        CUSTOM_DIV_SERVER: '_picker_myCustomEventDiv_server',
        CUSTOM_DIV_CLIENT: '_picker_myCustomEventDiv_client',
        CUSTOM_EVENT: '_picker_myCustomEvent'
    
    };
   
    //添加storage功能
    //存储必须的div 引用
    //这个sync可以同步 比较storage.local强大一点
    var _storage =  chrome.storage.sync;
    
    
    var storage = {
        set: function(key, value, callback) {
            var callback = callback || function() {};
            var obj = {};
            obj[key] = value;
            _storage.set(obj , function(){ 
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
            _storage.get(key, function(v) {
                callback(v);
                return v;   
            });
           
        }
    };
    
    chrome.storage.onChanged.addListener(function(changes, namespace) {
        return;
        for (key in changes) {
            var storageChange = changes[key];
            console.log('Storage key "%s" in namespace "%s" changed. ' +
                'Old value was "%s", new value is "%s".',
                key,
                namespace,
                storageChange.oldValue,
                storageChange.newValue);
        }
    });
    var Tool = function() {

        var hiddenDiv_s, hiddenDiv_c, customEvent;;
        this.storage = storage;
        this.init = function() {
            var me = this;
            hiddenDiv_s = document.createElement('div'); 
            hiddenDiv_c = document.createElement('div'); 
            hiddenDiv_s.id = config.CUSTOM_DIV_SERVER;
            hiddenDiv_c.id = config.CUSTOM_DIV_CLIENT;
            hiddenDiv_s.style.display = 'none';
            hiddenDiv_c.style.display = 'none';
            document.body.appendChild(hiddenDiv_s);
            document.body.appendChild(hiddenDiv_c);             
            me.customEvent = document.createEvent('Event');
            me.customEvent.initEvent(config.CUSTOM_EVENT, true, true);

            hiddenDiv_s.addEventListener(config.CUSTOM_EVENT, function() {
                var eventData = this.innerText || '{}',
                json = me.parse(eventData);
                if(json.method == 'set') {
                    me.storage.set(json.key, json.value, function(value) {
                        console.log('server save ok............................................');
                        if(json.id) {
                            me.response(json.id, value); 
                        }
                    });
                } else if(json.method == 'get') {
                    me.storage.get(json.key, function(value) {

                        //console.log('server get ok............................................');
                        if(json.id) {
                            me.response(json.id, value); 
                        }
                    }); 
                }
            });
        };
        
        this.parse = function(str) {
            var json =  JSON.parse(str);
            return json ;
        
        };
        //返回客户端
        this.response = function(id, value) {
            var str = JSON.stringify({
                id: id,
                value: value
            }); 
            hiddenDiv_c.innerHTML = str;
            hiddenDiv_c.dispatchEvent(this.customEvent);
        }
       
    };
    var tool = new Tool();
    tool.init();

})();
