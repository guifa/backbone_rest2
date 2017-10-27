var PessoaTableView = Backbone.View.extend({
	template : _.template($('#pessoa-table').html()),

	initialize : function(options) {
		this.pessoas = options.pessoas;
	},

	render : function() {
		$(this.el).html(this.template());
		var self = this;
		this.pessoas.each(function(pessoa) {
			self.$el.find(".row-container").append(new PessoaTableRowView({
				model : pessoa
			}).render().$el);
		}, this);
		return this;
	}
});