var Router = Backbone.Router.extend({
	routes: {
		'preferences': 'preferences',
		'dashboard': 'dashboard'
	},
	initialize: function() {
		this.on('route:preferences', function(){
			// router is only used to change browser URL
		});
		this.on('route:dashboard', function(){
			// router is only used to change browser URL
		});
		Backbone.history.start();
	}
});

