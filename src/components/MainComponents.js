import React, { useEffect, useState } from "react";
import "./styles.css";

  
const Task =({task,index,completeTask,removeTask})=>{
return(
  <div className="task" style={{textDecoration:task.completed ? "line-through":""}}>
    {task.title}
    <button style={{background:"red"}} onClick={()=>removeTask(index)}>x</button>
    {!task.completed && <button onClick={()=>completeTask(index)}>Complete</button>}
    </div>
)
 }

 const CreateTask =({addTask})=>{
   const [value,setValue]=useState("")
   const handleSubmit =e =>{
     e.preventDefault();
     if(!value) return;
     addTask(value);
    setValue("")
   }
   return(
     <form onSubmit={handleSubmit}>
       <input
       type="text"
       className="input"
       value={value}
       placeholder="Add a new task"
       onChange ={e=>setValue(e.target.value)}
       />
     </form>
   )
 }

 const Todo =()=>{
   const [tasksRemaining,setTasksRemaining] =useState(0);
   const [tasks,setTasks] =useState([])
  
     useEffect(()=>{
      let myTask =localStorage.getItem("todo");
      myTask = JSON.parse(myTask);
      if(myTask) {
        console.log("myTask",myTask)
        setTasks(myTask)
      }
    },[]);

   useEffect(()=>{
     if(tasks.length) {
      localStorage.setItem("todo", JSON.stringify(tasks))
     }
   },[tasks]);

  
   useEffect(()=>{
     setTasksRemaining(tasks.filter(task=>!task.completed).length)},[tasks]);
  
   const addTask=title=>{
     const newTasks=[...tasks,{title,completed:false}];
     setTasks(newTasks);
   }

   const completeTask = index =>{
    const newTasks =[...tasks];
    newTasks[index].completed=true;
    setTasks(newTasks); 
   }

  const removeTask = index =>{
    const newTasks =[...tasks];
    newTasks.splice(index,1);
    setTasks(newTasks);  
  }

  const removeAllTask = () =>{
    setTasks([]);
    localStorage.clear();
  }



  return (
    <>
      <div className="container">
        <div className="header" >Pending Tasks({tasksRemaining})</div>
      <div className="tasks">
        {tasks && tasks.map((task,index)=>(
          <Task
          task={task}
          index={index}
          completeTask={completeTask}
          removeTask={removeTask}
          key={index}
          />
          ))}
      </div>
        <div className="createTask">
          <CreateTask addTask={addTask}/>
        </div>
        {tasks.length ?<button style={{background:"red",color:"white"}}onClick={()=>removeAllTask()}>remove all</button>:<div></div>}
      </div>
    </>
  );
};

export default Todo;
