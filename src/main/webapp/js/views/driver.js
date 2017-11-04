//var initialData = [
//  {assignee: 'Scott', todo: 'Write a book about Marionette'},
//  {assignee: 'Andrew', todo: 'Do some coding'}
//];
//
//var app = new Marionette.Application({
//  onStart: function(options) {
//    var todoView = new Layout({
//      collection: new Backbone.Collection(options.initialData),
//      model: new ToDoModel()
//    });
//    todoView.render();
//    todoView.triggerMethod('show');
//  }
//});
//
//app.start({initialData: initialData});