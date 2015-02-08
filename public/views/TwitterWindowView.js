var TwitterWindowView = Backbone.View.extend({
	events: {
	},
	initialize: function(properties) {
		this.el = properties.el;
		this.model = properties.model;
		this.template = _.templateFromUrl("/templates/twitterWindow.html");
		this.render();
	},

	render: function() {
      	this.$el.html(this.template(this.model));
		return this;
	},
});