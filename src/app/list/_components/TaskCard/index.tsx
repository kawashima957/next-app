import React, { useEffect, useState } from 'react';

// Start Generation Here
const TaskCard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        setTasks(data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="task-card">
          <h2>{task.title}</h2>
          <p>Assigned to: {task.user.name}</p>
          <div className="subtasks">
            {task.subTasks.map((subTask) => (
              <div key={subTask.id} className="subtask-card">
                <h3>{subTask.title}</h3>
                <p>Responsible: {subTask.responsible}</p>
                <p>Deadline: {new Date(subTask.deadline).toLocaleDateString()}</p>
                <p>Description: {subTask.description}</p>
                <p>Assigned to: {subTask.user.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskCard;
