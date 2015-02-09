var PreferencesView = Backbone.View.extend({
	events: {
		"click .togglePreferences" : "togglePreferences",
		"click .savePreferences" : "savePreferences"
	},
	initialize: function(properties) {
		this.el = properties.el;
		this.model = properties.model;
		this.template = _.templateFromUrl("/templates/preferences.html");
		this.render();
	},

	render: function() {
		this.$el.html(this.template(this.model));
		$(this.$el).find("ul.sortable").sortable({ update: this.sortTwitterColumns });
		$(this.$el).find("ul.sortable").disableSelection();
		return this;
	},

	sortTwitterColumns: function(event, ui){
		Application.preferencesView.model.twitterUsers = 
			_.map($(Application.preferencesView.$el).find("ul.sortable li"), function(li){
				return $(li).data("twitter-id");
			});
	},

	savePreferences: function() {
		Application.rearrangeTwitterViews();
		this.togglePreferences();
	},

	togglePreferences: function(event) {
		this.$el.find(".preferences").slideToggle(this.onPreferencesSlideToggle);
		if(event) event.preventDefault();
	},
	onPreferencesSlideToggle: function(){
		var navigateTo = $('.preferences').is(':visible') ? "preferences" : "dashboard";
		Application.router.navigate(navigateTo, {trigger: true});
	}
});