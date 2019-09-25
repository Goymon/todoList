/* global $ */

$(document).ready(function() {
    $.getJSON("/api/todos")
    .then(addTodos)
    .catch(function(err) {
        console.log(err);
    });
    
    $('#todoInput').keypress(function(event) {
        if(event.which == 13) {
            if($(this).val() != "") {
                createTodo();
            } else {
                alert("please enter a todo.")
            }
        } 
    });
    $('#todoInputBTN').on("click", function(event) {
        if($('#todoInput').val() != "") {
            createTodo();
        } else {
            alert("please enter a todo.")
        }
    });
    
    $('.list').on('click', 'li', function() {
        updateTodo($(this));
    })
    
    $('.list').on('click', 'span', function(event) {
        event.stopPropagation();
        removeTodo($(this).parent());
    });
});

function addTodos(todos) {
    todos.forEach(function(todo) {
        addTodo(todo);
    });
}

function addTodo(todo) {
    const newTodo = $(`<li class="task">${todo.name}<span>X</san></li>`);
    newTodo.data('id', todo.id);
    newTodo.data('completed', todo.completed);
    console.log(todo.completed)
    if(todo.completed) {
        newTodo.addClass("done");
    }
    $('.list').append(newTodo);
}

function createTodo() {
    const userInput = $('#todoInput').val();
    $.post('/api/todos', {name: userInput})
    .then(function(newTodo) {
        $('#todoInput').val('')
        addTodo(newTodo);
    })
    .catch(function(err) {
        console.log(err);
    });
}

function removeTodo(todo) {
    const clickedID = todo.data('id');
    const deleteUrl = '/api/todos/' + clickedID;
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    })
    .then(function(data) {
        todo.remove();
    })
    .catch(function(err) {
        console.log(err); 
    });
}

function updateTodo(todo) {
    const updateUrl = '/api/todos/' + todo.data('id');
    const isDone = !todo.data('completed');
    const updateData = {completed: isDone}
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData
    })
    .then(function(updatedTodo) {
        todo.toggleClass("done");
        todo.data('completed', isDone);
    })
    .catch(function(err) {
        console.log(err);
    });
}