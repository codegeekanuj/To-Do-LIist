import React, { useState } from "react";
import { MdOutlineDeleteOutline, MdOutlineDeleteSweep } from "react-icons/md";

const Task = () => {
  const [inputTask, setInputTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  }

  const addTask = () => {
    if (inputTask === '') {
      alert("Enter your Task");
    } else if (inputTask.length > 50) {
      alert("Enter your Task with a word limit less than 50 characters");
    } else {
      setTasks([{ text: inputTask, checked: false }, ...tasks]);
      setInputTask('');
    }
  }

  const toggleCheck = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].checked = !updatedTasks[index].checked;
    setTasks(updatedTasks);
  }

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  }

  const deleteAllTasks = () => {
    setTasks([]); // This clears the whole tasks array
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') {
      return task.checked;
    } else if (filter === 'notCompleted') {
      return !task.checked;
    }
    return true;
  });

  return (
    <div className="h-5/6 w-4/6 bg-white rounded-2xl p-3 flex flex-col gap-1">
      <h1 className="w-full flex justify-center items-center text-4xl font-mono font-semibold">To Do List</h1>
      <div className="flex gap-2">
        <input
          type="text"
          id="taskInput"
          placeholder="Add a new task..."
          value={inputTask}
          onChange={(e) => setInputTask(e.target.value)}
          onKeyDown={handleEnter}
          className="w-4/5 p-3 border rounded-md text-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] outline-none"
        />
        <button onClick={addTask} className="bg-blue-500 text-white px-4 py-3 rounded shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] outline-none">
          Add Task
        </button>
      </div>
      <div className="h-4/5 mr-20 overflow-auto">
        {filteredTasks.map((task, index) => (
          <div key={index} className="flex justify-between p-5">
            <div className="flex gap-4 justify-center items-center">
              <input
                type="checkbox"
                className="h-5 w-5 rounded-full border-2 border-red-500 appearance-none checked:bg-red-500 checked:border-red-500 checked:ring-2 checked:ring-offset-2 checked:ring-red-600 cursor-pointer"
                checked={task.checked}
                onChange={() => toggleCheck(index)}
              />
              <span className={`text-xl ${task.checked ? 'line-through' : ''}`}>{task.text}</span>
            </div>
            <MdOutlineDeleteOutline
              className="text-3xl hover:cursor-pointer hover:text-red-500"
              onClick={() => deleteTask(index)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center font-semibold py-4 px-5">
        <span>Remaining: {tasks.length - tasks.filter((task) => task.checked).length}</span>
        <MdOutlineDeleteSweep
          className="text-3xl hover:cursor-pointer hover:text-red-500"
          onClick={deleteAllTasks} // Add deleteAllTasks here
        />
      </div>
      <div className="flex justify-around font-semibold">
        <button onClick={() => setFilter('all')} className={`w-1/3 h-7 focus:border-b-2 outline-none ${filter === 'all' ? 'border-red-500 text-red-500' : 'focus:border-red-500 focus:text-red-500'}`}>
          All
        </button>
        <button onClick={() => setFilter('completed')} className={`w-1/3 h-7 focus:border-b-2 outline-none ${filter === 'completed' ? 'border-red-500 text-red-500' : 'focus:border-red-500 focus:text-red-500'}`}>
          Completed
        </button>
        <button onClick={() => setFilter('notCompleted')} className={`w-1/3 h-7 focus:border-b-2 outline-none ${filter === 'notCompleted' ? 'border-red-500 text-red-500' : 'focus:border-red-500 focus:text-red-500'}`}>
          Not Completed
        </button>
      </div>
    </div>
  );
};

export default Task;
