var FormView = Marionette.LayoutView.extend({
	tagName: 'form',
	template: _.template($('#todo-form').html()),
	
	initialize: function() {
		
	},
	
	ui: {  
		assignee: '#id_assignee',
	    todo: '#id_todo'
	},
	triggers: {
	    submit: 'add:todo:item'
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
		});
		if (this.model.isValid()) {
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