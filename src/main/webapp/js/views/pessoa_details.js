var PessoaView = Backbone.View.extend({
	template:_.template($('#pessoa-tmpl').html()),
	
	initialize:function () {
        this.model.bind("change", this.render, this);
    },

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events:{
        "change input":"change",
        "click #save":"savePessoa",
        "click #delete":"deletePessoa"
    },

    change:function (event) {
        var target = event.target;
        console.log('changing ' + target.id + ' from: ' + target.defaultValue + ' to: ' + target.value);
    },

    savePessoa:function () {
    	var aux = $('#id').val();
    	if(aux == ''){
    		aux = null;
    	}
        this.model.set({
            id: aux,
            dataNascimento:$('#data-nascimento').val(),
            cpf:$('#cpf').val(),
            nome:$('#nome').val()
        });
        this.model.save();
        window.history.back();
    },

    deletePessoa:function () {
    	if (confirm('Tem certeza que quer deletar essa Pessoa?')){    		
    		this.model.destroy({
    			success:function () {
    				window.history.back();
    			}
    		});
    	}
        return false;
    },

    close:function () {
        $(this.el).unbind();
        $(this.el).empty();
    }
});