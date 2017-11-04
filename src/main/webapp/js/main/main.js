var AppRouter = Backbone.Router.extend({

	routes : {
		'app/pessoas/lista': "list",
		'app/pessoas/cadastro': "cadastro",
		'app/pessoas/teste': "teste",
		'app/pessoas/edicao/:id': 'pessoa'
	},
	
	initialize : function() {
		this.App = new Marionette.Application();
		this.App.addRegions({
			mainRegion : '#main-container',
			error: '#error'
		});
	},

	list : function() {
		var that = this;
		this.pessoaCollection = new PessoaCollection();
		this.pessoaTableView = new PessoaTableView({
			pessoas : this.pessoaCollection
		});
		this.pessoaCollection.fetch({
			success : function(col, res) {
				that.App.mainRegion.show(that.pessoaTableView);
			},
			error : function(col, res) {
				console.error('Erro buscando pessoas...')
			}
		});
	},
	
	pessoa : function(id) {
		if (this.pessoaCollection) {
			this.pessoa = this.pessoaCollection.get(id);
			if (this.pessoaView)this.pessoaView.close();
			this.pessoaView = new PessoaView({
				model : this.pessoa
			});
			this.App.mainRegion.show(this.pessoaView);
		} else {
			this.requestedId = id;
			alert('A pessoa com o ID:' + this.requestedId + 'não pode ser encontrada!');
		}
	},

	cadastro : function() {
		if (app.pessoaView)
			app.pessoaView.close();
		app.pessoaView = new PessoaView({
			model : new Pessoa()
		});
		this.App.mainRegion.show(app.pessoaView);
	},

	teste : function() {
		var initialData = [ {
			assignee : 'Scott',
			todo : 'Write a book about Marionette'
		}, {
			assignee : 'Andrew',
			todo : 'Do some coding'
		} ];
		var todoView = new Layout({
			collection : new Backbone.Collection(initialData),
			model : new ToDoModel()
		});
		this.App.mainRegion.show(todoView);
//		this.App.error.show("TESTES");
	}
});

var app = new AppRouter();
Backbone.history.start();