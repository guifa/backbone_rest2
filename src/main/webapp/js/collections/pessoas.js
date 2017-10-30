/**
 * 
 */
var PessoaCollection = Backbone.Collection.extend({
	model : Pessoa,
	url : 'rs/pessoas',
	search : function(options) {
		this.url = 'rs/pessoas/search';
		this.fetch(options)
	}
});