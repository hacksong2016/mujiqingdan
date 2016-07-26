Template.order.onCreated(function() {
    this.subscribe("order",facc.user()._id,FlowRouter.getQueryParam("address"));
});
Template.order.helpers({
    address:function(){
      return FlowRouter.getQueryParam("address");
    },
    items:function(){
       
        return Cart.find();
    }
});
Template.order.events({
    
    "click .c-sub":function(){
      if(!$("#express").val()){
        alert("请填写快递单号");
        return false;
      }
      var cas = Cart.find().fetch();
      var oid = Order.insert({
          userid:facc.user()._id,
          nickname:facc.user().nickname,
          address:FlowRouter.getQueryParam("address"),
          avatar:facc.user().avatar,
          items:cas,
          createAt:new Date(),
          express:$("#express").val(),

       });

      for(var i = 0 ; i < cas.length ; i++){
        var c = cas[i];
        Cart.remove({_id:c._id});
        Items.update({_id:c.item},{$inc:{
          recive:(c.num*-1)
        }});
      }
       
      FlowRouter.go("/order/view?id=" + oid);
    }
    
});


Template.order.onRendered(function() {


});
