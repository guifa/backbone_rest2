/**
 * 
 */
var Pessoa = Backbone.Model.extend({
	urlRoot: "rs/pessoas",
	defaults : {
		id : null,
		dataNascimento : null,
		cpf : null,
		nome : null
	}
});