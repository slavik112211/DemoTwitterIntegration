var Router = Backbone.Router.extend({
routes: {
	'preferences': 'preferences',
	'*notFound': 'dashboard'
}});
Application.router = new Router;

Application.router.on('route:preferences', function(){
	console.log("show preferences");
});
Application.router.on('route:dashboard', function(){
	console.log("show dashboard");
});
Backbone.history.start();