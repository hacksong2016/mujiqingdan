Meteor.methods({
    changeRole:function(args){
        Meteor.users.update({_id:args.id},{
            $set:{
                isadmin:args.isadmin
            }
        })
    },

    homeUpdateAvatar: function(args) {
        upload(args.avatar, function(data) {
            Meteor.users.update({
                _id: args.uid
            }, {
                $set: {
                    "avatar": data
                }
            });
        }, function(e) {
            throw e;
        });
    },

   
});
