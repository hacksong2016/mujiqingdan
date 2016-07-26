Meteor.methods({
    logres: function(args) {
        console.log(args);
    },
    signatureWechat: function(args) {



        var signobj = {
            jsapi_ticket: getTicket(),
            noncestr: CryptoJS.MD5(Math.random() + "").toString(),
            timestamp: Math.floor(Date.now() / 1000),
            url: process.env.ROOT_URL + args.path,
        }

        var signstr = json2query(signobj);

        signobj.signature = CryptoJS.SHA1(signstr).toString();
        signobj.appId = wechatConfig.appid;

        console.log(signobj);

        return signobj;
    },
    setWxUserInfo: function(args) {
        var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + wechatConfig.appid + "&secret=" + wechatConfig.secret + "&code=" + args.code + "&grant_type=authorization_code";
        Meteor.http.get(url, function(error, response) {
            if (response.statusCode === 200) {
                var json = JSON.parse(response.content);
                if (json.errcode) {
                    console.log(response.content);
                } else {
                    Meteor.users.update({ _id: args.userid }, {
                        $set: { openid: json.openid }
                    })
                }

            }
        })

    },
    setWxUserInfoWithinLogin: function(args) {
        var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + wechatConfig.appid + "&secret=" + wechatConfig.secret + "&code=" + args.code + "&grant_type=authorization_code";
        var response = Meteor.http.get(url);
        if (response.statusCode === 200) {
            var json = JSON.parse(response.content);
            if (json.errcode) {
                console.log(response.content);
            } else {
                return json.openid;
            }

        }

    },
    createWxPay: function(args) {
        // {
        //     tradeNo: 'AmnJBH8oiZp5BrcQs',
        //     subject: '车是一个特殊的商品车是一个特殊的商品车是一个特殊的商品车是一个特殊的商品车是一个特殊的商品',
        //     body: 'sdfasdfasdf。水电费水电费sdfsdf。水电费水电费sdfsdf。水电费水电费sdfsdf。水电费水电费sdfsdf。水电费水电费sdfsdf。sdfsdf。',
        //     price: 100,
        //     notifyUrl: 'http://mfynotify.fami2u.com/wxpay'
        // }

        var obj = {};
            WXPay.createUnifiedOrder({
                body: args.subject.substring(0, 15),
                out_trade_no: args.tradeNo,
                total_fee: args.price * 100,
                spbill_create_ip: this.connection.clientAddress,
                notify_url: args.notifyUrl,
                trade_type: 'JSAPI',
                openid: args.openid,
                attach: ""
            }, function(error, result) {
                obj = {
                    appId: wechatConfig.appid,
                    timeStamp: Math.floor(Date.now() / 1000),
                    nonceStr: CryptoJS.MD5(Math.random() + "").toString(),
                    package: ("prepay_id=" + result.prepay_id),
                    signType: "MD5"
                }
                obj.paySign = WXPay.sign(obj);


            });
            return obj

        
    }

});

json2query = function(json) {
    var arr = [];
    for (var k in json) {
        arr.push(k + "=" + json[k]);
    }
    return arr.join("&");
}

getTicket = function() {
    var token = getWxToken();
    if (token) {
        var wt = wxticket.findOne({ expiresAt: { $gt: (Math.floor(Date.now() / 1000)) } });

        if (wt) {
            return wt.ticket;
        } else {
            var url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + token + '&type=jsapi';

            var response = Meteor.http.get(url);

            if (response.statusCode === 200) {
                wxticket.update({}, {
                    ticket: response.data.ticket,
                    expiresAt: Math.floor(Date.now() / 1000 + 7200)
                });
                return response.data.ticket;
            } else {
                console.log("ticket error");
                return false;
            }
        }
    }

}
getWxToken = function() {

    var ack = wxaccesstoken.findOne({ expiresAt: { $gt: (Math.floor(Date.now() / 1000)) } });

    if (ack) {
        return ack.token;
    } else {
        var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + wechatConfig.appid + '&secret=' + wechatConfig.secret;
        console.log(url);
        var response = Meteor.http.get(url);

        if (response.statusCode === 200) {
            wxaccesstoken.update({}, {
                token: response.data.access_token,
                expiresAt: (Math.floor(Date.now() / 1000) + 7200)
            });
            return response.data.access_token;
        } else {
            console.log("accesstoken error");
            return false;
        }
    }
}
Meteor.startup(function() {
    if (wxaccesstoken.find().count() == 0) {
        wxaccesstoken.insert({});

    }
    if (wxticket.find().count() == 0) {
        wxticket.insert({});
    }

});
