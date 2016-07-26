sms = {
    // uid=1234&auth=faea920f7412b5da7be0cf42b8c93759&mobile=13612345678&msg=hello&expid=0
    server: 'http://sms.10690221.com:9011/hy/?',
    uid: "808591",
    code: "fami2016",
    pwd: "fami2016",
    send: function(tel, html) {

    	console.log("SMS:" + html);
        HTTP.get(sms.server,{
            params:{
                uid: sms.uid,
                auth: CryptoJS.MD5(sms.code + sms.pwd).toString().toLowerCase(),
                mobile: tel,
                msg: html,
                expid:0,
                encode:"utf-8",
            }
        }, function(error, result) {
            if (!error) {
                console.log("SMS-RES:" + result.content);
            } else {
                console.log("SMS-ERR:" + error);
            }
        });

    }
}