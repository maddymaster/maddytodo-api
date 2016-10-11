var express = require('express');
var app = express();
var PORT = process.env.PORT || 3029;
var todos = [{

	id: 1,
	description: 'Meet Matt for Lunch',
	completed: false
}, {
	id: 2,
	description: 'Go to Store',
	completed: false
}, {
	id: 3,
	description: 'Go some Grocery',
	completed: false

}];

app.get('/', function (req, res) {
	res.send('Todo API Root');
});

//GET /todos
app.get('/todos', function (req, res) {
	res.json(todos);
});

// GET /todos/:id
app.get('/todos/:id', function (req, res){
	var todoId = parseInt (req.params.id, 10);
	var matchedTodo;

	todos.forEach(function (todo) {
		if (todoId === todo.id) {
			matchedTodo = todo;
		}
	});

	if (matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404).send('You have reached in error');
	}

	
});

app.listen(PORT, function() {
	console.log('Express listening on port ' + PORT + '!');
});