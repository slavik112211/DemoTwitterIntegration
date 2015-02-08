var TwitterWindowView = Backbone.View.extend({
	events: {
	},
	initialize: function(properties) {
		this.el = properties.el;
		this.model = properties.model;
		this.template = "/templates/twitterWindow.html";
		this.render();
	},

	render: function() {
		var template = _.templateFromUrl(this.template);
      	this.$el.html(template(this.model));
		return this;
	},
});