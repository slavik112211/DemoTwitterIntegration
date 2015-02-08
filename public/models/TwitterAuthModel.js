var TwitterAuthModel = Backbone.Model.extend({
	authenticate: function(){
		var deferred = Q.defer();
		$.get("/authenticate", function(response) {
			deferred.resolve();
		});
		return deferred.promise;
	}
});
