const express = require("express");
const bodyParser = require("body-parser");
const uuidv4 = require('uuid/v4')

const app = express();
const PORT = process.env.PORT || 3000;
let TODO = [];


   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({extended: true}));
   app.use(express.static(__dirname + '/views'));
   app.use(express.static(__dirname + '/public'));


      //===========================================//
      //============ ROUTES - START ==============//
      //==========================================//

   // ROOT
   app.get("/", function(req, res) {
      res.sendFile("index.html");
   });

   // READ ALL
   app.get('/api/todos', (req, res) => {
      try {
         res.json(TODO);
      } catch(err) {
         res.send(err);
      }
   });

   // CREATE
   app.post('/api/todos', (req, res) => {
      try {
         const newTodo = { 
            id: uuidv4(), 
            name: req.body.name,
            completed: false 
         }
         console.log(newTodo);
         TODO.push(newTodo);
         res.status(201).json(newTodo);
      } catch(err) {
         res.send(err);
      }
   });

   // READ ONE
   app.get('/api/todos/:todoId', (req, res) => {
      try {
         const foundTodo = TODO.find(todo => todo.id == req.params.todoId);
         console.log(foundTodo);
         res.json(foundTodo);
      } catch(err) {
         res.send(err);
      }
   });

   // UPDATE
   app.put('/api/todos/:todoId', (req, res) => {
      try {
         const i = getIndex(req.params.todoId);
         console.log(i)
         console.log(req.body.completed)
         TODO[i].completed = req.body.completed == 'true';
         console.log(TODO[i])
         res.json(TODO[i]);
      } catch(err) {
         console.log(err)
         res.send(err);
      }
   });

   // DELETE
   app.delete('/api/todos/:todoId', (req, res) => {
      try {
         const i = getIndex(req.params.todoId);
         TODO.splice(i, 1);
         res.json({message: "We deleted it!"}); 
      } catch(err) {
         res.send(err);
      }
   });

   //===========================================//
   //============= ROUTES - END ===============//
   //==========================================//

   // HELPER FUNCTION
   const getIndex = todoId => {
      const todo = TODO.find(todo => todo.id == todoId);
      return TODO.indexOf(todo);
   }

   app.listen(PORT, function() {
      console.log("Todos server is running on PORT " + PORT);
   });