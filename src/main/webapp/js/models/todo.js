var ToDoModel = Backbone.Model.extend({
	defaults : {
		assignee : '',
		todo : ''
	},

	validate : function(attrs) {
		var validationErrors = {};
		if (!attrs.assignee || attrs.assignee == '') {
			validationErrors.assignee = {name: 'assignee_invalid', message: 'Assignee must be set.'};
		}
		if (!attrs.todo || attrs.todo == '') {
			validationErrors.todo = {name: 'todo_invalid', message: 'Todo must be set.'};
		}
		return (validationErrors.assignee || validationErrors.todo) ? validationErrors : false;
	}
});
