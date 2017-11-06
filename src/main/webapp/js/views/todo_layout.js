var Layout = Marionette.LayoutView.extend({
	template : _.template($('#todo-layout').html()),

	regions : {
		form : '#form',
		list : '#list',
		assigneeInvalid : '#invalid-assignee',
		todoInvalid : '#invalid-todo'
	},

	onShow : function() {
		var formView = new FormView({
			model : this.model,
			collection : this.collection
		});
		var listView = new ListView({
			collection : this.collection
		});

		this.showChildView('list', listView);
		this.showChildView('form', formView);
	}
});