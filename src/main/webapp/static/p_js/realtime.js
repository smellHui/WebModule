(function(my) {
    my.IM = {}
    // 请将 AppId 改为你自己的 AppId，否则无法本地测试
    var appId = 'O7rd2GxMgK5HE34p5GMjdayY-gzGzoHsz';
    // 请换成你自己的一个房间的 conversation id（这是服务器端生成的）
    my.IM.roomId = '568f749200b009a334864d6b';
    // 每个客户端自定义的 id
    my.IM.clientId = '';
    // 用来存储 realtimeObject
    my.IM.rt;
    // 用来存储创建好的 roomObject
    my.IM.room;
    // 监听是否服务器连接成功
    var firstFlag = true;
    // 用来标记历史消息获取状态
    var logFlag = false;
    var msgTime;


    my.IM.connect = function(name, option) {

        option = option ? option : {};
        option.succ = option.succ ? option.succ : function(msg) {
            console.log(msg)
        };
        option.error = option.error ? option.error : function(msg) {
            console.log(msg)
        };
        option.reuse = option.reuse ? option.reuse : function(msg) {
            console.log(msg)
        };



        if (name) {
            my.IM.clientId = name;
        }
        if (!firstFlag) {
            my.IM.rt.close();
        }

        my.IM.rt = AV.realtime({
            appId: appId,
            clientId: my.IM.clientId,

            // 请注意，这里关闭 secure 完全是为了 Demo 兼容范围更大些
            // 具体请参考实时通信文档中的「其他兼容问题」部分
            // 如果真正使用在生产环境，建议不要关闭 secure，具体阅读文档
            // secure 设置为 true 是开启
            secure: false
        });

        // 监听连接成功事件
        my.IM.rt.on('open', function() {
            firstFlag = false;
            //showLog('服务器连接成功！');

            // 获得已有房间的实例
            my.IM.rt.room(my.IM.roomId, function(object) {

                // 判断服务器端是否存在这个 room，如果存在
                if (object) {
                    my.IM.room = object;
                    option.succ('服务器连接成功！')
                        // 当前用户加入这个房间
                    my.IM.room.join(function() {
                        // 获取成员列表
                        my.IM.room.list(function(data) {

                            var l = data.length;

                            // 如果超过 500 人，就踢掉一个。
                            if (l > 490) {
                                room.remove(data[30], function() {
                                    //showLog('人数过多，踢掉： ', data[30]);
                                });
                            }
                        });

                    });
                }
            });
        });

        // 监听服务情况
        my.IM.rt.on('reuse', function() {
            option.reuse('服务器正在重连，请耐心等待。。。')
        });

        // 监听错误
        my.IM.rt.on('error', function() {
            option.error('连接遇到错误。。。')
        });




    }

    //获取在线的 client
    my.IM.getOnlineUser = function(data, call) {

        if (firstFlag) {
            $.alert("服务器异常")
            return
        }

        var len = data.length,
            filterNum = 1,
            sum = len / filterNum,
            count = 0,
            arr = [];
        for (var i = 0; i < sum; i++) {
            my.IM.rt.ping(data.slice(i, filterNum), function(list) {
                count++;
                arr = arr.concat(list);
                if (count == sum) {
                    call(arr)
                }
            });
        }
    }

    //获取历史记录
    my.IM.getHistory = function(callback) {

        if (firstFlag) {
            $.alert("服务器异常")
            return
        }

        if (logFlag) {
            return;
        } else {
            // 标记正在拉取
            logFlag = true;
        }

        my.IM.room.log({
            t: msgTime,
            limit:200
        }, function(data) {
            logFlag = false;
            // 存储下最早一条的消息时间戳
            var l = data.length;
            if (l) {
                msgTime = data[0].timestamp;
            }

            if (callback) {
                callback(data);
            }
        });
    }
    //发送图片数据
    my.IM.sendImgMsg = function(option){

        if (firstFlag) {
            $.alert("服务器异常")
            return
        }

        my.IM.room.send({
            text: option.text,
            // 自定义的属性
            attr: option.attr,
            url: option.url,
            metaData:{}
        }, {
           type: 'image'
        }, function(data) {
            if(option && option.succ){
                option.succ('发送成功');
            }
        });

    }
    //发送图片数据
    my.IM.sendTextMsg = function(option){

        if (firstFlag) {
            $.alert("服务器异常")
            return
        }

        my.IM.room.send({
            attr: option.attr,
            text: option.text
        }, {
            type: 'text'
        }, function(data) {
            if(option && option.succ){
                option.succ('发送成功');
            }
        });

    }

    my.IM.receive = function(call){
        if (firstFlag) {
            $.alert("服务器异常")
            return
        }

        my.IM.room.receive(function(data) {
            if (!msgTime) {
                // 存储下最早的一个消息时间戳
                msgTime = data.timestamp;
            }
            call && call(data);
        });
    }
    

})(window);
