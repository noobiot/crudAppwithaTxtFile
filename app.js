import express from 'express';
import taskRoute from './routes/taskRoute.js';
const app = express();
const port = 3000;
app.use(express.json()); // For JSON parsing 
app.use(express.urlencoded({extended:true})); // For params and query
app.use('/tasks',taskRoute);
// This is a simple crud app where the data is getting extracted from a txt file
app.listen(port,()=> console.log(`server is running on ${port}`));