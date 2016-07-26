Meteor.publish("userDetail", function(uid) {

    return Meteor.users.find({
        _id: uid
    }, {
        fields: {
            nickname: 1,
            username: 1,
            email: 1,
            vaildEmail: 1,
            tel: 1,
            avatar: 1,
            point: 1,
            balance: 1,
            isadmin: 1,
            createAt: 1,
            invite: 1,
            photo: 1,
        }
    });
});

Meteor.publish("myPoint", function(uid) {

    if (uid) {
        return Meteor.users.find({ _id: uid }, {
            fields: {

                point: 1,

            }
        })
    }
});
Meteor.publish("mySend", function(uid) {

    if (uid) {
        return Express.find({userid:uid});
    }
});
