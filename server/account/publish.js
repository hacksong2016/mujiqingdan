Meteor.publish("role", function(userid) {
    return Meteor.users.find({ _id: userid }, {
        fields: {
            vaild: 1,
            master: 1,
            role: 1,
        }
    });
})

Meteor.publish("userdetail", function(rid) {
    var ref = Referrals.findOne({ _id: rid });
    return Persons.find({ _id: ref.person._id });
})
