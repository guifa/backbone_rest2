var ToDoModel = Backbone.Model.extend({
	defaults : {
		assignee : '',
		todo : ''
	},

	validate : function(attrs) {
		var validationErrors = {};
		if (!attrs.assignee || attrs.assignee == '') {
			console.log('teste-assignee');
			validationErrors.assignee = {name: 'assignee_invalid', message: 'Assignee must be set.'};
		}
		if (!attrs.todo || attrs.todo == '') {
			console.log('teste-todo');
			validationErrors.todo = {name: 'todo_invalid', message: 'Todo must be set.'};
		}
//		console.log('validationErrors.assignee: ' + validationErrors.assignee);
//		console.log('validationErrors.todo: ' + validationErrors.todo);
		return (validationErrors.assignee || validationErrors.todo) ? validationErrors : false;
	}
	
//	validate : function(attrs) {
//		var validationErrors = [];
//		if (!attrs.assignee || attrs == '') {
//			validationErrors.push({name: 'assignee_invalid', message: 'Assignee must be set.'});
//		}
//		if (!attrs.todo || attrs == '') {
//			validationErrors.push({name: 'todo_invalid', message: 'Todo must be set.'});
//		}
//		return validationErrors.length > 0 ? validationErrors : false;
//	}
});
