Meteor.startup(function() {

    //格式化时间
    Template.registerHelper("format", function(str) {

        return format(str);

    });

    //反转数组
    Template.registerHelper("reverse", function(arr) {
        if (arr) {
            return arr.reverse();
        } else {
            return [];
        }

    });
    //登录状态
    Template.registerHelper("islogin", function(arr) {
        return !facc.isGuest();

    });
    //随机颜色
    Template.registerHelper("randomColor", function(s) {
        s = CryptoJS.MD5(s).toString();
        var str = "";
        for (var i = 0; i < s.length; i++) {
            str += s.charCodeAt(i).toString(16);


            if (str.length == 6) {
                return str;
            }
        }
  
    });

   
    Template.registerHelper("fl", function(str) {

       return str.substring(0, 1);

    });

    Template.registerHelper("fix", function(num) {



        return num * 1 ? (num * 1).toFixed(2) : "0.00";

    });
    Template.registerHelper("compare", function(str1,str2) {

     

        return str1 == str2;

    });


});
urlrefer = [];
var urlexcept = [
    "login",
    "register",
    "registercode",
    "forget",
    "forgetcode",
    "logout",
];
format = function(str) {
    if (str) {
        var d = new Date(str);

        return d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日 " + pad(d.getHours(), 2) + ":" + pad(d.getMinutes(), 2);
    } else {
        return "-/-/- --:--"
    }
}
pad = function(num, n) {
    var len = num.toString().length;
    while (len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}

backaction = function() {

    urlrefer.pop();
    FlowRouter.go(urlrefer[urlrefer.length - 1] ? urlrefer[urlrefer.length - 1] : "/");
    urlrefer.pop();
}

FlowRouter.triggers.enter([function(context, redirect) {

    urlrefer.push(context.path);
    // console.log(urlrefer);


}], { except: [] });

randomColor = function() {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}
stringToHex = function(str) {　　　　
    var val = "";　　　　
    for (var i = 0; i < str.length; i++) {　　　　　　
        if (val == "")　　　　　　　　 val = str.charCodeAt(i).toString(16);　　　　　　
        else　　　　　　　　 val += "," + str.charCodeAt(i).toString(16);　　　　
    }　　　　
    return val;
}
toUnicode = function(s) {
    var str = "";
    for (var i = 0; i < s.length; i++) {
        str += "\\u" + s.charCodeAt(i).toString(16) + "\t";
    }
    return str;
}
toUnicodeColor = function(s) {
    var str = "";
    for (var i = 0; i < s.length; i++) {
        str += s.charCodeAt(i).toString(16);
        if (str.length == 6) {
            return str;
        }
    }
}
Meteor.startup(function() {

    Session.set("USERLOGIN",facc.user()._id);

});
