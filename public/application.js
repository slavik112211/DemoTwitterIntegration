function Application() {
	this.initialize = function(){
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
};

Application = new Application();
Application.initialize();