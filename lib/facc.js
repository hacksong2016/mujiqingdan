facc = {
    _id: "FAMILYOFDEVELOPOER",
    user: function() {
        return {
            "_id": localStorage.getItem(facc._id + "_UID"),
            "nickname": localStorage.getItem(facc._id + "_NICK"),
            "avatar": localStorage.getItem(facc._id + "_AVATAR"),
            "photo": localStorage.getItem(facc._id + "_PHOTO"),
        };
    },
    set: function(user) {
        Meteor.connection.setUserId(user._id);
        localStorage.setItem(facc._id + "_UID", user._id);
        localStorage.setItem(facc._id + "_NICK", user.nickname);
        localStorage.setItem(facc._id + "_AVATAR", user.avatar);
        localStorage.setItem(facc._id + "_PHOTO", user.photo);
        Session.set("USERLOGIN",user);

    },
    setState: function(key,value) {
        var userid = localStorage.getItem(facc._id + "_UID");
        localStorage.setItem(facc._id + "_" + key.toUpperCase(), value);
        var likid = localStorage.getItem(likid);
        localStorage.setItem(likid , value);
        var reaid = localStorage.getItem(reaid);
        localStorage.setItem(reaid , value);
        var colid = localStorage.getItem(colid);
        localStorage.setItem(colid , value);
    },
    get: function(key) {
        var userid = localStorage.getItem(facc._id + "_UID");
        return localStorage.getItem(facc._id + "_" + key.toUpperCase());
    },
    logout: function() {
        localStorage.removeItem(facc._id + "_UID");
        localStorage.removeItem(facc._id + "_NICK");
        localStorage.removeItem(facc._id + "_AVATAR");
        localStorage.removeItem(facc._id + "_PHOTO");
        Meteor.logout();
        Session.set("USERLOGIN",null);
    },
    isGuest: function() {
        return localStorage.getItem(facc._id + "_UID") ? false : true;
    },
    checkUsername: function(str) {
        return true;
    },
    checkTel: function(str) {
       return str.match(/^0?1[3|4|5|7|8][0-9]\d{8}$/);
    },
    backto:function(){
        FlowRouter.go("/");
    },
    checkID: function(str) {
       return str.match(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9|X|x])$/);
    },
    checkBirday: function(str) {
       return str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    },
    
    needAdmin:0
};

