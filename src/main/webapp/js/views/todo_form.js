var FormView = Marionette.LayoutView.extend({
	tagName: 'form',
	template: _.template($('#todo-form').html()),
	
	ui: {  
		assignee: '#id_assignee',
	    todo: '#id_todo'
	},
	
	events: {
		'click #btn-add' : 'onAddTodoItem'
	},

	collectionEvents: {
	    add: 'itemAdded'
	},
	
	modelEvents: {
	    change: 'render',
	    'invalid' : 'onValidationFailed'
	},
	
	onAddTodoItem : function(child) {
		this.model.set({
			assignee : this.ui.assignee.val(),
			todo : this.ui.todo.val()
		});//you could trigger validation passing {validate: true}
		if (this.model.isValid()) {//in this case i'm manually triggering the validation using .isValid()
			this.collection.add(this.model.toJSON());//this could have been done in different ways like this.model.pick('assignee', 'todo') or this.model.omit()
		}
	},
	
	onValidationFailed : function() {
		var errors = this.model.validationError;
		if (errors.todo) {
			this.$("#invalid-todo").html(new ErrorView({
				model : new Backbone.Model({
					message : errors.todo.message
				})
			}).render().$el);
		}
		if (errors.assignee) {
			this.$("#invalid-assignee").html(new ErrorView({
				model : new Backbone.Model({
					message : errors.assignee.message
				})
			}).render().$el);
		}
	},
	
	itemAdded : function() {
		this.model.set({
			assignee : '',
			todo : ''
		});
	}
});