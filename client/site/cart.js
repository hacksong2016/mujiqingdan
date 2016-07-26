Template.cart.onCreated(function() {
    this.subscribe("cart",facc.user()._id);
});
Template.cart.helpers({
   
    items:function(){
       var cs = Cart.find().fetch();
       var arr = [];

       //处理地址分组
       var ads = {};

       for(var i = 0 ; i < cs.length  ; i++){
           var c = cs[i];
           if(ads[c.address]){
                ads[c.address].push(c);
           }else{
                ads[c.address] = [c];
           }
       }

       //重分

       for(var k in ads){
            arr.push({
                address:k,
                child:ads[k],
            })
       }

       

        return arr;
    }
});
Template.cart.events({
    "click .c-rem": function(event) {
        var o = $(event.currentTarget);
        Cart.update({
            _id:this._id
        },{
            $inc:{
                num:-1
            }
        })

    },
    "click .c-inc": function(event) {
        var o = $(event.currentTarget);
        Cart.update({
            _id:this._id
        },{
            $inc:{
                num:1
            }
        })

    },
    "click .ca-address": function(event) {

       

         var o = $(event.currentTarget);
         $(".c-link").removeClass("c-link");
         o.addClass("c-link");
        
       
    },
    "click .c-sub":function(){
        if(!$(".c-link")[0]){
            alert("选择要捐助的地址");
            return;
        }
        FlowRouter.go("/order?address=" + $(".c-link").attr("data-address"));
    }
    
});


Template.cart.onRendered(function() {


});
