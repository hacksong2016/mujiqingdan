Meteor.startup(function() {
    

    
	if(Types.find().count() < 1){
		var tid = Types.insert({
			name:"生活用品"
		});
		Items.insert({
			type:tid,
			"topic":"儿童春季衣服",
			"num":100,
			"recive":46,
			"remark":"1、消毒并清洗<br/>2、适合农村孩子，不要太时髦",
			"address":"河北省承德市德化村德吉孤儿院",
			status:1
		})
		Items.insert({
			type:tid,
			"topic":"电风扇",
			"num":100,
			"recive":60,
			"remark":"1、消毒并清洗<br/>2、适合农村孩子，不要太时髦",
			"address":"福州小山村",
			status:1
		})
		Items.insert({
			type:tid,
			"topic":"洗护用品",
			"num":100,
			"recive":60,
			"remark":"1、消毒并清洗<br/>2、适合农村孩子，不要太时髦",
			"address":"福州小山村",
			status:1
		})
		tid = Types.insert({
			name:"学习用品"
		});
		Items.insert({
			type:tid,
			"topic":"儿童春季衣服T",
			"num":100,
			"recive":46,
			"remark":"1、消毒并清洗<br/>2、适合农村孩子，不要太时髦",
			"address":"河北省承德市德化村德吉孤儿院",
			status:1
		})
		Items.insert({
			type:tid,
			"topic":"电风扇T",
			"num":100,
			"recive":60,
			"remark":"1、消毒并清洗<br/>2、适合农村孩子，不要太时髦",
			"address":"福州小山村",
			status:1
		})
		Items.insert({
			type:tid,
			"topic":"洗护用品T",
			"num":100,
			"recive":60,
			"remark":"1、消毒并清洗<br/>2、适合农村孩子，不要太时髦",
			"address":"河北省承德市德化村德吉孤儿院",
			status:1
		})
		tid = Types.insert({
			name:"医疗用品"
		});
		Items.insert({
			type:tid,
			"topic":"儿童春季衣服D",
			"num":100,
			
			"recive":46,
			"remark":"1、消毒并清洗<br/>2、适合农村孩子，不要太时髦",
			"address":"福州小山村",
			status:1
		})
		Items.insert({
			type:tid,
			"topic":"电风扇D",
			"num":100,
			"recive":60,
			"remark":"1、消毒并清洗<br/>2、适合农村孩子，不要太时髦",
			"address":"河北省承德市德化村德吉孤儿院",
			status:1
		})
		Items.insert({
			type:tid,
			"topic":"洗护用品D",
			"num":100,
			"recive":60,
			"remark":"1、消毒并清洗<br/>2、适合农村孩子，不要太时髦",
			"address":"河北省承德市德化村德吉孤儿院",
			status:1
		})
	}

});
