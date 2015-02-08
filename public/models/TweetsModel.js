var TweetsModel = Backbone.Model.extend({
	initialize: function(userId){
		this.userId = userId;
	},
	getTweets: function(){
		var that = this;
		var deferred = Q.defer();
		$.get("/tweets/"+this.userId, function(response) {
			that.tweets = response;
			_.each(that.tweets, function(tweet){ that.processTweet(tweet); });
			deferred.resolve();
		});
		return deferred.promise;
	},
	processTweet: function(tweet){
		this.setUser(tweet);
		this.formatDate(tweet);
		this.parseTweet(tweet);
	},
	setUser: function(tweet){
		tweet.display_properties = {};
		if(tweet.retweeted_status){
			tweet.display_properties.user_name        = tweet.retweeted_status.user.name;
			tweet.display_properties.user_screen_name = tweet.retweeted_status.user.screen_name;
			tweet.display_properties.user_image_url   = tweet.retweeted_status.user.profile_image_url;
		} else {
			tweet.display_properties.user_name        = tweet.user.name;
			tweet.display_properties.user_screen_name = tweet.user.screen_name;
			tweet.display_properties.user_image_url   = tweet.user.profile_image_url;
		};
		tweet.display_properties.user_tag = '<a class="user_link" href="https://twitter.com/'+
			tweet.display_properties.user_screen_name+'">'+tweet.display_properties.user_name+'</a>';
	},
	formatDate: function(tweet){
		var date = new Date(tweet.created_at);
		tweet.timestamp = date.toLocaleString();
	},
	parseTweet: function(tweet){
		tweet.text = tweet.text.parseURL().parseUsername().parseHashtag();
	}
});