var ToDo = Marionette.LayoutView.extend({
	tagName: 'li',
	template: _.template($('#todo-item').html())
});

var ListView = Marionette.CollectionView.extend({
	tagName: 'ul',
	childView: ToDo
});