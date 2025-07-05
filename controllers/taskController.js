import fs from 'fs';
// This will contain all the logic for for todos list
export const getTasks = (req,res)=>{
    fs.readFile('data/tasks.txt','utf-8',(err,data)=>{
        if (err) return res.status(500).send('Error getting all the Tasks');
        const tasks = JSON.parse(data || '[]');
        res.json(tasks);
    })
    
};
export const getTaskById = (req,res)=>{
    const id = req.params.id; // Will get the ID of the user
    console.log(id);
    fs.readFile('data/tasks.txt','utf-8',(err,data)=>{
        if(err) return res.status(500).send('Error while finding the task with id');
        const tasks = JSON.parse(data || '[]');
        console.log(tasks);
        const taskFoundwithSameId =  tasks.find(task => task.id === Number(id));
        console.log(taskFoundwithSameId);
        res.json(taskFoundwithSameId);
        if(!taskFoundwithSameId){
            res.status(404).send(`No task found with ${id}`);
        }
    })
};
export const createTask = (req,res)=>{
    // const id = req.params.id;
    const {
        title,
        completed = false,
    } = req.body;
    fs.readFile('data/tasks.txt','utf-8',(err,data)=>{
        if(err) return res.status(500).send('Error while finding the task with id');
        const tasks = JSON.parse(data || '[]');
        console.log(tasks);
        const newTask = {
        id: tasks.length + 1,
        title: title,
        completed: completed
    }
    tasks.push(newTask);
    console.log('After Pushing : ',tasks);
    fs.writeFile('data/tasks.txt',JSON.stringify(tasks,null,2),(err) => {
        if(err){
            return res.status(500).send("Error posting the data");
        }
        // res.json(tasks);
        res.status(201).json(tasks);
    })
    })

};
export const updateTaskById = (req,res)=>{};
export const deleteTaskById = (req,res)=>{};