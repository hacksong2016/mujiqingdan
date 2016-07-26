Template.orderView.onCreated(function() {
    this.subscribe("orderView",FlowRouter.getQueryParam("id"));
});
Template.orderView.helpers({
    order:function(){
      return Order.findOne();
    },
});
Template.cart.events({
    
    
});


Template.orderView.onRendered(function() {


});
