var AppRouter = Backbone.Router.extend({

	routes : {
		
		'app/pessoas/lista' : "list",
		'app/pessoas/cadastro' : "cadastro",
		'app/pessoas/edicao/:id' : 'pessoa'
//		"pessoas/" : "list",
//		"pessoas/cadastro" : "cadastro",
//		"pessoas/:id" : "pessoa"
	},

	list : function() {
		var that = this;
		this.pessoaTable = new PessoaCollection();
		this.pessoaTableView = new PessoaTableView({
			pessoas : this.pessoaTable
		});
		this.pessoaTable.fetch({
			success : function(col, res) {
				$('#main-container').html(that.pessoaTableView.render().el);
			},
			error : function(col, res) {
				console.error('Erro buscando pessoas...')
			}
		});
	},
	
	pessoa : function (id) {
        if (this.pessoaTable) {
            this.pessoa = this.pessoaTable.get(id);
            if (this.pessoaView) this.pessoaView.close();
            this.pessoaView = new PessoaView({model:this.pessoa});
            $('#main-container').html(this.pessoaView.render().el);
        } else {
            this.requestedId = id;
            this.list();
        }
    },
	
	cadastro : function() {
		if(app.pessoaView) app.pessoaView.close();
		app.pessoaView = new PessoaView({model: new Pessoa()});
		$('#main-container').html(app.pessoaView.render().el);
	}
});

var app = new AppRouter();
Backbone.history.start();