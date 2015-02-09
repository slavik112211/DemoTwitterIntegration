function Application() {
	this.initialize = function(){
		var that = this;
		this.initRouter();
		this.loginToTwitter()
		.then(function(){
			that.initPreferences();
			return that.initTwitterModels();
		}).then(function(){
			that.initTwitterViews();
		});
		Application.router.navigate("dashboard");
	};

	this.initRouter = function(){
		Application.router = new Router;
	};

	this.loginToTwitter = function(){
		Application.twitterAuth = new TwitterAuthModel();
		return Application.twitterAuth.authenticate();
	};

	this.initPreferences = function(){
		Application.preferencesModel = new PreferencesModel();
		Application.preferencesView = new PreferencesView({el: "#preferences_view", model: Application.preferencesModel});
	};

	this.initTwitterModels = function(){
		var tweetsModel = null;
		Application.tweetsModels = new Array();
		var tweetsPromises = new Array();
		_.each(Application.preferencesModel.twitterUsers, function(twitterUser){
			tweetsModel = new TweetsModel(twitterUser);
			Application.tweetsModels.push(tweetsModel);
			tweetsPromises.push(tweetsModel.getTweets());
		});
		return Q.all(tweetsPromises);
	};

	this.initTwitterViews = function(){
		Application.tweetsWindows = new Array();
		_.each(Application.tweetsModels, function(tweetsModel, index){
			Application.tweetsWindows.push(
				new TwitterWindowView({el: "#tweets"+index, model: tweetsModel}));
		});
	};

	this.rearrangeTwitterViews = function(){
		_.each(Application.preferencesModel.twitterUsers, function(twitterUser, index){
			tweetsWindow = _.find(Application.tweetsWindows, function(tweetsWindow){
				return tweetsWindow.model.userId === twitterUser;
			});
			tweetsWindow.setElement("#tweets"+index);
			tweetsWindow.render();
		});
	}
};

Application = new Application();
Application.initialize();