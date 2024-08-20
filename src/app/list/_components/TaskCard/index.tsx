'use client'

import React, { useEffect, useState } from 'react';

type User = {
  name: string;
};

type SubTask = {
  id: number;
  title: string;
  responsible: string;
  deadline: string;
  description: string;
  user: User;
};

type Task = {
  id: number;
  title: string;
  user: User;
  subTasks: SubTask[];
};

// Start Generation Here
const TaskCard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

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
      {tasks.map((task: any) => (
        <div key={task.id} className="task-card">
          <h2>{task.title}</h2>
          <p>Assigned to: {task.user.name}</p>
          <div className="subtasks">
            {task.subTasks.map((subTask: any) => (
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
