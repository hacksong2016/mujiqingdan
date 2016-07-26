Meteor.publish("types", function() {
   return Types.find();
})
Meteor.publish("items", function() {
   return Items.find({status:1});
})
Meteor.publish("cart", function(uid) {
   return Cart.find({userid:uid,num:{$gt:0}});
})
Meteor.publish("order", function(uid,address) {
   return Cart.find({userid:uid,num:{$gt:0},"address":address});
})
Meteor.publish("orderView", function(id) {
   return Order.find({_id:id});
})
Meteor.publish("myOrders", function(uid) {
   return Order.find({userid:uid});
})
