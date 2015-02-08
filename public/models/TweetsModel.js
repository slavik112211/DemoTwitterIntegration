var TweetsModel = Backbone.Model.extend({
	initialize: function(userId){
		this.userId = userId;
	},
	getTweets: function(){
		var that = this;
		var deferred = Q.defer();
		$.get("/tweets/"+this.userId, function(response) {
			that.tweets = response;
			_.each(that.tweets, function(tweet){ that.formatDate(tweet); });
			deferred.resolve();
		});
		return deferred.promise;
	},
	formatDate: function(tweet){
		var date = new Date(tweet.created_at);
		tweet.timestamp = date.toLocaleDateString()+' '+date.toLocaleTimeString();
	}
});
