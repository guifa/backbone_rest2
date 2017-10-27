/**
 * 
 */
var PessoaCollection = Backbone.Collection.extend({
	model : Pessoa,
	url : 'rs/pessoas'
});