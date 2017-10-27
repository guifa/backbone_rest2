var PessoaTableRowView = Backbone.View.extend({
	tagName : 'tr',
	template : _.template($('#pessoa-table-row-tmpl').html()),
	
	initialize : function() {
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(this.model, 'change', this.render);
	},

	render : function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},
	
    events:{
    	"click #edit" : "editPessoa",
        "click #delete":"deletePessoa"
    },
    
    editPessoa : function() {
    	window.location.href='#pessoas/' + this.model.get('id');
	},
	
	deletePessoa:function () {
		if (confirm('Tem certeza que quer deletar essa Pessoa?')){    		
    		this.model.destroy();
    	}
    },

});