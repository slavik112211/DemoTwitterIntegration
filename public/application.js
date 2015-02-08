function Application() {
	this.initialize = function(){
		var that = this;
		this.initRouter();
		this.loginToTwitter().then(function(){
			that.initPreferences();
			that.initTwitterModels().then(function(){
				that.initTwitterWindows();
			});
		});
	};

	this.initRouter = function(){

	};

	this.loginToTwitter = function(){
		Application.twitterAuth = new TwitterAuthModel();
		return Application.twitterAuth.authenticate();
	};

	this.initPreferences = function(){
		Application.preferencesModel = new PreferencesModel();
		Application.preferencesView = new PreferencesView({el: "#preferences"});
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

	this.initTwitterWindows = function(){
		Application.tweetsWindows = new Array();
		_.each(Application.tweetsModels, function(tweetsModel, index){
			Application.tweetsWindows.push(
				new TwitterWindowView({el: "#tweets"+index, model: tweetsModel}));
		});
	};

	this.rearrangeWindows = function(){
		var rearrangedWindows = new Array();
		_.each(Application.preferencesModel.twitterUsers, function(twitterUser){
			rearrangedWindows.push(
				_.find(Application.tweetsWindows, function(tweetsWindow){
					return tweetsWindow.model.userId === twitterUser;
				}));
		});
		Application.tweetsWindows = rearrangedWindows;
		_.each(Application.tweetsWindows, function(tweetsWindow, index){
			tweetsWindow.setElement("#tweets"+index);
			tweetsWindow.render();
		});
	}
};

Application = new Application();
Application.initialize();