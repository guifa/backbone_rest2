var Layout = Marionette.LayoutView.extend({
	template : _.template($('#todo-layout').html()),

	regions : {
		form : '#form',
		list : '#list',
		assigneeInvalid : '#invalid-assignee',
		todoInvalid : '#invalid-todo'
	},

	modelEvents : {
//		'invalid' : 'onValidationFailed'
	},

	onShow : function() {
		var formView = new FormView({
			model : this.model,
			collection : this.collection,
			onAdd: function(newModel) {
				console.log(newModel);
			}
		});
		var listView = new ListView({
			collection : this.collection
		});

		this.showChildView('list', listView);
		this.showChildView('form', formView);
	},

//	onValidationFailed : function() {
//		console.log('onValidationFailed');
//		console.log(this.model.validationError);
//		var errors = this.model.validationError;
//		if (errors.todo) {
////			console.log(errors.todo.message);
//			this.showChildView("todoInvalid", new ErrorView({
//				model : new Backbone.Model({
//					message : errors.todo.message,
//				})
//			}));
//		}
//		if (errors.assignee) {
//			this.showChildView("assigneeInvalid", new ErrorView({
//				model : new Backbone.Model({
//					message : errors.assignee.message,
//				})
//			}));
//		}
//	},


});