Meteor.methods({
	queryTypes:function(){
		return Types.find().fetch();
	},
	saveCart:function(args){

		var ca = Cart.findOne({item:args._id});
		if(ca){
			Cart.update({_id:ca._id},{
				$inc:{
					num:1
				}
			})
		}else{
			Cart.insert({
				topic:args.topic,
				num:1,
				remark:args.remark,
				address:args.address,
				status: 1,
				item:args._id,
				userid:args.userid,
				createAt:new Date(),
			});
		}
	},
});