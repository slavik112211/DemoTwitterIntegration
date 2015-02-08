function Application() {
	this.initialize = function(){
		var that = this;
		this.initRouter();
		this.loginToTwitter().then(function(){
			that.initTwitterWindows();
		});
	};

	//router is not used currently
	this.initRouter = function(){
		var Router = Backbone.Router.extend({
		routes: {
			'loginToTwitter': 'loginToTwitter',
			'tweets/:twitter_id': 'showTweets'
		}});
		Application.router = new Router;

		Application.router.on('route:loginToTwitter', function(){
			console.log("ping");
		});

		Application.router.on('route:showTweets', function(twitter_id){
			console.log("pong");
		});
		Backbone.history.start();
	};

	this.loginToTwitter = function(){
		Application.twitterAuth = new TwitterAuthModel();
		return Application.twitterAuth.authenticate();
	};

	this.initTwitterWindows = function(){
		Application.tweets1 = new TweetsModel("AppDirect");
		Application.tweets2 = new TweetsModel("laughingsquid");
		Application.tweets3 = new TweetsModel("techcrunch");
		this.tweetsPromise = Q.all([Application.tweets1.getTweets(), Application.tweets2.getTweets(), Application.tweets3.getTweets()]);
		this.tweetsPromise.then(function(){
			Application.twitterWindow1 = new TwitterWindowView({el: "#tweets1", model: Application.tweets1});
			Application.twitterWindow2 = new TwitterWindowView({el: "#tweets2", model: Application.tweets2});
			Application.twitterWindow3 = new TwitterWindowView({el: "#tweets3", model: Application.tweets3});
		});
	};
};

Application = new Application();
Application.initialize();