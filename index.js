const express = require('express');
const  mongoose  = require('mongoose');
const bodyparser = require('body-parser');
const app = express();
const todoModel = require('./models/todo_models.js');
require('dotenv/config');
app.use(bodyparser.json());


app.get('/todos',(req,res)=>{
    res.send('this is our second api we are building');
});
app.post('/todos', async(req,res)=>{
    console.todo=todoModel.create({
        title:req.body.title,
        body: req.body.body,
        status: req.body.status,
        endDate: req.body.endDate

    });
    try{
        const saveTodo = await todo.save();
        res.json({
            massage:"todo successfully created"
        });
    }catch(err){
        res.json({
        massage:err
       });
    }
});

app.get('/todos',async(req,res)=>{
    try {
        const getAllTodos = await todoModel.find();
        res.json({
            data:getAllTodos,
            massage:"operation successful"
        });
    }catch(err){
        res.json({
        massage:err
        });
    }
});
app.get('/todos/:todoid',async(req,res)=>{
    try {
        const getAllTodos = await todoModel.findById({_id:req.body.todoid});
        res.json({
            data:getAllTodos,
            massage:"operation successful"
        });
    }catch(err){
        res.json({
        massage:err
        });
    }
});
app.delete('/todos/:todoId',async(req, res)=>{
    try{
    const deleteTodo = await todoModel.findOneAndDelete({_id:req.params.todoId});
        res.json({
            data: deleteTodo,
            message:"Todo successfully deleted"
        });
    }
    catch(err){
        res.json({
            message:err
        });
    }
});
app.patch('/todo/:todoId',async (req, res)=>{
    try {
        const updatetodo = await todoModel.findOneAndUpdate({_id:req.params.todoId},{$set:{
            title:req.body.title,
            status:req.body.status,
            body:req.body.body
        }});
        res.json({
            data:updatetodo,
            massage:"Todo successfuly updated"
        })
    }catch(err) {
        res.json({
            massage:err
        });
    }

    
   
});
mongoose.connect(process.env.DB_URL,
()=>console.log('successfully connected'));
app.listen(1002 || process.env);