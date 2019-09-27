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
   

   // READ ALL
   

   // CREATE
   

   // READ ONE
   

   // UPDATE
   

   // DELETE
   

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