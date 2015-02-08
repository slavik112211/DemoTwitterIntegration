var PreferencesView = Backbone.View.extend({
	events: {
		"click .changePref" : "changePref"
	},
	initialize: function(properties) {
		this.el = properties.el;
		this.model = properties.model;
		this.template = _.templateFromUrl("/templates/preferences.html");
		this.render();
	},

	render: function() {
      	this.$el.html(this.template(this.model));
		return this;
	},

	changePref: function() {
		Application.preferencesModel.twitterUsers = ["techcrunch", "AppDirect", "laughingsquid"];
		Application.rearrangeWindows();
	}
});