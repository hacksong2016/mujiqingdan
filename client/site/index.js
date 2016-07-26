Template.index.onCreated(function() {
    this.subscribe("types");
    this.subscribe("items");
});
Template.index.helpers({
    types: function() {
        return Session.get("INDEXTYPES");
    },
    items:function(){
        var obj = {};
        if(Session.get("CURTYPE")){
            obj.type = Session.get("CURTYPE");
        }
        return Items.find(obj);
    }
});
Template.index.events({
    "click .item": function(event) {
        var o = $(event.currentTarget);

        var t = $(".showItem").removeClass("showItem");
        o.addClass("showItem");

        Session.set("CURTYPE",this._id);

    },
    "click .ii-item": function(event) {

        if (facc.isGuest()) {
            FlowRouter.go("/login");
            return false;
        }

         var o = $(event.currentTarget);
         o.find(".ii-link").remove();
         this.userid = facc.user()._id;

         Meteor.call("saveCart",this,function(err,res){

         });
       
    },
    
});

indexSwiper = null;

Template.index.onRendered(function() {

    Meteor.call("queryTypes", { uid: facc.user()._id }, function(err, res) {

        Session.set("INDEXTYPES", res);
        window.setTimeout(function() {
            indexSwiper = new Swiper('.swiper-container', {
                slidesPerView: 4.5,
                spaceBetween: 0,
                freeMode: true
            });
        }, 100);

    })

});
