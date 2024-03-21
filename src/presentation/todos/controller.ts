import { Request, Response } from "express";
import { text } from "stream/consumers";

const todos = [
    { id: 1, text:'Buy milk', createdAt: new Date()},
    { id: 2, text:'Buy bread', createdAt: null},
    { id: 3, text:'Buy butter', createdAt: new Date()},
];


export class TodosController 
{

    //* Dependency Injection
    constructor(){}

public getTodos = (req: Request, res: Response) => {
    //res.send('Hello World!')
     return res.json(todos);

}

public getTodoById = (req: Request, res: Response) =>{

    const id = +req.params.id;
    if ( isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'});
    const todo = todos.find(todo => todo.id === id);

    (todo)
    ? res.json(todo)
    : res.status(404).json({error: `TODO with id ${id} not found`});

}

public createTodo = (req: Request, res: Response) => 
{
    const {text} = req.body;

    if ( !text ) return res.status(400).json({error: 'Text property is required'});
    
    const newTodo = {
        id: todos.length + 1,
        text: text,
        createdAt: null
    }

    todos.push(newTodo);

    res.json( newTodo );
}


public uptdateTodo = (req: Request, res: Response) => 
{
    const id = +req.params.id;

    if ( isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'});
    
    const todo = todos.find(todo => todo.id === id);

    if ( !todo ) return res.status(404).json({error: 'Todo with id ${id} not found'});

    const { text } = req.body;
    if ( !text ) return res.status(400).json({error: 'Text property is required'});

    todo.text = text;
    //!OJO REFERENCIA
    res.json( todo );
}


public deleteTodo = (req: Request, res: Response)=>
{
    const id = +req.params.id;

    if ( isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'});
    
    const todo = todos.find(todo => todo.id === id);

    (todo)
    ? todos.splice(todos.indexOf(todo),1)
    : res.status(404).json({error: `TODO with id ${id} not found`});

    res.json(todo);
}

}

