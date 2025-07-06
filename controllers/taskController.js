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
export const updateTaskById = (req,res)=>{
    // Get the id
    const id = req.params.id;
    // Getting the values of title and completed from req.body  ....> Do more research of req.params and req.body
    const {
        title,
        completed = false
    } = req.body;
    // Get the task from tasks.txt and find the task that is matching with the id
    fs.readFile('data/tasks.txt','utf-8',(err,data)=>{
        if(err){
            return res.status(500).send('Error getting the data');
        }
        const tasks = JSON.parse(data || '[]');
        const taskIndex= tasks.findIndex(task => task.id === Number(id));
        if(taskIndex === -1){
            return res.status(404).send('No task found with id: ',id);
        }
        if(title !== undefined || completed !== undefined){
            tasks[taskIndex].title = title;
            tasks[taskIndex].completed = completed;
        }
        console.log('The Updated tasks list is : ',tasks);
        fs.writeFile('data/tasks.txt',JSON.stringify(tasks,null,2),(err)=>{
            if(err){
                res.status(500).send('Error in updating the tasks');
            }
            res.status(201).json(tasks);
        })
    })
};
export const deleteTaskById = (req,res)=>{
    // Get the id
    const id = req.params.id;
    // Get the task from tasks.txt and find the task that is matching with the id
    fs.readFile('data/tasks.txt','utf-8',(err,data)=>{
        if(err){
            return res.status(500).send('Error getting the data');
        }
        const tasks = JSON.parse(data || '[]');
       const taskIndex= tasks.findIndex(task => task.id === Number(id));
        if(taskIndex === -1){
            return res.status(404).send('No task found with id: ',id);
        }// Use splice not pop..... pop - Deletes the last element of the array
        const deletedTask = tasks.splice(taskIndex, 1);
        console.log('The Updated tasks list is : ',tasks);
        fs.writeFile('data/tasks.txt',JSON.stringify(tasks,null,2),(err)=>{
            if(err){
                res.status(500).send('Error in updating the tasks');
            }
            res.status(201).json(deletedTask);
        })
    })
};